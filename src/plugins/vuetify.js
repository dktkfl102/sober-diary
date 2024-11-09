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
            style: [{ fontSize: "14px" }],
        },
        VTextarea: {
            VField: {
                style: [{ fontSize: "0.8rem" }],
            },
        },
        VSelect: {
            VField: {
                style: [{ fontSize: "14px" }],
            },
        },
        VInput: {
            VField: {
                style: [{ fontSize: "14px" }],
            },
        },
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
