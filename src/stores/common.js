import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommonStore = defineStore("common", () => {
    const categories = ref([]);
    const challenges = ref([]);
    return { categories, challenges };
});
