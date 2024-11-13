<script setup>
import { ref, reactive, onMounted } from "vue";

const props = defineProps(["data"]);
const percentages = ref([]);

const chartData = reactive({
    data: [
        {
            label: "토했어요",
            bgColor: "#FFC4C4",
            count: 5,
        },
        {
            label: "안 마셨어요",
            bgColor: "#FFDE7B",
            count: 2,
        },
        {
            label: "디질뻔했어요",
            bgColor: "#F5586A",
            count: 7,
        },
    ],
    // 추가 컬러 있을경우 tailwind config에 추가 필요 //
    backgroundColor: ["#FFC4C4", "#FFDE7B", "#F5586A"],
});

onMounted(() => {
    percentages.value = calculatePercentages(chartData.data);
});

const calculatePercentages = (values) => {
    const sum = values.reduce((acc, value) => acc + value.count, 0);
    const percentages = values.map((value) =>
        ((value.count / sum) * 100).toFixed(2)
    );

    return percentages;
};
</script>
<template>
    <div>
        <div class="flex w-full rounded-full">
            <div
                v-for="(item, idx) in chartData.data"
                :key="item.label"
                class="h-3.5"
                :class="[
                    `bg-[${item.bgColor}]`,
                    idx === 0 && 'rounded-l-full',
                    idx === chartData.data.length - 1 && 'rounded-r-full',
                ]"
                :style="`width: ${percentages[idx]}%`"
            ></div>
        </div>
    </div>
    <div class="rounded-md p-5">
        <ul>
            <li
                v-for="(item, idx) in chartData.data"
                :key="item.label"
                class="flex justify-between"
            >
                <div class="mb-1.5 flex items-center">
                    <div
                        class="mr-2.5 h-2.5 w-7 rounded-full"
                        :class="`bg-[${item.bgColor}]`"
                    ></div>
                    <span class="text-base">{{ item.label }}</span>
                </div>
                <span class="text-base font-medium"
                    >{{ percentages[idx] }} %</span
                >
            </li>
        </ul>
    </div>
</template>
