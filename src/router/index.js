import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import("@/views/Index.vue"),
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/views/home/Index.vue"),
    },
    {
        path: "/challenge",
        name: "Challenge",
        component: () => import("@/views/challenge/Index.vue"),
        meta: { preload: true },
    },
    {
        path: "/statistics",
        name: "Statistics",
        component: () => import("@/views/statistics/Index.vue"),
    },
    {
        path: "/setting",
        name: "Setting",
        component: () => import("@/views/setting/Index.vue"),
        meta: { preload: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        document.getElementById("app").scrollIntoView({ behavior: "smooth" });
    },
});

const env = import.meta.env.MODE;
router.beforeEach((to, from, next) => {
    // if (env === "production") {
    //     if (!window.ReactNativeWebView)
    //         return (window.location.href = "https://blog.naver.com/hug1me");
    // }
    next();
});

export default router;
