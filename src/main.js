import { createApp, computed } from "vue";
import "@/assets/scss/index.scss";
import App from "./App.vue";
import router from "@/router";

import { createPinia } from "pinia";
import BottomSheetContents from "@/utils/bottomSheet/bottomSheet.contents";
// Vuetify
import "vuetify/styles";
import vuetify from "@/plugins/vuetify";
import { createClient } from "@supabase/supabase-js";

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$common = computed(() => {
    const commonStore = pinia.state.value.common;
    return commonStore;
});

app.provide("$bottomSheetContents", BottomSheetContents);
app.use(router).use(pinia).use(vuetify).mount("#app");
