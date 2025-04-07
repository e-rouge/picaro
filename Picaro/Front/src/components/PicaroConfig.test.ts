import {describe, expect, it, vi} from "vitest"
import PicaroConfig from "./PicaroConfig.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {currentAppSettings, settingsStoreFixtureNoCurrent} from "../../fixtures/store";
import {createRouter, createWebHistory} from "vue-router";
import {adminRoutes} from "../adminRoutes";


const router = createRouter({
    history: createWebHistory(),
    routes: adminRoutes
})

const wrapper = mount(PicaroConfig, {
    global: {
        // @ts-ignore
        plugins: [createTestingPinia({
            initialState: {settings: settingsStoreFixtureNoCurrent}
        }),
            // @ts-ignore
            router
        ],
    },
// eslint-disable-next-line
}) as VueWrapper<any>


describe("PicaroConfig", () => {
    it('displays the apps buttons when nothing is selected', () => {

        const buttons = wrapper.findAll('[data-testid="app-button"]')
        const selectedAppTitle = wrapper.find('[data-testid="app-title-selected"]')
        const newAppInput = wrapper.find('[data-testid="new-app-input"]')

        expect(buttons.length).toBe(2)
        expect(selectedAppTitle.exists()).toBe(false)
        expect(newAppInput.exists()).toBe(false)

    })

    it('displays the new app input when new app is selected', async () => {

        await router.push({name: 'newApp'})

        await router.isReady()


        expect(wrapper.vm.route.name).toBe('newApp')

        await vi.waitUntil(() => wrapper.vm.appFormState === 'newApp')

        const buttons = wrapper.findAll('[data-testid="app-button"]')
        const selectedAppTitle = wrapper.find('[data-testid="app-title-selected"]')
        const newAppInput = wrapper.find('[data-testid="new-app-input"]')


        expect(buttons.length).toBe(0)
        expect(selectedAppTitle.exists()).toBe(false)
        expect(newAppInput.exists()).toBe(true)

    })

    it('displays the app form when an app is selected', async () => {
        wrapper.vm.settingsStore.currentAppSettings = currentAppSettings

        await wrapper.vm.$nextTick()

        const buttons = wrapper.findAll('[data-testid="app-button"]')
        const selectedAppTitle = wrapper.find('[data-testid="app-title-selected"]')
        const newAppInput = wrapper.find('[data-testid="new-app-input"]')

        expect(buttons.length).toBe(0)
        expect(selectedAppTitle.exists()).toBe(true)
        expect(newAppInput.exists()).toBe(false)
    })

})
