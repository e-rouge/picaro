import {describe, expect, it, vi} from "vitest"
import CommonLayoutEdit from "./CommonLayoutEdit.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {settingsStoreFixture} from "../../../fixtures/store";
import {checkVisible} from "../../../test/utils";

settingsStoreFixture.currentAppSettings.layoutCommonCollection = []

const wrapper = mount(CommonLayoutEdit, {
    global: {
        plugins: [
            // @ts-ignore
            createTestingPinia({
                initialState: {settings: settingsStoreFixture}
            })
        ],
    },
// eslint-disable-next-line
}) as VueWrapper<any>


describe("LayoutGridEdit", () => {
    it("should create rows", async () => {
        expect(checkVisible([
            'add-common-row',
            'add-common-row-inner',
            'add-common-column'
        ], wrapper)).toEqual([
            true,
            false,
            false
        ])
        expect(wrapper.vm.layoutCommonCollection).toEqual([])
        wrapper.find('[data-testid="add-common-row"]').trigger('click').catch((e) => console.log(e))
        wrapper.find('[data-testid="add-common-row"]').trigger('click').catch((e) => console.log(e))

        expect(wrapper.vm.layoutCommonCollection).toEqual([
            [
                {
                    type: "List"
                }
            ],
            [
                {
                    type: "List"
                }
            ]
        ])

    })
    it("should create columns", async () => {
        await vi.waitUntil(() => wrapper.vm.layoutCommonCollection.length === 2)

        expect(checkVisible([
            'add-common-row',
            'add-common-row-inner',
            'add-common-column'
        ], wrapper)).toEqual([
            false,
            true,
            true
        ])
        wrapper.find('[data-testid="add-common-column"]').trigger('click').catch((e) => console.log(e))
        expect(wrapper.vm.layoutCommonCollection).toEqual([
            [
                {
                    type: "List"
                },
                {
                    type: "List",
                },

            ],
            [
                {
                    type: "List"
                }
            ]
        ])
    })

})
