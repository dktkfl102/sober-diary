import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore("toast", () => {
    const show = ref(false);
    const msg = ref("");
    const color = ref("white");

    const showToast = (message, messageColor = "white") => {
        show.value = true;
        msg.value = message;
        color.value = messageColor;
    };

    return { show, msg, color, showToast };
});
