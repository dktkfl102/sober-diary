<script setup>
import { reactive, inject } from "vue";

import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Suggestions from "@/components/setting/Suggestions.vue";
import PrivacyPage from "@/components/common/terms/PrivacyPage.vue";
import UseTerms from "@/components/common/terms/UseTerms.vue";

const state = reactive({
    isNotification: true,
    privacyShow: false,
    useTermsShow: false,
    suggestionsShow: false,
    customerCenter: [
        { key: "faq", name: "FAQ", icon: "frequently-asked-questions" },
        { key: "suggestions", name: "의견 보내기", icon: "message-draw" },
        { key: "rating", name: "별점 남기기", icon: "star" },
        { key: "", name: "개발자에게 맥주사기", icon: "glass-mug-variant" },
    ],
    showDialog: false,
    popData: {},
});
</script>
<template>
    <div class="mx-auto max-w-md p-4">
        <h1 class="mb-4 text-2xl font-semibold">설정</h1>
        <ul
            class="divide-y divide-gray-700 overflow-hidden rounded-lg border border-gray-700"
        >
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <span
                    class="text-lg font-medium"
                    @click="state.suggestionsShow = true"
                    >의견 보내기</span
                >
            </li>
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <span class="text-lg font-medium">알림</span>
                <span class="text-sm text-gray-400">On</span>
            </li>
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <span class="text-lg font-medium">앱 버전</span>
                <span class="text-sm text-gray-400">1.0.0</span>
            </li>
            <li
                class="flex items-center justify-between bg-gray-800 p-4"
                @click="state.useTermsShow = true"
            >
                <span class="text-lg font-medium">이용약관</span>
                <span class="text-lg font-medium">></span>
            </li>
            <li
                class="flex items-center justify-between bg-gray-800 p-4"
                @click="state.privacyShow = true"
            >
                <span class="text-lg font-medium">개인정보처리방침</span>
                <span class="text-lg font-medium">></span>
            </li>
        </ul>
    </div>
    <BottomNavigation></BottomNavigation>

    <Suggestions
        :show="state.suggestionsShow"
        @close="state.suggestionsShow = false"
    />
    <PrivacyPage :show="state.privacyShow" @close="state.privacyShow = false" />
    <UseTerms :show="state.useTermsShow" @close="state.useTermsShow = false" />
</template>
