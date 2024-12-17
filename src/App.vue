<script setup>
import { useCommonStore } from "./stores/common";
import commonSql from "@/services/sql/common.sql";
import Toast from "@/components/common/Toast.vue";

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
