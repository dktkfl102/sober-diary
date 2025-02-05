<script setup>
import { ref, onUpdated, reactive } from "vue";
import { useUserStore } from "@/stores/user.js";

import diarySql from "@/services/sql/diary.sql";
import challengeSql from "@/services/sql/challenge.sql";
import DateUtils from "@/utils/date-utils";
import { alcholeMessages, scoreColors } from "@/constants/alchole";

const user = useUserStore();
const show = defineModel("show", { type: Boolean });
const props = defineProps({ editData: Object });
const emits = defineEmits(["commit"]);

let diaryData = reactive({
    score: 1,
    logDate: new Date(),
    memo: "",
    smoked: false,
});
const isEdit = ref(false);

const state = reactive({
    formateedLogDate: null,
    showDatePicker: false,
});

onUpdated(() => {
    if (Object.keys(props.editData).length > 0) {
        Object.assign(diaryData, {
            ...props.editData,
            logDate: new Date(props.editData.log_date),
        });
        isEdit.value = true;
    } else {
        isEdit.value = false;
        Object.assign(diaryData, {
            score: 1,
            logDate: new Date(),
            memo: "",
            smoked: false,
        });
    }
    updateLogdate();
});

const updateLogdate = () => {
    if (diaryData.logDate) {
        state.formateedLogDate = DateUtils.getTodayFormatDate(
            diaryData.logDate
        );
        state.showDatePicker = false;
    }
};

const writeDiary = async () => {
    try {
        const isDuplicated = await checkDuplicateion();
        if (isDuplicated) return;

        diaryData.logDate = DateUtils.convertToKST(diaryData.logDate); // 서버에 전송전 KST 변환
        console.log(diaryData);
        await diarySql.insert(diaryData);
        await checkCurrentChallenge();
    } catch (e) {
        console.log(e);
    }
};

const updateDiary = async () => {
    try {
        diaryData.logDate = DateUtils.convertToKST(diaryData.logDate); // 서버에 전송전 KST 변환
        await diarySql.update(diaryData, diaryData.id);
        emits("commit");
        show.value = false;
    } catch (e) {
        console.log(e);
    }
};

const checkDuplicateion = async () => {
    const item = await diarySql.getSpecificDate(state.formateedLogDate);
    if (item.length > 0) {
        alert("한 날짜에 한 개의 일지만 작성이 가능해요");
        return true;
    } else return false;
};

const checkCurrentChallenge = async () => {
    try {
        const challenges = await challengeSql.getInProgressList();
        if (challenges.length === 0) return;

        // 최대 2개
        for (const challenge of challenges) {
            const {
                id: challengeId,
                category_id,
                start_date: startDate,
                duration,
            } = challenge;
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + duration - 1);

            // 작성한 날짜로 챌린지 실패/성공 여부 확인
            // 날짜에 해당되는지 확인
            const entryDate = new Date(state.formateedLogDate); // diaryData.logDate값은 위에서 변환해놨으므로
            if (entryDate >= new Date(startDate) && entryDate <= endDate) {
                // 실패체크
                if (
                    (category_id === 1 && diaryData.score >= 2) ||
                    (category_id === 2 && diaryData.smoked === true)
                ) {
                    await challengeSql.updateStatus(challengeId, "failed");
                    continue;
                }

                // 성공체크
                const diaryCount = await diarySql.checkChallenge(
                    startDate,
                    DateUtils.getTodayFormatDate(endDate),
                    category_id
                );
                const isFullCoverage = diaryCount === duration;
                if (isFullCoverage) {
                    await challengeSql.updateStatus(challengeId, "successful");
                }
            }
        }
    } catch (e) {
        console.log(e);
    } finally {
        // 챌린지 확인 성공 실패 여부와 관계없이 처리
        emits("commit");
        show.value = false;
    }
};
updateLogdate();
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-4 text-white">
            <div class="mb-4 text-center text-xl font-semibold">
                기록 {{ !isEdit ? "추가" : "수정" }}
            </div>
            <v-divider class="mb-4"></v-divider>

            <v-menu
                v-model="state.showDatePicker"
                :close-on-content-click="false"
                transition="scale-transition"
                attach
            >
                <template #activator="">
                    <v-text-field
                        prepend-icon="mdi-calendar"
                        v-model="state.formateedLogDate"
                        class="mb-4"
                        label="기록할 날짜를 선택하세요"
                        readonly
                        @click="state.showDatePicker = true"
                        :disabled="isEdit"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="diaryData.logDate"
                    @update:modelValue="updateLogdate()"
                    :hide-header="true"
                    :allowed-dates="
                        (date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // 시간 정보를 제거하여 오늘 날짜만 남김
                            return new Date(date) <= today; // 오늘 포함 이후 날짜만 선택 가능
                        }
                    "
                ></v-date-picker>
            </v-menu>

            <div
                class="mb-4 flex flex-col items-center justify-center gap-y-1 text-7xl"
            >
                <span class="text-lg">{{
                    alcholeMessages[diaryData.score]
                }}</span>
            </div>
            <v-slider
                v-model="diaryData.score"
                :min="1"
                :max="5"
                :step="1"
                :color="scoreColors[diaryData.score]"
            ></v-slider>

            <template v-if="user.info.smokingStatus">
                <span class="mt-1 block text-lg font-semibold">흡연</span>
                <v-card>
                    <v-card-text class="flex justify-between">
                        <v-btn
                            class="w-47/100"
                            :class="{
                                '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                    diaryData.smoked,
                            }"
                            :active="diaryData.smoked"
                            @click="diaryData.smoked = true"
                            ><span class="text-base">O</span></v-btn
                        >
                        <v-btn
                            class="w-47/100"
                            :class="{
                                '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                    !diaryData.smoked,
                            }"
                            :active="!diaryData.smoked"
                            @click="diaryData.smoked = false"
                            ><span class="text-base">X</span></v-btn
                        >
                    </v-card-text>
                </v-card>
            </template>

            <v-textarea
                v-model="diaryData.memo"
                label="메모"
                variant="underlined"
                rows="2"
                class="mb-4"
                placeholder="메모를 입력하세요"
            ></v-textarea>

            <div class="flex justify-end">
                <v-btn text color="gray" @click="show = false">취소</v-btn>
                <v-btn v-if="!isEdit" color="primary" @click="writeDiary"
                    >작성하기</v-btn
                >
                <v-btn v-else color="primary" @click="updateDiary"
                    >수정하기</v-btn
                >
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
