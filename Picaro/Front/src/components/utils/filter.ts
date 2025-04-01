import {FieldContentParams, Filter, FilterCollection, ModelContent, Module} from "@types";

const filterToIgnore = ['layout']
const applyFilterMethod = function (filter: Filter, searchedItem: FieldContentParams | string[] | string) {
    const itemContent = Array.isArray(searchedItem) || typeof searchedItem === 'string' ? searchedItem : searchedItem.fieldContent
    if (filter.method === "eq") {
        return itemContent === filter.value[0];
    }
    if (filter.method === "in" && Array.isArray(itemContent)) {
        return itemContent?.includes(filter.value[0]);
    }

};

function checkFilterCollection(item: ModelContent, filter: Filter) {
    if (filter.target === 'all') {
        return true
    }

    if (!filter || Object.entries(filter).length === 0 || filterToIgnore.includes(filter.type)) return null;


    let itemToCheck;
    if (filter.type === 'categories') {
        itemToCheck = item.categories
    } else if (filter.type === 'full') {
        itemToCheck = item.id
    } else {
        itemToCheck = item.content.find(subItem => subItem.fieldParamsId === filter.target)
    }

    return itemToCheck ? applyFilterMethod(
        filter,
        itemToCheck,
    ) : false;
}

export function applyFilter(item: ModelContent, filterCollection: FilterCollection, moduleParams: Module) {

    const modelFilters = filterCollection.modelFilters.filter(item => item.modelIdCollection?.includes(moduleParams.model ?? ''))


    let displayItemAll = 0;
    let displayItemModel = 0;


    if (!filterCollection || Object.keys(filterCollection).length === 0) {
        return true
    }


    filterCollection.all.forEach(filter => {
        const filterStatus = checkFilterCollection(item, filter);
        if (filterStatus === true) {
            displayItemAll += 1;
        } else if (filterStatus === null) {
            displayItemAll += 1;
        }
    });

    modelFilters.forEach(filter => {
        const filterStatus = checkFilterCollection(item, filter);
        if (filterStatus === true) {
            displayItemModel += 1;
        } else if (filterStatus === null) {
            displayItemModel += 1;
        }
    })
    // return item if all filter are true
    return displayItemAll === filterCollection.all.length && displayItemModel === modelFilters.length;
};
