<script setup>
import { reactive } from "vue";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import BottomNavigation from "@/components/layout/BottomNavigation.vue";

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
</script>
<template>
    <div class="m-4">
        <FullCalendar :options="calendarOptions" />
    </div>
    <div class="mx-4">
        <div class="mb-1 flex flex-col items-end">
            <span class="text-xs text-gray-400">2024년 11월 금주 일</span
            ><span>2일</span>
        </div>
        <ul class="divide-y divide-gray-400 rounded-lg">
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <div class="flex items-center space-x-4">
                    <span
                        class="h-8 w-8 flex-shrink-0 rounded-full bg-red-500"
                    ></span>
                    <div class="flex flex-col">
                        <span class="text-lg font-medium">필름이 끊겼어요</span>
                        <span class="text-sm text-gray-300"
                            >아 씨바 또 눈뜨니 집이네</span
                        >
                    </div>
                </div>
                <span class="min-w-max text-sm text-gray-400">11월 20일</span>
            </li>
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <div class="flex items-center space-x-4">
                    <span
                        class="h-8 w-8 flex-shrink-0 rounded-full bg-yellow-500"
                    ></span>
                    <div class="flex flex-col">
                        <span class="text-lg font-medium">토했어요</span>
                    </div>
                </div>
                <span class="min-w-max text-sm text-gray-400">11월 18일</span>
            </li>
        </ul>
    </div>
    <BottomNavigation></BottomNavigation>
</template>
