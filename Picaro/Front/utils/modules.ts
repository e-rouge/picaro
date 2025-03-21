import FilterCategories from "@components/filters/FilterCategories.vue";
import DisplayList from "@components/display/DisplayList.vue";
import FilterLayoutSelect from "@components/filters/FilterLayoutSelect.vue";
import {AvailableModules} from "@types";
import DisplayPreview from "@components/display/DisplayPreview.vue";
import FilterSingle from "@components/filters/FilterSingle.vue";

export const availableModules: Record<AvailableModules, any> = {
    FilterLayout: "FilterLayout",
    FilterLink: "FilterLink",
    List: DisplayList,
    FilterCategories: FilterCategories,
    FilterLayoutSelect: FilterLayoutSelect,
    Layout: 'Layout',
    Preview: DisplayPreview,
    FilterSingle: FilterSingle
} as const

