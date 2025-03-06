import {createApp, markRaw} from 'vue'
import App from './components/App.vue'
import {createRouter, createWebHashHistory} from "vue-router";
import {createPinia} from 'pinia'
import {defaultRoutes as routes} from "../../Front/src/routes";

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


const pinia = createPinia()
pinia.use(({store}) => {
    store.router = markRaw(router)
})
const app = createApp(App)
app.use(pinia)
app.use(router)

app.mount('#app')
