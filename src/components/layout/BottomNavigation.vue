<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const activeMenu = ref("");
const list = ref([
    { name: "Home", icon: "home", display: "홈" },
    { name: "Challenge", icon: "fire", display: "챌린지" },
    {
        name: "Statistics",
        icon: "chart-timeline-variant-shimmer",
        display: "통계",
    },
    { name: "Setting", icon: "cog", display: "설정" },
]);

const changeNavigation = (val) => {
    if (val !== null || val !== undefined) {
        router.push({ name: list.value[val].name });
    }
};

activeMenu.value = list.value.findIndex((val) => val.name === route.name);
</script>
<template>
    <v-layout class="overflow-visible">
        <v-bottom-navigation
            mandatory
            grow
            @update:model-value="changeNavigation"
        >
            <v-btn v-for="(item, idx) in list" :key="item.name" :ripple="false">
                <v-icon>mdi-{{ item.icon }}</v-icon>

                <span class="text-[13px]" v-if="activeMenu === idx">{{
                    item.display
                }}</span>
            </v-btn>
        </v-bottom-navigation>
    </v-layout>
</template>
