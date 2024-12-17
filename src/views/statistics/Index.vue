<script setup>
import { ref, onMounted } from "vue";

import diarySql from "@/services/sql/diary.sql";
import DateUtils from "@/utils/date-utils";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Doughnut from "@/components/common/chart/Doughnut.vue";
import HorizontalBar from "@/components/common/chart/HorizontalBar.vue";
import { alcholeMessages, scoreColors } from "@/constants/alchole";

const targetMonth = ref(DateUtils.getYearAndMonth());
const chartData = ref([]);
const chartKey = ref(0);
const percentages = ref([]);
const totalAlcholeCount = ref(0);
const totalSmokingCount = ref(0);

onMounted(() => {
    getChartData();
});

const getChartData = async () => {
    const result = await diarySql.getListByMonth(targetMonth.value);
    countScore(result);
};

const countScore = (data) => {
    if (data.length === 0) {
        chartData.value = [];
        totalAlcholeCount.value = 0;
        return;
    }

    const scoreCounts = Array(5).fill(0);

    data.forEach((item) => {
        scoreCounts[item.score - 1] += 1; // 점수에 맞는 인덱스 증가
    });
    chartData.value = scoreCounts;
    percentages.value = calculatePercentages(chartData.value);
    totalAlcholeCount.value = chartData.value
        .slice(1)
        .reduce((acc, current) => acc + current, 0);
};

const changeDate = async (target) => {
    const searchDate = new Date(targetMonth.value);
    searchDate.setMonth(searchDate.getMonth() + target);
    targetMonth.value = DateUtils.getYearAndMonth(searchDate);
    await getChartData();
    chartKey.value++;
};

const calculatePercentages = (values) => {
    const sum = values.reduce((acc, value) => acc + value, 0);
    const percentages = values.map((value) => ((value / sum) * 100).toFixed(2));

    return percentages;
};
</script>
<template>
    <div class="m-4 pb-20">
        <div class="flex items-center">
            <v-icon
                icon="mdi-chevron-left"
                class="!text-3xl"
                @click="changeDate(-1)"
            ></v-icon>
            <span class="block text-xl font-semibold"
                >{{ targetMonth.replace("-", "년 ") }}월</span
            >
            <v-icon
                icon="mdi-chevron-right"
                class="!text-3xl"
                @click="changeDate(1)"
                v-if="targetMonth != DateUtils.getYearAndMonth()"
            ></v-icon>
        </div>
        <div v-if="chartData.length > 0">
            <Doughnut :chartData="chartData" :key="chartKey" />
            <div class="rounded-md p-5">
                <ul>
                    <li
                        v-for="(item, idx) in chartData"
                        :key="idx"
                        class="flex justify-between"
                    >
                        <div class="mb-1.5 flex items-center">
                            <div
                                class="mr-2.5 h-2.5 w-7 rounded-full"
                                :class="`bg-[${Object.values(scoreColors)[idx]}]`"
                            ></div>
                            <span class="text-base">{{
                                Object.values(alcholeMessages)[idx]
                            }}</span>
                        </div>
                        <span class="text-base font-medium"
                            >{{ percentages[idx] }} %</span
                        >
                    </li>
                </ul>
            </div>
            <div class="mx-4">
                <p class="font-medium">
                    이 달의 음주 횟수 :
                    <span class="pr-1 text-xl font-bold text-blue-500">{{
                        totalAlcholeCount
                    }}</span
                    >회
                </p>
                <p class="font-medium">총 흡연 횟수 : 0회</p>
            </div>
            <!-- <div>
            <span class="mb-3 mt-5 block text-lg font-semibold"
                >기분별 음주 기록</span
            >
            <div class="mx-2">
                <span class="mb-1 block">좋을 때</span>
                <HorizontalBar></HorizontalBar>
                <span class="mb-1 block">나쁠 때</span>
                <HorizontalBar></HorizontalBar>
            </div>
        </div> -->
        </div>
        <div class="mt-16 flex flex-col items-center" v-else>
            <v-icon icon="mdi-gift-open-outline" class="my-3 !w-10 !text-4xl" />
            <p class="text-center font-medium">
                일지를 작성하면<br />음주량의 통계를 확인 할 수 있어요!
            </p>
        </div>
    </div>
    <BottomNavigation></BottomNavigation>
</template>
