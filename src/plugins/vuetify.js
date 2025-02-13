import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

const vuetify = createVuetify({
    theme: {
        defaultTheme: "dark",
    },
    defaults: {
        VBtn: {
            style: [{ textTransform: "none" }],
        },
        VLabel: {
            class: "font-pretendard",
        },
        VSelect: { class: "font-pretendard" },
        VDialog: { class: "font-pretendard" },
        VCard: { class: "font-pretendard" },
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
});

export default vuetify;
