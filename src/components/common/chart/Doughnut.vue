<script setup>
import { ref, onMounted, computed } from "vue";
import { Doughnut } from "vue-chartjs";
import {
    Chart as ChartJS,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(PointElement, LineElement, ArcElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = "Pretendard, sans-serif";

const chartData = ref([]);
const data = {
    labels: ["안 마셨어요", "취했어요", "토했어요"],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
            borderWidth: 1,
        },
    ],
};

const options = {
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    let value = context.raw;
                    let total = context.dataset.data.reduce((a, b) => a + b, 0);
                    let percentage = ((value / total) * 100).toFixed(2) + "%";
                    return `${value}회 (${percentage})`;
                },
            },
        },
        legend: {
            position: "right",
            labels: {
                color: "white",
                size: "20px",
            },
        },
    },
};
</script>
<template>
    <Doughnut :data="data" :options="options" />
</template>
