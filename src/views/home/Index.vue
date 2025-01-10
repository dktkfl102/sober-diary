<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user.js";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";
import { alcholeMessages, scoreColors } from "@/constants/alchole";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import diaryEditor from "@/components/home/diaryEditor.vue";

const user = useUserStore();
const toast = useToastStore();

const diaryEditorShow = ref(false);
const list = ref([]);
const addPopupKey = ref(0);
const swipeId = ref(null);
const prevPosX = ref(null);
const editData = ref({});

onMounted(async () => {
    try {
        await getRecentDiary();
    } catch (e) {
        toast.showToast(e);
    }
});

const getRecentDiary = async () => {
    try {
        list.value = await diarySql.getRecentList();
        addEventsOnCalendar();
    } catch (e) {
        toast.showToast(e);
    }
};

const deleteDiary = async (id) => {
    try {
        await diarySql.delete(id);
        getRecentDiary();
        toast.showToast("삭제 되었어요");
    } catch (e) {
        toast.showToast(e);
    }
};

const updateDiary = async (item) => {
    editData.value = item;
    diaryEditorShow.value = true;
};

// date에 해당하는 월의 데이터만 달력에 표시해줌
const addEventsOnCalendar = (date = null) => {
    const formattedToday = DateUtils.getYearAndMonth(date);
    calendarOptions.events = [];
    for (let i = 0; i < list.value.length; i++) {
        const item = list.value[i];
        if (item.log_date.startsWith(formattedToday)) {
            calendarOptions.events.push({
                start: item.log_date,
                display: "background",
                backgroundColor: scoreColors[item.score],
            });
        } else continue;
    }
};

const onClickDate = (e) => {
    console.log(e);
};

const onChangeMonth = (e) => {
    addEventsOnCalendar(e.view.getCurrentData().currentDate);
};

const touchStart = (e) => {
    prevPosX.value = e.changedTouches[0].clientX;
};

const touchEnd = (e, id) => {
    const posX = e.changedTouches[0].clientX;
    if (prevPosX.value > posX) {
        swipeId.value = id;
    } else swipeId.value = null;
};

const calendarOptions = reactive({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: onClickDate,
    locale: "ko",
    aspectRatio: 1.1,
    dayMaxEventRows: true,
    fixedWeekCount: false,
    showNonCurrentDates: false,
    dayCellContent: function (arg) {
        return arg.dayNumberText.replace("일", "");
    },
    datesSet: onChangeMonth,
    validRange: {
        end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
    },
    events: [],
    buttonText: {
        today: "오늘",
    },
});
</script>
<template>
    <div class="m-4">
        <FullCalendar :options="calendarOptions" />
    </div>
    <div class="mx-4 pb-32">
        <!-- <div class="mb-1 flex flex-col items-end">
            <span class="text-xs text-gray-400">2024년 12월 금주 일</span
            ><span>3일</span>
        </div> -->
        <ul class="divide-y divide-gray-400 rounded-lg" v-if="list.length > 0">
            <li
                v-for="item of list"
                :key="item.id"
                @touchstart.passive="touchStart"
                @touchend.stop="touchEnd($event, item.id)"
                class="relative flex items-center justify-between overflow-hidden bg-gray-800 p-4"
            >
                <div class="flex items-center space-x-4">
                    <span
                        class="h-8 w-8 flex-shrink-0 rounded-full"
                        :class="'bg-[' + scoreColors[item.score] + ']'"
                    ></span>
                    <div class="flex flex-col">
                        <span class="text-lg font-medium">{{
                            alcholeMessages[item.score]
                        }}</span>
                        <span class="text-sm text-gray-300">{{
                            item.memo
                        }}</span>
                    </div>
                </div>
                <div class="flex min-w-max flex-col items-center">
                    <span class="text-sm text-gray-400">{{
                        DateUtils.getMonthAndDay(item.log_date)
                    }}</span>
                    <div v-if="user.info.smokingStatus">
                        <span v-if="item.smoked"
                            ><v-icon
                                icon="mdi-smoking"
                                class="!text-base text-gray-200"
                        /></span>
                        <span v-else
                            ><v-icon
                                icon="mdi-smoking-off"
                                class="!text-base text-gray-200"
                        /></span>
                    </div>
                </div>
                <div
                    class="absolute right-[-100%] flex gap-x-2 transition-all"
                    :class="{ '!right-1': swipeId === item.id }"
                >
                    <div
                        class="flex flex-col items-center justify-center rounded-lg bg-gray-400 px-4 py-1.5"
                        @click="updateDiary(item)"
                    >
                        <v-icon
                            icon="mdi-pencil-outline"
                            size="small"
                            class="mb-1"
                        />
                        <span class="text-xs font-light">수정</span>
                    </div>
                    <div
                        class="flex flex-col items-center justify-center rounded-lg bg-red-500 px-4 py-1.5"
                        @click="deleteDiary(item.id)"
                    >
                        <v-icon
                            icon="mdi-delete-outline"
                            size="small"
                            class="mb-1"
                        />
                        <span class="text-xs font-light">삭제</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="flex flex-col items-center" v-else>
            <v-icon
                icon="mdi-gift-open-outline"
                class="mb-3 mt-6 !w-10 !text-4xl"
            />
            <p class="font-medium">오늘의 음주를 기록해보세요!</p>
        </div>
    </div>
    <div
        @click="
            () => {
                editData = {};
                diaryEditorShow = true;
            }
        "
        class="fixed bottom-20 right-3 rounded-2xl bg-blue-500 p-3"
    >
        <v-icon icon="mdi-plus"></v-icon>
    </div>
    <diaryEditor
        v-model:show="diaryEditorShow"
        :editData="editData"
        :key="addPopupKey"
        @commit="[getRecentDiary(), addPopupKey++]"
    />
    <BottomNavigation></BottomNavigation>
</template>
