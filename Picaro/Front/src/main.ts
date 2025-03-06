import {createApp, markRaw} from 'vue'
import App from './components/App.vue'
import {createRouter, createWebHashHistory, Router} from "vue-router";
import {createPinia} from 'pinia'
import {createVuetify} from 'vuetify'
import {defaultRoutes} from "./routes";
import {adminRoutes} from "./adminRoutes";
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...defaultRoutes, ...adminRoutes]
})

router.beforeEach((to, from) => {
    const fromId = from.params.appId
    const toId = to.params.appId

    const routeException = ['newApp', 'adminIndex']

    if (fromId && !toId && to.name && !routeException.includes(to.name as string)) {
        const toParams = {...to.params}
        toParams.appId = fromId
        return {name: to.name, params: toParams}
    }
})

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#ffdd00',
        surface: '#FFFFFF',
        primary: '#d26147',
        'primary--text': '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#699eae',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}


declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router
    }
}


const pinia = createPinia()
const app = createApp(App)
pinia.use(({store}) => {
    store.router = markRaw(router)
})
app.use(pinia)
app.use(router)

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
})
app.use(vuetify)


app.mount('#app')
