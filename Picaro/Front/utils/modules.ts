import FilterCategories from "@components/filters/FilterCategories.vue";
import DisplayList from "@components/display/DisplayList.vue";
import FilterLayoutSelect from "@components/filters/FilterLayoutSelect.vue";
import {AvailableModules} from "@types";
import DisplayPreview from "@components/display/DisplayPreview.vue";
import FilterSingle from "@components/filters/FilterSingle.vue";
import SingleImageDisplay from "@components/display/SingleImageDisplay.vue";
import VideoDisplay from "@components/display/VideoDisplay.vue";

export const availableModules: Record<AvailableModules, any> = {
    FilterLayout: "FilterLayout",
    FilterLink: "FilterLink",
    List: DisplayList,
    FilterCategories: FilterCategories,
    FilterLayoutSelect: FilterLayoutSelect,
    Layout: 'Layout',
    Preview: DisplayPreview,
    FilterSingle: FilterSingle,
    SingleImage: SingleImageDisplay,
    Video: VideoDisplay
} as const

