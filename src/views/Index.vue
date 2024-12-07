<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";

import userSql from "@/services/sql/user.sql";
import LocalStorageService from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";

const router = useRouter();
const user = useUserStore();

onMounted(async () => {
    try {
        let uuid = LocalStorageService.getItem(LocalStorageKey.UUID);
        if (!uuid) {
            // 회원 가입 (자동)
            uuid = "32KJD+SsSWIMWDDW823";
            const nickname = "술꾼" + "32847982";
            await userSql.insterUser({ uuid, nickname });
            LocalStorageService.setItem(LocalStorageKey.UUID, uuid);
            // default category 질문
        } else {
            // 회원 정보 가져오기
            user.info = await userSql.getUser(uuid);
        }
        router.push({ name: "Home" });
    } catch (e) {
        console.log(e);
    }
});

const count = ref(0);
</script>

<template>
    <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
        </p>
    </div>

    <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
            >create-vue</a
        >, the official Vue + Vite starter
    </p>
    <p>
        Learn more about IDE Support for Vue in the
        <a
            href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
            target="_blank"
            >Vue Docs Scaling up Guide</a
        >.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
