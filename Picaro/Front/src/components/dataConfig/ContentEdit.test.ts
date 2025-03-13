import {describe, expect, it, vi} from "vitest"
import ContentEdit from "./ContentEdit.vue";
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

const wrapper = mount(ContentEdit, {
    global: {
        plugins: [
            createTestingPinia({
                initialState: {settings: settingsStoreFixture}
            }),
            router
        ],
    },
    props: {
        currentEditModel: settingsStoreFixture.currentAppSettings.modelCollection[0],
    }
// eslint-disable-next-line
}) as VueWrapper<any>

describe('ContentEdit', () => {
    it('should display the new content form when there is at least a category', async () => {
        expect(checkVisible([
            //visible
            'category-warning',
            //not-visible
            'list-display',
            'list-edit'
        ], wrapper)).toEqual([true, false, false])

        wrapper.vm.addCategory()

        await wrapper.vm.$nextTick()

        expect(checkVisible([
            // visible
            'new-content',
            'new-content-form',
            // not-visible
            'list-display',
            'content-edit',
            'list-edit',
            'category-warning'], wrapper)).toEqual(
            [
                true,
                true,
                false,
                false,
                false,
                false
            ])
    })
    it('should display existing content', () => {


        const contentList = wrapper.findAll('[data-testid="content-list"]')

        expect(contentList.length).toBe(1)
    })
    it('should display the edited version of items', async () => {
        await vi.waitUntil(() => wrapper.find('[data-testid="content-display"]'))

        await router.push({name: 'content', params: {modelId: 'modelId1'}})

        await router.isReady()

        wrapper.vm.editItem(0)
        
        await vi.waitUntil(() => wrapper.vm.$route.path === "/admin/data/modelId1/content/0")
        await wrapper.vm.$nextTick()

        await vi.waitUntil(() => wrapper.find('[data-testid="content-edit"]'))
        expect(checkVisible(['content-display'], wrapper)).toEqual([false])
    })
})
