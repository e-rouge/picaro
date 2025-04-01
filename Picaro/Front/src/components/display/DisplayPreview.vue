<script lang="ts" setup>
import {type FilterParams, Module, Settings} from "@types";
import DisplayList from "@components/display/DisplayList.vue";
import {useUserStore} from "@stores/user";
import {computed} from "vue";

const userStore = useUserStore()

const props = defineProps<{
  moduleParams: Module
  displayAll?: boolean
  currentApp: Settings
  dataReloaded: boolean
  fieldSelection: string[]
}>()

const isFull = computed(() => {
  return Boolean(userStore.filterCollection.modelFilters.find(item => item.type === 'full'))
})


const fieldSelection = computed(() => {
  if (isFull.value) {
    return
  } else {
    return props.fieldSelection ?? ['thumb', 'title', 'summary']
  }
})

function selectItem(id: string) {
  if (!isFull.value) {
    userStore.updateFilterCollection(
        {value: [id], target: 'id', method: "eq"} as FilterParams,
        "full",
        props.moduleParams?.model ? [props.moduleParams?.model] : undefined,
    );
  }

}


</script>
<template>
  <DisplayList
    :class="{'full': isFull}"
    :current-app="currentApp"
    :data-reloaded="dataReloaded"
    :field-selection="fieldSelection"
    :module-params="moduleParams"
    class="pic-list-preview"
    @clickItemContent="selectItem"
  />
</template>

<style lang="postcss" scoped>
:not(.full) {
  :deep(.pic-display-list-item) {
    cursor: pointer;
  }
}

</style>
