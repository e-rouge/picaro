import {describe, expect, it} from "vitest";
import {modelCollection} from "@fixtures/data";
import {applyFilter} from "@components/utils/filter";
import {FilterCollection, Layout} from "@types";

const moduleParams: Layout = {
    model: 'model1',
    type: 'List',
    categories: [],
    cols: "2"
}

describe("filters", () => {
    it('filters all content', () => {
        const filterCollection: FilterCollection = {
            all: [
                {
                    method: "eq",
                    target: "fieldId",
                    value: ["test"],
                    type: ""
                }
            ],
            modelFilters: []
        }
        expect(modelCollection.filter(item => {
            return applyFilter(item, filterCollection, moduleParams)
        }).length).toEqual(2)

        filterCollection.all.push({
            method: "eq",
            target: "fieldId2",
            value: ["test id 2"],
            type: ""
        })

        expect(modelCollection.filter(item => {
            return applyFilter(item, filterCollection, moduleParams)
        }).length).toEqual(1)
    })
    it('should not filter content of models that is not targeted', () => {
        const filterCollection: FilterCollection = {
            all: [],
            modelFilters: [
                {
                    method: "eq",
                    target: "",
                    value: ["cat2"],
                    type: "categories",
                    modelIdCollection: ["model2"]
                }
            ]
        }

        expect(modelCollection.filter(item => {
            return applyFilter(item, filterCollection, moduleParams)
        }).length).toEqual(4)
    })
    it('should combine global and model filters', () => {
        const filterCollection: FilterCollection = {

            all: [
                {
                    method: "eq",
                    target: "fieldId",
                    value: ["test"],
                    type: ""
                }

            ],
            modelFilters: [
                {
                    method: "in",
                    target: "",
                    value: ["cat2"],
                    type: "categories",
                    modelIdCollection: ["model1"]
                }
            ]
        }

        expect(modelCollection.filter(item => {
            return applyFilter(item, filterCollection, moduleParams)
        }).length).toEqual(1)
    })
})
