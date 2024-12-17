<script setup>
import { useRouter } from "vue-router";
import UserUtils from "@/utils/user-utils";
import LocalStorageService from "@/services/localStorage/local-storage.service";

const router = useRouter();
const show = defineModel("show", { type: Boolean });
const emits = defineEmits(["commit"]);

const resetAppData = () => {
    LocalStorageService.clearStorage();
    UserUtils.registerUser();
    router.push({ name: "Home" });
};
</script>
<template>
    <v-bottom-sheet v-model="show" max-width="500" class="font-pretendard">
        <v-card class="rounded-t-xl bg-gray-800 px-6 py-6 text-white">
            <div class="mb-6 text-center text-xl font-semibold">
                정말 초기화 하시겠어요?
            </div>
            <div class="space-y-4">
                <div
                    class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-700 p-4"
                    @click="$emit('commit', true)"
                >
                    <div
                        class="flex items-center space-x-4"
                        @click="resetAppData"
                    >
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <i class="mdi mdi-check text-lg text-white"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">네</p>
                            <p class="text-sm text-gray-400">
                                모든 데이터가 삭제되어 복구 할 수 없어요.
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-700 p-4"
                    @click="show = false"
                >
                    <div class="flex items-center space-x-4">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500"
                        >
                            <i class="mdi mdi-cancel text-lg text-white"></i>
                        </div>
                        <div>
                            <p class="text-lg font-semibold">아니요</p>
                            <p class="text-sm text-gray-400">
                                좋아요! 기록을 계속 이어가봐요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
