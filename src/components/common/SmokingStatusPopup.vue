<script setup>
const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["commit"]);
</script>
<template>
    <v-bottom-sheet
        v-model="show"
        max-width="500"
        class="font-pretendard"
        persistent
    >
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-6 text-white">
            <div class="mb-6 text-center text-xl font-semibold">
                반가워요!<br />흡연 유무도 같이 관리하시겠어요?
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
                            <i class="mdi mdi-smoking text-lg text-white"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">좋아요</p>
                            <p class="text-sm text-gray-400">
                                금연 챌린지도 함께 할 수 있어요
                            </p>
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
                            <i
                                class="mdi mdi-smoking-off text-lg text-white"
                            ></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">필요 없어요</p>
                            <p class="text-sm text-gray-400">
                                설정 화면에서 다시 선택 할 수 있어요
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
