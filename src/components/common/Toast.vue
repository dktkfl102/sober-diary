<script setup>
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast";
const { show, msg, color } = storeToRefs(useToastStore());
// 토스트 종료시 컬러 원복
const closeToast = (e) => {
    if (!e) color.value = "white";
};
</script>
<template>
    <v-snackbar
        v-model="show"
        :timeout="2000"
        :color="color"
        @update:modelValue="closeToast"
    >
        {{ msg }}
    </v-snackbar>
</template>
