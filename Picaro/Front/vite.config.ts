import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vuetify from 'vite-plugin-vuetify'
import {imagetools} from "vite-imagetools";
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vuetify(),
        imagetools(),
        vueDevTools()
    ],
    publicDir: path.resolve(__dirname, '../../static'),
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './utils'),
            '@stores': path.resolve(__dirname, './stores'),
            '@components': path.resolve(__dirname, './src/components'),
            '@types': path.resolve(__dirname, './types'),
            '@libs': path.resolve(__dirname, './../Libs'),
            '@uploads': path.resolve(__dirname, './../Back/uploads'),
            '/api/uploads': path.resolve(__dirname, './../Back/uploads'),
            '@data': path.resolve(__dirname, './../Data'),
            '@fixtures': path.resolve(__dirname, './fixtures'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
})
