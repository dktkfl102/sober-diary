<script setup>
const show = defineModel("show", { type: Boolean });
const props = defineProps({
    popData: {
        type: Object,
        default: {},
    },
    persistent: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(["commit"]);
</script>
<template>
    <v-bottom-sheet
        v-model="show"
        max-width="500"
        class="font-pretendard"
        :persistent="persistent"
    >
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-6 text-white">
            <div
                class="mb-6 text-center text-xl font-semibold"
                v-html="popData.title"
            ></div>
            <div class="space-y-4">
                <div
                    v-for="(btn, index) in popData.btnList"
                    :key="index"
                    class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-700 p-4"
                    @click="$emit('commit', btn.resoponse)"
                >
                    <div class="flex items-center space-x-4">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <i
                                :class="`mdi mdi-${btn.icon} text-lg text-white`"
                            ></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">{{ btn.title }}</p>
                            <p class="text-sm text-gray-400">
                                {{ btn.content }}
                            </p>
                        </div>
                    </div>
                </div>
                <slot name="bottom"></slot>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
