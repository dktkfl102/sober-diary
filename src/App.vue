<script setup>
import commonSql from "@/services/sql/common.sql";
import { useCommonStore } from "./stores/common";

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
</template>
