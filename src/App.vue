<script setup>
import { useCommonStore } from "./stores/common";
import commonSql from "@/services/sql/common.sql";
import Toast from "@/components/common/Toast.vue";
import ReactBridgeService from "@/services/react-bridge.service";
import { onMounted } from "vue";

window.bridgeService = ReactBridgeService;
onMounted(() => {
    if (window.ReactNativeWebView) {
        // android
        document.addEventListener("message", window.bridgeService.onMessage);
        // ios
        window.addEventListener("message", window.bridgeService.onMessage);
    }
});

const common = useCommonStore();
const getCommonData = async () => {
    try {
        common.categories = await commonSql.getCategories();
        common.challenges = await commonSql.getChallenges();
    } catch (e) {}
};
getCommonData();
</script>

<template>
    <div class="font-pretendard">
        <router-view />
    </div>
    <Toast />
</template>
