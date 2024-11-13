<script setup>
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Doughnut from "@/components/common/chart/Doughnut.vue";
import HorizontalBar from "@/components/common/chart/HorizontalBar.vue";
</script>
<template>
    <div class="m-4">
        <div class="flex items-center">
            <v-icon icon="mdi-chevron-left" class="!text-3xl"></v-icon>
            <span class="block text-xl font-semibold">2024년 11월</span>
            <v-icon icon="mdi-chevron-right" class="!text-3xl"></v-icon>
        </div>
        <Doughnut />
        <div>
            <span class="mb-3 block text-lg font-semibold"
                >기분별 음주 기록</span
            >
            <div class="mx-2">
                <span class="mb-1 block">좋을 때</span>
                <HorizontalBar></HorizontalBar>
                <span class="mb-1 block">나쁠 때</span>
                <HorizontalBar></HorizontalBar>
            </div>
        </div>
    </div>
    <BottomNavigation></BottomNavigation>
</template>
