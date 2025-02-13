<script setup>
import { reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useCommonStore } from "@/stores/common";

import UserUtils from "@/utils/user-utils";
import LocalStorageService from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";

import BottomNavigation from "@/components/layout/BottomNavigation.vue";
import Suggestions from "@/components/setting/Suggestions.vue";
import PrivacyPage from "@/components/common/terms/PrivacyPage.vue";
import UseTerms from "@/components/common/terms/UseTerms.vue";
import BottomSheet from "@/utils/bottomSheet/BottomSheet.vue";

const user = useUserStore();
const common = useCommonStore();
const router = useRouter();
const bottomSheetContents = inject("$bottomSheetContents");

const state = reactive({
    isNotification: true,
    privacyShow: false,
    useTermsShow: false,
    suggestionsShow: false,
    resetPopupShow: false,
    customerCenter: [
        { key: "faq", name: "FAQ", icon: "frequently-asked-questions" },
        { key: "suggestions", name: "의견 보내기", icon: "message-draw" },
        { key: "rating", name: "별점 남기기", icon: "star" },
        { key: "", name: "개발자에게 맥주사기", icon: "glass-mug-variant" },
    ],
    showDialog: false,
    popData: {},
});

const onChangeSmofingStatus = () => {
    user.info.smokingStatus = !user.info.smokingStatus;
    LocalStorageService.setItem(
        LocalStorageKey.SMOKING_STATUS,
        user.info.smokingStatus
    );
};

const handleResetAppData = (val) => {
    if (val) {
        LocalStorageService.clearStorage();
        router.push({ name: "Index" });
    }
    state.resetPopupShow = false;
};
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
            <!-- <li class="flex items-center justify-between bg-gray-800 p-4">
                <span class="text-lg font-medium">알림</span>
                <span class="text-sm text-gray-400">On</span>
            </li> -->
            <li
                class="flex items-center justify-between bg-gray-800 p-4"
                @click="onChangeSmofingStatus"
            >
                <span class="text-lg font-medium">흡연체크</span>
                <span
                    class="text-sm transition duration-500 ease-in-out"
                    :class="
                        user.info.smokingStatus
                            ? 'font-semibold text-blue-500'
                            : 'text-gray-400'
                    "
                    >{{ user.info.smokingStatus ? "On" : "Off" }}</span
                >
            </li>
            <li class="flex items-center justify-between bg-gray-800 p-4">
                <span class="text-lg font-medium">앱 버전</span>
                <span class="text-sm text-gray-400">{{
                    common.version ? common.version : "1.1"
                }}</span>
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
        <div class="mt-1 text-center">
            <span
                class="text-xs text-gray-400 underline"
                @click="state.resetPopupShow = true"
                >데이터 초기화</span
            >
        </div>
    </div>
    <BottomNavigation></BottomNavigation>

    <Suggestions v-model:show="state.suggestionsShow" :user="user.info.id" />
    <BottomSheet
        v-model:show="state.resetPopupShow"
        :popData="bottomSheetContents.INITIALIZE_APP_DATA"
        @commit="handleResetAppData"
    />
    <PrivacyPage :show="state.privacyShow" @close="state.privacyShow = false" />
    <UseTerms :show="state.useTermsShow" @close="state.useTermsShow = false" />
</template>
