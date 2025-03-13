import {beforeEach, describe, expect, it, vi} from "vitest"
import {createPinia, setActivePinia} from "pinia";
import {useUserStore} from "./user";
import {createApp} from "vue";
import {flushPromises} from "@vue/test-utils";

const params = {
    all: [
        {method: 'eq', target: 'target1', value: ['value', "value1"], type: 'filter'},
        {method: 'gt', target: 'target2', value: ['value2'], type: 'filter'},
        {method: 'lt', target: 'target3', value: ['value3'], type: 'categories'}
    ],
    modelFilters: [
        {
            modelIdCollection: ["model"],
            method: 'eq',
            target: 'target1',
            value: 'value',
            type: 'filter'
        },
        {
            modelIdCollection: ["model"],
            method: 'gt',
            target: 'target2',
            value: ['value2'],
            type: 'filter'
        },
        {
            modelIdCollection: ["model2", "model3"],
            method: 'lt',
            target: 'target3',
            value: ['value3', 'value4'],
            type: 'categories'
        }
    ]
}

const routeParams = {
    params: {
        globalFilters: "filter~categories",
        globalParams: "eqtarget1..value**value1++gttarget2..value2~lttarget3..value3",
        modelFilters: "model::filter~model2++model3::categories",
        modelFilterParams: "eqtarget1..value++gttarget2..value2~lttarget3..value3**value4",
    }
}

describe("User test", () => {
    beforeEach(() => {
        const pinia = createPinia();
        pinia.use(({store}) => {
            store.router = {
                push: vi.fn(async () => {
                })
            }
        });
        const app = createApp({});
        app.use(pinia);

        setActivePinia(pinia);
    })
    it("should render", async () => {
        const userStore = useUserStore()
        expect(userStore.updateRoute(params)).toEqual(routeParams)
    })
    it("should add a filter", async () => {
        const userStore = useUserStore()
        userStore.updateFilterCollection({value: ['newValue'], target: 'newTarget', method: 'in'})

        await flushPromises()

        expect(userStore.filterCollection).toEqual(params)
    })
})
