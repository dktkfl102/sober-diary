<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

import userSql from "@/services/sql/user.sql";
import LocalStorageService from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";
import SmokingStatusPopup from "@/components/common/SmokingStatusPopup.vue";

const router = useRouter();
const user = useUserStore();
const isSmokingStatusPopupVisible = ref(false);

const initializeUser = async () => {
    try {
        let userUuid = LocalStorageService.getItem(LocalStorageKey.UUID);

        if (!userUuid) {
            await registerUser(); // 신규 사용자 등록
            isSmokingStatusPopupVisible.value = true;
        } else {
            await loadUserInfo(userUuid); // 기존 사용자 정보 로드
            router.push({ name: "Home" });
        }
    } catch (error) {
        console.error("Error initializing user:", error);
    }
};

const registerUser = async () => {
    const newUuid = "32KJD+SsSWIMWDDW823"; // TODO: UUID 생성 로직 필요
    const nickname = `술꾼${Math.floor(Math.random() * 100000)}`; // 랜덤 닉네임 생성
    await userSql.insertUser({ uuid: newUuid, nickname });
    LocalStorageService.setItem(LocalStorageKey.UUID, newUuid);
};

const loadUserInfo = async (uuid) => {
    const userInfo = await userSql.getUser(uuid);
    const smokingStatus = LocalStorageService.getItem(
        LocalStorageKey.SMOKING_STATUS
    );
    user.info = { ...userInfo, smokingStatus };
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
    <SmokingStatusPopup
        :show="isSmokingStatusPopupVisible"
        @commit="finishedSmokingStatus"
    />
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
