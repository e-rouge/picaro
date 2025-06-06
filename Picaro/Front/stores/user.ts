import {defineStore} from "pinia";
import {Filter, FilterCollection, FilterParams, ModelFilter} from "@types";
import groupBy from "object.groupby"
import {toRaw} from "vue";

interface UserStore {
    filterCollection: FilterCollection
    rteImage: string,
    imageDrawerToggle: boolean
}

export const useUserStore = defineStore('user', {
    state: (): UserStore => ({
        filterCollection: {
            all: [],
            modelFilters: []
        },
        rteImage: '',
        imageDrawerToggle: false
    }),
    actions: {
        updateFilterCollection(
            filterParams: FilterParams,
            type: string = '',
            models?: string[]
        ) {

            const temporaryFilterCollection = structuredClone(toRaw(this.filterCollection));

            const params = {
                method: filterParams.method,
                target: filterParams.target,
                value: filterParams.value,
                type
            }

            if (models) { // model filters
                const paramsWithModel: ModelFilter = {...params, modelIdCollection: models}
                // create a fake all filter if empty
                if (temporaryFilterCollection.all.length === 0) {
                    temporaryFilterCollection.all = [{
                        method: "in",
                        value: [""],
                        target: "all",
                        type: "all",
                    }]
                }
                temporaryFilterCollection.modelFilters = temporaryFilterCollection.modelFilters.filter(item => item.type !== type);
                temporaryFilterCollection.modelFilters.push(paramsWithModel)
            } else if (filterParams.value.length > 0) { // all filters
                // reset model filters
                temporaryFilterCollection.modelFilters = []
                //remove current all filter
                temporaryFilterCollection.all = temporaryFilterCollection.all.filter(item => {
                    return item.type !== type &&
                        item.type !== 'all'
                });
                //add current filter
                temporaryFilterCollection.all.push(params)
            } else {
                const index = temporaryFilterCollection.all.findIndex(item => item.target = filterParams.target)
                temporaryFilterCollection.all.splice(index, 1)
            }

            this.filterCollection = temporaryFilterCollection

            this.updateRoute(temporaryFilterCollection)

            return;

        },
        updateRoute(filterCollection: FilterCollection) {
            const {filtersType: globalFilters, params: globalParams} = this.getStringFromParams(filterCollection.all)
            const {
                filtersType: modelFilters,
                params: modelFilterParams
            } = this.getStringFromParams(filterCollection.modelFilters, true)

            const params = {
                params: {
                    globalFilters: encodeURI(globalFilters),
                    globalParams: encodeURI(globalParams),
                    modelFilters: encodeURI(modelFilters),
                    modelFilterParams: encodeURI(modelFilterParams)
                }
            }
            this.router.push(params).catch((e) => console.error(e));
            return params
        },
        getStringFromParams(filters: Filter[] | ModelFilter[], hasModel = false) {
            const groupedFilters = groupBy(filters, ({type}) => type)

            const values = Object.values(groupedFilters)

            const filtersType = Object.keys(groupedFilters).map((item, index) => {
                let models = ""
                if (hasModel) {
                    const set = new Set()

                    const modelsDedup = (values as ModelFilter[][])[index]
                        .reduce((acc, current) => {

                            current.modelIdCollection?.forEach(id => {
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
                    if (typeof item.value === 'string') {
                        item.value = [item.value]
                    }
                    return `${item.method}${item.target}..${item.value.join('**')}`
                }).join('++')
            }).join('~')

            return {filtersType, params}
        }
    }


})
