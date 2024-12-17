<script setup>
import { ref, reactive, onMounted } from "vue";
import { useToastStore } from "@/stores/toast";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";
import { alcholeMessages, scoreColors } from "@/constants/alchole";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import AddDirary from "@/components/home/AddDirary.vue";

const toast = useToastStore();
const addDirayShow = ref(false);
const list = ref([]);

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
        <div class="mb-1 flex flex-col items-end">
            <span class="text-xs text-gray-400">2024년 11월 금주 일</span
            ><span>2일</span>
        </div>
        <ul class="divide-y divide-gray-400 rounded-lg" v-if="list.length > 0">
            <li
                v-for="item of list"
                :key="item.id"
                class="flex items-center justify-between bg-gray-800 p-4"
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
                <span class="min-w-max text-sm text-gray-400">{{
                    DateUtils.getMonthAndDay(item.log_date)
                }}</span>
            </li>
        </ul>
        <div class="flex flex-col items-center" v-else>
            <v-icon icon="mdi-gift-open-outline" class="my-3 !w-10 !text-4xl" />
            <p class="font-medium">오늘의 음주를 기록해보세요!</p>
        </div>
    </div>
    <div
        @click="addDirayShow = true"
        class="fixed bottom-20 right-3 rounded-2xl bg-blue-500 p-3"
    >
        <v-icon icon="mdi-plus"></v-icon>
    </div>
    <AddDirary v-model:show="addDirayShow" @commit="getRecentDiary" />
    <BottomNavigation></BottomNavigation>
</template>
