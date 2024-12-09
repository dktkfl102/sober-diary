<script setup>
import { reactive } from "vue";
import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";

const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["close"]);
const diaryData = reactive({
    score: null,
    logDate: new Date(),
    memo: "",
    categoryId: 1,
});

const state = reactive({
    formateedLogDate: null,
    showDatePicker: false,
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
        await diarySql.insert(diaryData);
        show.value = false;
    } catch (e) {
        console.log(e);
    }
};
updateLogdate();
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-4 text-white">
            <div class="mb-4 text-center text-xl font-semibold">기록 추가</div>
            <v-divider class="mb-4"></v-divider>

            <!-- Challenge Type Radio Buttons -->

            <span class="mt-1 block text-lg font-semibold">카테고리</span>
            <v-card>
                <v-card-text class="flex justify-between">
                    <v-btn
                        class="w-47/100"
                        :class="{
                            '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                diaryData.categoryId === 1,
                        }"
                        :active="diaryData.categoryId === 1"
                        @click="diaryData.categoryId = 1"
                        ><span class="text-base">음주</span></v-btn
                    >
                    <v-btn
                        class="w-47/100"
                        :class="{
                            '!bg-gradient-to-r from-violet-400 to-pink-500 text-white':
                                diaryData.categoryId === 2,
                        }"
                        :active="diaryData.categoryId === 2"
                        @click="diaryData.categoryId = 2"
                        ><span class="text-base">흡연</span></v-btn
                    >
                </v-card-text>
            </v-card>

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
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="diaryData.logDate"
                    @update:modelValue="updateLogdate()"
                    :hide-header="true"
                ></v-date-picker>
            </v-menu>

            <div
                class="mb-4 flex flex-col items-center justify-center gap-y-1 text-7xl"
            >
                <span class="text-lg">많이 마셨어요</span>
            </div>
            <v-slider
                v-model="diaryData.score"
                :min="1"
                :max="5"
                :step="1"
            ></v-slider>

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
                <v-btn color="primary" @click="writeDiary">작성하기</v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
