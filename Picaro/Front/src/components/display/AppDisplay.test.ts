import {describe, expect, it, vi} from "vitest"
import AppDisplay from "./AppDisplay.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {FilterCollection} from "@types";
import {settingsStoreFixture} from "../../../fixtures/store";

vi.mock('vue-router', () => ({
    useRoute: () => (
        {params: ""}
    ),
    useRouter: () => ({
        push: vi.fn(() => {
        })
    }),
}));


const wrapper = mount(AppDisplay, {
    global: {
        plugins: [createTestingPinia({
            initialState: {settings: settingsStoreFixture}
        })],
    },
// eslint-disable-next-line
}) as VueWrapper<any>

const expectedResult: FilterCollection = {
    all: [
        {method: 'eq', target: 'Field1', value: ['value', 'value1'], type: 'filter'},
        {method: 'in', target: 'Field2', value: ['value2'], type: 'filter'},
        {method: 'fd', target: 'Field3', value: ['value3'], type: 'categories'}
    ],
    modelFilters: [
        {modelIdCollection: ["model"], method: 'eq', target: 'Field1', value: ['value'], type: 'filter'},
        {
            modelIdCollection: ["model"],
            method: 'in',
            target: 'Field2',
            value: ['value2'],
            type: 'filter'
        },
        {
            modelIdCollection: ["model2", "model3"],
            method: 'fd',
            target: 'Field3',
            value: ['value3', 'value4'],
            type: 'categories'
        }
    ],
}
const params = {
    globalFilters: "filter~categories",
    globalParams: "eqField1..value**value1++inField2..value2~fdField3..value3",
    modelFilters: "model::filter~model2++model3::categories",
    modelFilterParams: "eqField1..value++inField2..value2~fdField3..value3**value4",
}

describe("AppDisplay", () => {
    it("should get the proper filters from the store", () => {
        expect(wrapper.vm.filterRouteToStore(params)).toEqual(expectedResult)
    })

    it("should display css file", () => {
        const style = document.querySelector('link')
        expect(style?.href).toBe("http://localhost:3000/api/css/baseStyle-styleId.css")
    })
})

