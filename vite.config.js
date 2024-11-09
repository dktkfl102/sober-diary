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
        server: {
            proxy: {
                "/main": {
                    target: env.VITE_API,
                    changeOrigin: true,
                    // rewrite: (path) => path.replace(/^\/main/, ''),
                    secure: false,
                    ws: true,
                },
            },
        },
        resolve: {
            alias: { "@": path.resolve(__dirname, "./src") },
        },
    };
});
