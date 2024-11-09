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

const supabase = createClient(
    import.meta.env.VITE_API,
    import.meta.env.VITE_API_KEY
);
const { data, error } = await supabase.from("User").select(`
      id
  `);
console.log(data);
app.use(router).use(pinia).use(vuetify).mount("#app");
