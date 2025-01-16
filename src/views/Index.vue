<script setup>
import { onMounted, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

import UserUtils from "@/utils/user-utils";
import LocalStorageService from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";
import BottomSheet from "@/utils/bottomSheet/BottomSheet.vue";

const router = useRouter();
const user = useUserStore();
const bottomSheetContents = inject("$bottomSheetContents");
const isSmokingStatusPopupVisible = ref(false);

const initializeUser = async () => {
    try {
        let userUuid = LocalStorageService.getItem(LocalStorageKey.UUID);

        if (!userUuid) {
            await UserUtils.registerUser(); // 신규 사용자 등록
            isSmokingStatusPopupVisible.value = true;
        } else {
            await UserUtils.loadUserInfo(userUuid); // 기존 사용자 정보 로드
            router.push({ name: "Home" });
        }
    } catch (error) {
        console.error("Error initializing user:", error);
    }
};

const finishedSmokingStatus = (val) => {
    LocalStorageService.setItem(LocalStorageKey.SMOKING_STATUS, val);
    user.info.smokingStatus = val;
    isSmokingStatusPopupVisible.value = false;
    router.push({ name: "Home" });
};

onMounted(initializeUser);
</script>

<template>
    <div class="flex h-screen w-full items-center justify-center">
        <img src="@/assets/images/icon/splash.png" class="block w-28" />
    </div>
    <BottomSheet
        :show="isSmokingStatusPopupVisible"
        :popData="bottomSheetContents.CHECK_SMOKING_STATUS"
        :persistent="true"
        @commit="finishedSmokingStatus"
    />
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
