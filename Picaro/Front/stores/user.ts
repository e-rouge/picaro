import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {Filter, FilterCollection, ModelFilter} from "@types";
import groupBy from "object.groupby"
import {useSettingsStore} from "@stores/settings";

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const filterCollection: FilterCollection = {
        all: [],
        modelFilters: []
    }

    const settingsStore = useSettingsStore()

    function updateFilterCollection({filterParams, models, type}: {
        filterParams: { value: [string] | undefined, field: string, method: string },
        models: string[] | undefined,
        type: string
    }) {
        const temporaryFilterCollection = structuredClone(filterCollection);

        temporaryFilterCollection.all = temporaryFilterCollection.all.filter(item => item.type === type);

        const params = {
            method: filterParams.method,
            field: filterParams.field,
            value: filterParams.value,
            type
        }

        if (models) {
            const paramsWithModel: ModelFilter = {...params, modelIdCollection: models}
            temporaryFilterCollection.modelFilters.push(paramsWithModel)
        }

        if (filterParams.value) {
            temporaryFilterCollection.all.push(params)
        }

        settingsStore.currentAppSettings.filterCollection = temporaryFilterCollection

        updateRoute(temporaryFilterCollection);
        return;

    }

    function getStringFromParams(filters: Filter[] | ModelFilter[], hasModel = false) {
        const groupedFilters = groupBy(filters, ({type}) => type)

        const values = Object.values(groupedFilters)

        const filtersType = Object.keys(groupedFilters).map((item, index) => {
            let models = ""
            if (hasModel) {
                const set = new Set()

                const modelsDedup = (values as ModelFilter[][])[index]
                    .reduce((acc, current) => {

                        current.modelIdCollection.forEach(id => {
                            set.add(id)
                        });

                        return set
                    }, set)

                models = `${Array.from(modelsDedup).join('++')}::`

            }
            return `${models}${item}`
        }).join('~')
        const params = values.map(params => {
            if (!params) return;


            return params.map(item => {
                return `${item.method}${item.field}..${item.value}`
            }).join('++')
        }).join('~')

        return {filtersType, params}
    }

    function updateRoute(filterCollection: FilterCollection) {

        const {filtersType: globalFilters, params: globalParams} = getStringFromParams(filterCollection.all)

        const {
            filtersType: modelFilters,
            params: modelFilterParams
        } = getStringFromParams(filterCollection.modelFilters, true)

        const params = {
            params: {
                globalFilters: encodeURI(globalFilters),
                globalParams: encodeURI(globalParams),
                modelFilters: encodeURI(modelFilters),
                modelFilterParams: encodeURI(modelFilterParams)
            }
        }
        router.push(params);
        return params
    }

    return {filterCollection, updateFilterCollection, updateRoute}
})
