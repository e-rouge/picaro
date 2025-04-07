import {beforeEach, describe, expect, it, vi} from "vitest"
import DataConfig from "./DataConfig.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {settingsStoreFixture} from "@fixtures/store";
import {createRouter, createWebHistory} from "vue-router";
import {adminRoutes} from "../../adminRoutes";
import {checkVisible} from "../../../test/utils";

const router = createRouter({
    history: createWebHistory(),
    routes: adminRoutes
})

// typecheck-disable
const wrapper = mount(DataConfig, {
    global: {
        plugins: [
            // @ts-ignore
            createTestingPinia({
                initialState: {settings: settingsStoreFixture}
            }),
            // @ts-ignore
            router
        ],
    },
// eslint-disable-next-line
}) as VueWrapper<any>


describe("DataConfig", () => {
    beforeEach(async () => {
        wrapper.vm.modelFormState = 'noModel'
        await router.push({name: 'data', params: {appId: 'app'}})
        await router.isReady()
    })
    it('does not display anything at first', () => {
        const main = wrapper.find('.pic-main-empty')

        expect(wrapper.vm.modelFormState).toBe('noModel')

        expect(main.exists()).toBe(true)
        expect(main.text()).toBe('')
    })
    it('should create a new model', async () => {

        await wrapper.vm.newModelForm()
        await router.isReady()
        await wrapper.vm.$nextTick()

        expect(checkVisible([
            '.pic-main-empty',
            'create-model-name-input'
        ], wrapper)).toEqual(
            [
                false,
                true
            ]
        )


        wrapper.vm.modelNameInput = 'test model'

        wrapper.vm.createNewModel()
        await wrapper.vm.$nextTick()

        const editedElement = wrapper.find('[data-testid="model-is-edited"]')

        await vi.waitUntil(() => editedElement.exists())

    })
    it('should display the model data', async () => {
        await router.push({name: 'model', params: {modelId: 'modelId1'}})

        await router.isReady()
        await vi.waitUntil(() => wrapper.vm.modelFormState === 'modelSelected')

        expect(checkVisible([
            'model-is-edited',
            'create-model-name-input',
            '.pic-main-empty',

        ], wrapper)).toEqual(
            [
                true,
                false,
                false
            ]
        )


        expect(wrapper.vm.currentEditModel)
            .toEqual(
                settingsStoreFixture.currentAppSettings?.modelCollection.find(model => model.id = 'modelId1')
            )
    })
})
