import { createApp } from "vue";
import "@/assets/scss/index.scss";
import App from "./App.vue";
import router from "@/router";

import { createPinia } from "pinia";
// Vuetify
import "vuetify/styles";
import vuetify from "@/plugins/vuetify";
import { createClient } from "@supabase/supabase-js";

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(vuetify).mount("#app");
