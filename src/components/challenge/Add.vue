<script setup>
import { onMounted, reactive } from "vue";

import DateUtils from "@/utils/date-utils";

const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["close"]);

const challengeData = reactive({
    challengeType: 1, // TODO 챌린지 타입 API로 받아오기
    name: "",
    categoryId: 1, // 마찬가지 -> API로 받아서 store에 넣어놓기 & 로컬스토리지 검사해서 금주 숨겨놨을 경우 금주안가져오기
    startDate: null,
    duration: "",
    memo: "",
});

const state = reactive({
    formateedStartDate: null,
    showDatePicker: false,
});

onMounted(() => {});

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
                <v-card>
                    <v-card-text class="flex justify-between">
                        <v-btn
                            v-for="challenge in $common.value.challenges"
                            :key="challenge.id"
                            class="w-47/100"
                            :class="{
                                '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                    challengeData.challengeType ===
                                    challenge.id,
                            }"
                            :active="
                                challengeData.challengeType === challenge.id
                            "
                            @click="challengeData.challengeType = challenge.id"
                        >
                            <span class="text-base">{{ challenge.type }}</span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </div>

            <span class="mt-1 block text-lg font-semibold">카테고리</span>
            <v-card>
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
                        <span class="text-base">{{ category.type }}</span>
                    </v-btn>
                </v-card-text>
            </v-card>

            <v-text-field
                v-if="challengeData.type === 2"
                v-model="challengeData.name"
                label="챌린지명"
                variant="underlined"
                class="mb-4"
                :placeholder="
                    challengeData.type === 1
                        ? '회식 날 술 안 먹기'
                        : '술 마실 때 줄담배 안 피기'
                "
            ></v-text-field>

            <span class="my-1 block text-lg font-semibold">{{
                challengeData.type === 1 ? "챌린지 시작 날짜" : "챌린지 날짜"
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
                            challengeData.type === 1
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
                v-if="challengeData.type === 1"
                v-model="challengeData.duration"
                label="목표 일 수"
                variant="underlined"
                class="mb-4"
                type="number"
                min="1"
                placeholder="목표 기간을 입력하세요"
            ></v-text-field>

            <v-textarea
                v-model="challengeData.memo"
                label="메모"
                variant="underlined"
                rows="2"
                class="mb-4"
                placeholder="메모를 입력하세요"
            ></v-textarea>

            <div class="flex justify-end">
                <v-btn text color="gray" @click="show = false">취소</v-btn>
                <v-btn color="primary">추가하기</v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
