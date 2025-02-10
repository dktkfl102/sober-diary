<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useToastStore } from "@/stores/toast";

import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";
import List from "@/components/home/List.vue";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import diaryEditor from "@/components/home/diaryEditor.vue";
import { scoreColors } from "@/constants/alchole";

const toast = useToastStore();

const diaryEditorShow = ref(false);
const list = ref([]);
const addPopupKey = ref(0);
const editData = ref({});
const formattedMonth = ref(null);
const soberDay = ref(0);

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
        updateMonthlyEvents();
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
const updateMonthlyEvents = (date = null) => {
    formattedMonth.value = DateUtils.getYearAndMonth(date);
    calendarOptions.events = [];
    soberDay.value = 0;
    for (let i = 0; i < list.value.length; i++) {
        const item = list.value[i];
        if (item.log_date.startsWith(formattedMonth.value)) {
            calendarOptions.events.push({
                start: item.log_date,
                display: "background",
                backgroundColor: scoreColors[item.score],
            });
            if (item.score === 1) soberDay.value++;
        } else continue;
    }
};

const onClickDate = (e) => {
    console.log(e);
};

const onChangeMonth = (e) => {
    updateMonthlyEvents(e.view.getCurrentData().currentDate);
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
        start: "2024-11-01",
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
        <div class="mb-1 flex flex-col items-end" v-if="formattedMonth">
            <span class="text-xs text-gray-400"
                >{{ formattedMonth.replace("-", "년 ") }}월 금주 일</span
            ><span>{{ soberDay }}일</span>
        </div>
        <List
            :list="list"
            @delete="deleteDiary($event)"
            @update="updateDiary($event)"
            v-if="list.length > 0"
        />
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
