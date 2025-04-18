import {describe, expect, it} from "vitest"
import ModelField from "./ModelField.vue";
import {mount, VueWrapper} from "@vue/test-utils";
import {createTestingPinia} from "@pinia/testing";
import {createRouter, createWebHistory} from "vue-router";
import {adminRoutes} from "../../../adminRoutes";
import {checkVisible} from "../../../../test/utils";
import {FieldParams, Model, ModelState} from "@types";

const router = createRouter({
    history: createWebHistory(),
    routes: adminRoutes
})

const fieldData: FieldParams = {
    id: "1234",
    label: "test",
    name: "test",
    regex: "",
    required: false,
    hidden: false,
    template: "",
    attributes: "",
    extraParams: {},
    type: "text"
}
const defaultProps: {
    modelFormState?: ModelState
    existingFieldData?: FieldParams
    currentEditField?: string
    isNew?: boolean
    model: Model
} = {
    existingFieldData: fieldData,
    model: {id: 'id', name: 'model', fieldCollection: []},
    modelFormState: 'noModel'
}

// eslint-disable-next-line
function mountWrapper(props = defaultProps): VueWrapper<any> {
    return mount(ModelField, {
        global: {
            plugins: [
                // @ts-ignore
                createTestingPinia({}),
                // @ts-ignore
                router
            ],
        },
        props: props
    })
}


describe("ModelField", () => {
    const wrapper = mountWrapper()
    it('display the edit button by default', () => {
        expect(checkVisible([
            'edit-model-field-button',
            // not visible
            'add-title',
            'edit-field-selected'
        ], wrapper)).toEqual(
            [
                true,
                false,
                false
            ])
    })
    it('displays edit form', async () => {
        const wrapper = mountWrapper({
            ...defaultProps,
            currentEditField: '1234',
            modelFormState: 'editingField'
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.isEdited).toBe(true)
        expect(wrapper.vm.isFieldSelected).toBe(true)
        expect(checkVisible([
            'add-title',
            'edit-field-selected',
            // not visible
            'edit-model-field-button',
        ], wrapper)).toEqual(
            [
                true,
                true,
                false
            ])
    })
    it('displays new form', async () => {
        const wrapper = mountWrapper({
            ...defaultProps,
            existingFieldData: {
                ...defaultProps.existingFieldData as FieldParams,
                type: null
            },
            currentEditField: '1234',
            modelFormState: 'editingField'
        })
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.isEdited).toBe(true)

        expect(wrapper.vm.isFieldSelected).toBe(false)
        expect(checkVisible([
            'add-title',
            // not visible
            'edit-field-selected',
            'edit-model-field-button',
        ], wrapper)).toEqual(
            [
                true,
                false,
                false
            ])
    })
    it('resets the form at cancel', () => {
        const wrapper = mountWrapper()
        wrapper.vm.fieldData.name = "new name"
        wrapper.vm.fieldData.type = "new type"
        expect(wrapper.vm.fieldData).not.toEqual(wrapper.vm.props.existingFieldData)
        wrapper.vm.cancelEdit()
        expect(wrapper.vm.fieldData).toEqual(wrapper.vm.props.existingFieldData)
    })
})
