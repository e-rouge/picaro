import {describe, expect, it, vi} from "vitest"
import LayoutGridEdit from "./LayoutGridEdit.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {settingsStoreFixture} from "../../../fixtures/store";
import {checkVisible} from "../../../test/utils";

const wrapper = mount(LayoutGridEdit, {
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
    it("should create rows", () => {
        expect(checkVisible([
            'add-row',
            'add-row-inner',
            'add-column'
        ], wrapper)).toEqual([
            true,
            false,
            false
        ])
        expect(wrapper.vm.layoutCollection).toEqual([])
        wrapper.find('[data-testid="add-row"]').trigger('click').catch((e) => console.log(e))
        wrapper.find('[data-testid="add-row"]').trigger('click').catch((e) => console.log(e))

        expect(wrapper.vm.layoutCollection).toEqual([
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
        await vi.waitUntil(() => wrapper.vm.layoutCollection.length === 2)

        expect(checkVisible([
            'add-row',
            'add-row-inner',
            'add-column'
        ], wrapper)).toEqual([
            false,
            true,
            true
        ])
        wrapper.find('[data-testid="add-column"]').trigger('click').catch((e) => console.log(e))
        expect(wrapper.vm.layoutCollection).toEqual([
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
