<script setup>
import { ref } from "vue";

import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Add from "@/components/challenge/Add.vue";

const addPopsShow = ref(false);
</script>
<template>
    <Add v-model:show="addPopsShow" />
    <div class="mx-auto max-w-md p-4 pb-20">
        <h1 class="text-2xl font-semibold">챌린지</h1>
        <h2 class="my-5 text-xl font-semibold">도전중</h2>
        <div class="space-y-4">
            <div
                class="relative animate-pulse overflow-hidden rounded-lg border-2 border-blue-500"
            >
                <span
                    class="absolute right-2 top-2 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white"
                    >도전 중</span
                >
                <div class="bg-gray-800 p-4">
                    <p class="text-lg font-semibold">7일 금주 챌린지</p>
                    <p class="text-sm text-gray-400">메모: 개인 도전 1</p>
                    <p class="text-sm text-gray-400">
                        기간: 2024-04-01 ~ 2024-04-08
                    </p>
                </div>
            </div>
        </div>

        <h1 class="my-5 text-xl font-semibold">종료</h1>

        <div class="space-y-4">
            <!-- 개인 타입 - 성공 -->
            <div
                class="relative overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-r from-green-500 to-green-400"
            >
                <span
                    class="absolute right-2 top-2 rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white"
                    >성공</span
                >
                <div class="p-4">
                    <p class="text-lg font-semibold text-white">
                        회식자리에서 술 안마시기
                    </p>
                    <p class="text-sm text-gray-100">카테고리: 금주</p>
                    <p class="text-sm text-gray-100">도전일: 2024-05-01</p>
                </div>
            </div>

            <!-- 개인 타입 - 실패 -->
            <div
                class="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-700 opacity-75"
            >
                <span
                    class="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                    >실패</span
                >
                <div class="p-4">
                    <p class="text-lg font-semibold">개인 타입</p>
                    <p class="text-sm text-gray-400">카테고리: 금주</p>
                    <p class="text-sm text-gray-400">이름: 개인 도전 3</p>
                    <p class="text-sm text-gray-400">시작일: 2024-06-01</p>
                </div>
            </div>
        </div>
    </div>
    <div
        @click="addPopsShow = true"
        class="fixed bottom-20 right-3 rounded-full bg-blue-500 p-3"
    >
        <v-icon icon="mdi-plus"></v-icon>
    </div>
    <BottomNavigation></BottomNavigation>
</template>
