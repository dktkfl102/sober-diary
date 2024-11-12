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
    <div class="m-2">
        <FullCalendar :options="calendarOptions" />
    </div>
    <BottomNavigation></BottomNavigation>
</template>
