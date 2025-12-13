import {defineConfig} from 'vitest/config'
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from 'vite-tsconfig-paths'
import {resolve} from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "happy-dom",
        server: {
            deps: {
                inline: ['vuetify'],
            },
        },
    },
    resolve: {
        alias: [
            {find: "@components", replacement: resolve(__dirname, "./src/components")},
            {find: "@stores", replacement: resolve(__dirname, "./stores")},
            {find: "@utils", replacement: resolve(__dirname, "./utils")},
            {find: "/images", replacement: resolve(__dirname, "../../static/images")},
            {find: '@uploads', replacement: resolve(__dirname, './../Back/uploads')},
            {find: '@api', replacement: resolve(__dirname, './utils/api')},
        ]
    },
    plugins: [vue(), tsconfigPaths()]

})
