import {VueWrapper} from "@vue/test-utils";
import {ComponentPublicInstance} from "vue";

export function checkVisible(elements: string[], wrapper: VueWrapper<any>): boolean[] {

    return elements.map((item) => {
        let query = ""
        if (item.match(/^[.#]/)) {
            query = item
        } else {
            query = `[data-testid="${item}"]`
        }
        const element = wrapper.find(query)
        return element.exists() && element.isVisible()
    })
}

export function stub(
    tag: string,
    opts ?: {
        [key: string]: any
    },
    template ?: string,
): ComponentPublicInstance<any> {
    const contents = template || `Stubbed ${tag}`;
    return {
        name: tag,
        template: `<div class="${tag}-stub">${contents}</div>`,
        ...(opts || {}),
    };
}

type VuetifyStubs = Record<string, ComponentPublicInstance<any>>

export function getVuetifyStubs() {
    const vuetifyComponentList = ['v-btn', 'v-checkbox', "v-icon", "VBtn", "VDatePicker", "VTextField", "v-select"]

    return vuetifyComponentList.reduce((acc: VuetifyStubs, curr) => {
        acc[curr] = stub(
            curr, {
                props: ['modelValue'],
            },
            '<slot />',
        )

        return acc
    }, {})

}
