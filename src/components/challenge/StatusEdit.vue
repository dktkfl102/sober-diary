<script setup>
const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["commit"]);
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-6 text-white">
            <div class="mb-6 text-center text-xl font-semibold">
                챌린지 상태 변경
            </div>
            <div class="space-y-4">
                <div
                    class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-700 p-4"
                    @click="$emit('commit', true)"
                >
                    <div class="flex items-center space-x-4">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <i class="mdi mdi-check text-lg text-white"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">성공</p>
                            <p class="text-sm text-gray-400">와 정말 멋져요!</p>
                        </div>
                    </div>
                </div>

                <div
                    class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-700 p-4"
                    @click="$emit('commit', false)"
                >
                    <div class="flex items-center space-x-4">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <i class="mdi mdi-cancel text-lg text-white"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">실패</p>
                            <p class="text-sm text-gray-400">
                                괜찮아요. 다음에 또 도전하면 돼요!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
