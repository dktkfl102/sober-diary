import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [vue(), vuetify()],
        optimizeDeps: {
            exclude: ["vuetify"],
        },
        build: {
            rollupOptions: {
                output: {
                    entryFileNames: `[name]` + "_20250110" + `.js`,
                    chunkFileNames: `[name]` + "_20250110" + `.js`,
                },
            },
        },
        server: {
            proxy: {
                "/main": {
                    target: env.VITE_API,
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler", // or "modern"
                },
            },
        },
        resolve: {
            alias: { "@": path.resolve(__dirname, "./src") },
        },
    };
});
