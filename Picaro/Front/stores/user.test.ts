import {beforeEach, describe, expect, it, vi} from "vitest"
import {createPinia, setActivePinia} from "pinia";
import {useUserStore} from "./user";
import {createApp} from "vue";

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push: vi.fn(() => {
        })
    }),

}));

const params = {
    all: [
        {method: 'eq', field: 'Field1', value: ['value', "value1"], type: 'filter'},
        {method: 'gt', field: 'Field2', value: ['value2'], type: 'filter'},
        {method: 'lt', field: 'Field3', value: ['value3'], type: 'categories'}
    ],
    modelFilters: [
        {modelIdCollection: ["model"], method: 'eq', field: 'Field1', value: 'value', type: 'filter'},
        {
            modelIdCollection: ["model"],
            method: 'gt',
            field: 'Field2',
            value: ['value2'],
            type: 'filter'
        },
        {
            modelIdCollection: ["model2", "model3"],
            method: 'lt',
            field: 'Field3',
            value: ['value3', 'value4'],
            type: 'categories'
        }
    ]
}

const routeParams = {
    params: {
        globalFilters: "filter~categories",
        globalParams: "eqField1..value**value1++gtField2..value2~ltField3..value3",
        modelFilters: "model::filter~model2++model3::categories",
        modelFilterParams: "eqField1..value++gtField2..value2~ltField3..value3**value4",
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

        expect(await userStore.updateRoute(params)).toEqual(routeParams)
    })
})
