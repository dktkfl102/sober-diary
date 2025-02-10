<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import DateUtils from "@/utils/date-utils";
import { alcholeMessages, scoreColors } from "@/constants/alchole";

const props = defineProps({ list: Array });
const emits = defineEmits(["update", "delete"]);

const user = useUserStore();
const swipeId = ref(null);
const prevPosX = ref(null);

const touchStart = (e) => {
    prevPosX.value = e.changedTouches[0].clientX;
};

const touchEnd = (e, id) => {
    if (swipeId.value === id) return;
    const posX = e.changedTouches[0].clientX;
    if (prevPosX.value > posX) {
        swipeId.value = id;
    } else swipeId.value = null;
};
</script>
<template>
    <ul class="divide-y divide-gray-400 rounded-lg">
        <li
            v-for="item of props.list"
            :key="item.id"
            @touchstart.passive="touchStart"
            @touchend="touchEnd($event, item.id)"
            class="relative flex items-center justify-between overflow-hidden bg-gray-800 p-4"
        >
            <div class="flex items-center space-x-4">
                <span
                    class="h-8 w-8 flex-shrink-0 rounded-full"
                    :class="'bg-[' + scoreColors[item.score] + ']'"
                ></span>
                <div class="flex flex-col">
                    <span class="text-lg font-medium">{{
                        alcholeMessages[item.score]
                    }}</span>
                    <span class="text-sm text-gray-300">{{ item.memo }}</span>
                </div>
            </div>
            <div class="flex min-w-max flex-col items-center">
                <span class="text-sm text-gray-400">{{
                    DateUtils.checkTodayAndYesterDay(item.log_date)
                }}</span>
                <div v-if="user.info.smokingStatus">
                    <span v-if="item.smoked"
                        ><v-icon
                            icon="mdi-smoking"
                            class="!text-base text-gray-200"
                    /></span>
                    <span v-else
                        ><v-icon
                            icon="mdi-smoking-off"
                            class="!text-base text-gray-200"
                    /></span>
                </div>
            </div>
            <div
                class="absolute right-[-100%] flex gap-x-2 transition-all"
                :class="{ '!right-1': swipeId === item.id }"
            >
                <div
                    class="flex flex-col items-center justify-center rounded-lg bg-gray-400 px-4 py-1.5"
                    @click="[$emit('update', item), (swipeId = null)]"
                >
                    <v-icon
                        icon="mdi-pencil-outline"
                        size="small"
                        class="mb-1"
                    />
                    <span class="text-xs font-light">수정</span>
                </div>
                <div
                    class="flex flex-col items-center justify-center rounded-lg bg-red-500 px-4 py-1.5"
                    @click="$emit('delete', item.id)"
                >
                    <v-icon
                        icon="mdi-delete-outline"
                        size="small"
                        class="mb-1"
                    />
                    <span class="text-xs font-light">삭제</span>
                </div>
            </div>
        </li>
    </ul>
</template>
