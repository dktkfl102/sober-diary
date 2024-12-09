<script setup>
import { ref, reactive, onMounted } from "vue";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import AddDirary from "@/components/home/AddDirary.vue";

const addDirayShow = ref(false);
const list = ref([]);

onMounted(async () => {
    try {
        list.value = await diarySql.getRecentList();
    } catch (e) {
        console.log(e);
    }
});

const onClickDate = (e) => {
    console.log(e);
};

const onChangeMonth = (e) => {
    console.log(e.view.getCurrentData());
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
    events: [
        {
            start: "2024-11-09",
            display: "background",
            backgroundColor: "#fca5a5",
        },
        {
            start: "2024-11-02",
            display: "background",
            backgroundColor: "#4ade80",
        },
    ],
    buttonText: {
        today: "오늘",
    },
});

const getScoreColor = (score) => {
    switch (score) {
        case 1:
            return "#9BFF0D";
        case 2:
            return "#E8D00C";
        case 3:
            return "#FFAA00";
        case 4:
            return "#E85F0C";
        case 5:
            return "#FF1104";
    }
};
</script>
<template>
    <div class="m-4">
        <FullCalendar :options="calendarOptions" />
    </div>
    <div class="mx-4 pb-10">
        <div class="mb-1 flex flex-col items-end">
            <span class="text-xs text-gray-400">2024년 11월 금주 일</span
            ><span>2일</span>
        </div>
        <ul class="divide-y divide-gray-400 rounded-lg">
            <li
                v-for="item of list"
                :key="item.id"
                class="flex items-center justify-between bg-gray-800 p-4"
            >
                <div class="flex items-center space-x-4">
                    <span
                        class="h-8 w-8 flex-shrink-0 rounded-full"
                        :class="'bg-[' + getScoreColor(item.score) + ']'"
                    ></span>
                    <div class="flex flex-col">
                        <span class="text-lg font-medium">필름이 끊겼어요</span>
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
    </div>
    <div
        @click="addDirayShow = true"
        class="fixed bottom-20 right-3 rounded-2xl bg-blue-500 p-3"
    >
        <v-icon icon="mdi-plus"></v-icon>
    </div>
    <AddDirary v-model:show="addDirayShow" />
    <BottomNavigation></BottomNavigation>
</template>
