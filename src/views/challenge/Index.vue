<script setup>
import { inject, ref, onMounted } from "vue";

import challengeSql from "@/services/sql/challenge.sql";
import DateUtils from "@/utils/date-utils";
import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Add from "@/components/challenge/Add.vue";
import BottomSheet from "@/utils/bottomSheet/BottomSheet.vue";

const bottomSheetContents = inject("$bottomSheetContents");
const ingList = ref([]);
const completedList = ref([]);
const addPopsShow = ref(false);
const addPopsKey = ref(0);
const statusEditPopsShow = ref(false);
const statusEditId = ref(null);

onMounted(async () => {
    getRecentList();
});

const getRecentList = async () => {
    ingList.value = [];
    completedList.value = [];

    try {
        const list = await challengeSql.getRecentList();
        list.forEach((item) => {
            if (item.status === "in_progress") ingList.value.push(item);
            else completedList.value.push(item);
        });
    } catch (e) {
        console.log(e);
    }
};

const finishedAddChallenge = () => {
    getRecentList();
    addPopsShow.value = false;
    addPopsKey.value++;
};

const editStatus = async (val) => {
    try {
        const result = val ? "successful" : "failed";
        await challengeSql.updateStatus(statusEditId.value, result);
        await getRecentList();
        statusEditPopsShow.value = false;
    } catch (e) {
        console.log(e);
    }
};

const clickProgressChalllenge = (id, challengeId) => {
    if (challengeId === 1) return;
    statusEditId.value = id;
    statusEditPopsShow.value = true;
};
</script>
<template>
    <Add
        v-model:show="addPopsShow"
        :key="addPopsKey"
        @commit="finishedAddChallenge()"
    />
    <div class="mx-auto max-w-md p-4 pb-20">
        <h1 class="text-2xl font-semibold">챌린지</h1>
        <div v-if="ingList.length + completedList.length > 0">
            <h2 class="my-5 text-xl font-semibold">도전중</h2>
            <div class="space-y-4">
                <div
                    class="relative animate-pulse overflow-hidden rounded-lg border-2 border-blue-500"
                    v-for="item of ingList"
                    :key="item.id"
                    @click="clickProgressChalllenge(item.id, item.challenge_id)"
                >
                    <span
                        class="absolute right-2 top-2 rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white"
                        >도전 중</span
                    >
                    <div class="bg-gray-800 p-4">
                        <p class="text-lg font-semibold">{{ item.title }}</p>
                        <p v-if="item.memo" class="text-sm text-gray-400">
                            메모: {{ item.memo }}
                        </p>
                        <p
                            class="text-sm text-gray-400"
                            v-if="item.challenge_id === 1"
                        >
                            기간:
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(item.start_date)
                                )
                            }}
                            ~
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(
                                        Date.now() +
                                            item.duration *
                                                24 *
                                                60 *
                                                60 *
                                                1000 -
                                            24 * 60 * 60 * 1000
                                    )
                                )
                            }}
                        </p>
                        <p class="text-sm text-gray-400" v-else>
                            도전일:
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(item.start_date)
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>

            <h1 class="my-5 text-xl font-semibold">종료</h1>
            <div class="space-y-4">
                <div
                    class="relative overflow-hidden rounded-lg border border-gray-700"
                    v-for="item of completedList"
                    :key="item.id"
                    :class="
                        item.status === 'successful'
                            ? ['bg-gradient-to-r from-green-500 to-green-400']
                            : ['bg-gray-700 opacity-75']
                    "
                >
                    <span
                        class="absolute right-2 top-2 rounded px-2 py-1 text-xs font-semibold text-white"
                        :class="
                            item.status === 'successful'
                                ? ['bg-green-600']
                                : ['bg-red-600']
                        "
                        >{{
                            item.status === "successful" ? "성공" : "실패"
                        }}</span
                    >
                    <div
                        class="p-4 text-sm"
                        :class="
                            item.status === 'successful'
                                ? ['text-gray-100']
                                : ['text-gray-400']
                        "
                    >
                        <p class="text-lg font-semibold text-white">
                            {{ item.title }}
                        </p>
                        <p v-if="item.challenge_id === 2">
                            카테고리:
                            {{ item.categoty_id === 1 ? "음주" : "흡연" }}
                        </p>
                        <p v-if="item.memo">메모: {{ item.memo }}</p>
                        <p v-if="item.challenge_id === 1">
                            기간:
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(item.start_date)
                                )
                            }}
                            ~
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(
                                        Date.now() +
                                            item.duration *
                                                24 *
                                                60 *
                                                60 *
                                                1000 -
                                            24 * 60 * 60 * 1000
                                    )
                                )
                            }}
                        </p>
                        <p v-else>
                            도전일:
                            {{
                                DateUtils.getTodayFormatDate(
                                    new Date(item.start_date)
                                )
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-16 flex flex-col items-center" v-else>
            <v-icon icon="mdi-gift-open-outline" class="my-3 !w-10 !text-4xl" />
            <p class="font-medium">지금 바로 나만의 챌린지를 시작해보세요!</p>
        </div>
    </div>
    <div
        @click="addPopsShow = true"
        class="fixed bottom-20 right-3 rounded-2xl bg-blue-500 p-3"
    >
        <v-icon icon="mdi-plus"></v-icon>
    </div>
    <BottomSheet
        v-model:show="statusEditPopsShow"
        @commit="editStatus"
        :popData="bottomSheetContents.CHANGE_CHALLENGE_STATUS"
    >
        <template v-slot:bottom>
            <p class="text-center">
                <span class="text-xs underline">삭제하기</span>
            </p>
        </template>
    </BottomSheet>
    <BottomNavigation></BottomNavigation>
</template>
