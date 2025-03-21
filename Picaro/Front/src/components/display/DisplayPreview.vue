<script lang="ts" setup>
import {Layout, Settings} from "@types";
import DisplayList from "@components/display/DisplayList.vue";
import {useUserStore} from "@stores/user";
import {computed} from "vue";

const userStore = useUserStore()

const props = defineProps<{
  moduleParams: Layout
  displayAll?: boolean
  currentApp: Settings
  dataReloaded: boolean
  fieldSelection: string[]
}>()

const isFull = computed(() => {
  return Boolean(userStore.filterCollection.modelFilters.find(item => item.type === 'full'))
})


const emit = defineEmits<{
  clickField: [{ name: string, id: string }]
}>()


const fieldSelection = computed(() => {
  if (isFull.value) {
    return
  } else {
    return props.fieldSelection ?? ['thumb', 'title', 'summary']
  }
})

</script>
<template>
  <DisplayList
    :current-app="currentApp"
    :data-reloaded="dataReloaded"
    :field-selection="fieldSelection"
    :module-params="moduleParams"
    class="pic-list-preview"
    @clickField="emit('clickField', $event)"
  />
</template>
