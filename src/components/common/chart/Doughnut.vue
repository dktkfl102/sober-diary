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
import { alcholeMessages, scoreColors } from "@/constants/alchole";

ChartJS.register(PointElement, LineElement, ArcElement, Title, Tooltip, Legend);
ChartJS.defaults.font.family = "Pretendard, sans-serif";

const props = defineProps({
    chartData: Array,
});
const data = {
    labels: Object.values(alcholeMessages),
    datasets: [
        {
            data: props.chartData,
            backgroundColor: Object.values(scoreColors),
            hoverOffset: 30,
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
            display: false,
            position: "bottom",
            maxWidth: 20,
            labels: {
                color: "white",
                size: "20px",
                padding: 15,
            },
        },
    },
    layout: {
        padding: 0,
    },
};

// const myPlugin = {
//     beforeDraw: (chart) => {
//         const { ctx } = chart;

//         // 중앙 위치 계산
//         const centerX =
//             chart.chartArea.left +
//             (chart.chartArea.right - chart.chartArea.left) / 2;
//         const centerY =
//             chart.chartArea.top +
//             (chart.chartArea.bottom - chart.chartArea.top) / 2;
//         ctx.save();

//         // 텍스트 설정
//         const text = `음주: ${props.chartData[2]} 회`;
//         ctx.font = "20px Arial";
//         ctx.fillStyle = "white";
//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";
//         ctx.fillText(text, centerX, centerY);

//         ctx.restore();
//     },
// };
</script>
<template>
    <div class="mb-5 mt-10 flex h-40 justify-center">
        <Doughnut :data="data" :options="options" />
    </div>
</template>
