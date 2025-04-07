import {describe, expect, it, vi} from "vitest"
import Picaro from "./Picaro.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {settingsStoreFixture, settingsStoreFixtureNoCurrent} from "@fixtures/store";

vi.mock('vue-router', () => ({
    useRouter: vi.fn(),
    useRoute: () => ({
        params: {
            appId: ""
        }
    })
}));


describe("Picaro", () => {
    it('does not display menu if there is no app', () => {
        const wrapper = mount(Picaro, {
            global: {
                // @ts-ignore
                plugins: [createTestingPinia({
                    initialState: {settings: settingsStoreFixtureNoCurrent}
                })],
            },
// eslint-disable-next-line
        }) as VueWrapper<any>

        const tab = wrapper.find('[data-testid="model-tab"]')
        expect(tab.exists()).toBe(false)

    })

    it('does display menu if there is no app', () => {
        const wrapper = mount(Picaro, {
            global: {
                // @ts-ignore
                plugins: [createTestingPinia({
                    initialState: {settings: settingsStoreFixture}
                })],
            },
// eslint-disable-next-line
        }) as VueWrapper<any>

        const tab = wrapper.find('[data-testid="model-tab"]')
        expect(tab.exists()).toBe(true)

    })

})
