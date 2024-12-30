<script setup>
import { onMounted, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";

import challengeSql from "@/services/sql/challenge.sql";
import DateUtils from "@/utils/date-utils";
import Formatters from "@/utils/formatters";

const user = useUserStore();
const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["close", "commit"]);

const challengeData = reactive({
    challengeId: 1, // 1: 기간, 2: 개인
    categoryId: 1, // 마찬가지 -> API로 받아서 store에 넣어놓기 & 로컬스토리지 검사해서 금주 숨겨놨을 경우 금주안가져오기
    startDate: null,
    duration: "",
    memo: "",
    title: "",
});

const state = reactive({
    formateedStartDate: null,
    showDatePicker: false,
});

onMounted(() => {});

const addChallenge = async () => {
    // TODO 유효성 검사 추가 필요
    if (challengeData.challengeId === 1)
        challengeData.title = challengeData.duration + "일 챌린지";
    else if (challengeData.challengeId === 2) {
        challengeData.duration = null;
    }

    try {
        challengeData.startDate = DateUtils.convertToKST(
            challengeData.startDate
        ); // 서버에 전송전 KST 변환
        await challengeSql.insert(challengeData);
        emits("commit");
    } catch (e) {
        console.log(e);
    }
};

const updateStartDate = () => {
    if (challengeData.startDate) {
        state.formateedStartDate = DateUtils.getTodayFormatDate(
            challengeData.startDate
        );
        state.showDatePicker = false;
    }
};
updateStartDate();
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-4 text-white">
            <div class="mb-4 text-center text-xl font-semibold">
                새로운 챌린지 추가
            </div>
            <v-divider class="mb-4"></v-divider>

            <!-- Challenge Type Radio Buttons -->
            <div class="mb-4">
                <v-card class="!shadow-none">
                    <v-card-text class="flex justify-between">
                        <v-btn
                            v-for="challenge in $common.value.challenges"
                            :key="challenge.id"
                            class="w-47/100"
                            :class="{
                                '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                    challengeData.challengeId === challenge.id,
                            }"
                            :active="challengeData.challengeId === challenge.id"
                            @click="challengeData.challengeId = challenge.id"
                        >
                            <span class="text-base">{{
                                challenge.type_ko
                            }}</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </div>

            <div class="mb-4 mt-1" v-if="user.info.smokingStatus">
                <span class="block text-lg font-semibold">카테고리</span>
                <v-card class="!shadow-none">
                    <v-card-text class="flex justify-between">
                        <v-btn
                            v-for="category in $common.value.categories"
                            :key="category.id"
                            class="w-47/100"
                            :class="{
                                '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                    challengeData.categoryId === category.id,
                            }"
                            :active="challengeData.categoryId === category.id"
                            @click="challengeData.categoryId = category.id"
                        >
                            <span class="text-base">{{
                                category.type_ko
                            }}</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </div>

            <v-text-field
                v-if="challengeData.challengeId === 2"
                v-model="challengeData.title"
                label="챌린지명"
                variant="underlined"
                class="mb-4"
                :placeholder="
                    challengeData.categoryId === 1
                        ? '회식 날 술 안 먹기'
                        : '술 마실 때 줄담배 안 피기'
                "
            ></v-text-field>

            <span class="my-1 block text-lg font-semibold">{{
                challengeData.challengeId === 1
                    ? "챌린지 시작 날짜"
                    : "챌린지 날짜"
            }}</span>
            <v-menu
                v-model="state.showDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
                attach
            >
                <template #activator="">
                    <v-text-field
                        v-model="state.formateedStartDate"
                        prepend-icon="mdi-calendar"
                        readonly
                        class="mb-4"
                        :placeholder="
                            challengeData.challengeId === 1
                                ? '챌린지 시작일을 선택하세요'
                                : '챌린지 날짜를 선택하세요'
                        "
                        @click="state.showDatePicker = true"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="challengeData.startDate"
                    @update:modelValue="updateStartDate"
                    :hide-header="true"
                    :allowed-dates="
                        (date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // 시간 정보를 제거하여 오늘 날짜만 남김
                            return new Date(date) >= today; // 오늘 포함 이후 날짜만 선택 가능
                        }
                    "
                ></v-date-picker>
            </v-menu>

            <v-text-field
                v-if="challengeData.challengeId === 1"
                v-model="challengeData.duration"
                label="목표 일 수"
                variant="underlined"
                class="mb-4"
                @input="
                    challengeData.duration = Formatters.inputNumber(
                        challengeData.duration
                    )
                "
                placeholder="목표 기간을 입력하세요"
            ></v-text-field>

            <v-textarea
                v-model="challengeData.memo"
                label="메모"
                variant="underlined"
                rows="2"
                class="mb-4"
                persistent-counter
                placeholder="메모를 입력하세요"
                :counter="50"
            ></v-textarea>

            <div class="flex justify-end">
                <v-btn text color="gray" @click="show = false">취소</v-btn>
                <v-btn color="primary" @click="addChallenge">추가하기</v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
