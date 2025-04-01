<script lang="ts" setup>
import {Module, Settings} from "@types";
import {computed, ref, watch} from "vue";
import {availableModules} from "@utils/modules";
import {useUtilsStore} from "@stores/utils";
import {useUserStore} from "@stores/user";

const props = defineProps<{
  currentApp: Settings
}>()


const utilsStore = useUtilsStore()
const userStore = useUserStore()


const selectedLayoutId = ref(props.currentApp.defaultLayout)
const selectedLayout = computed<Module[][]>(() => {
  return props.currentApp.layoutCollection.find(item => item.id === selectedLayoutId.value)?.layout || []
})

watch(() => userStore.filterCollection.all, () => {
  const layout = userStore.filterCollection.all.find(item => item.type === 'layout')
  if (layout) {
    selectedLayoutId.value = layout.value[0]
  }
}, {immediate: true})

const mobileMenuModules = computed(() => {
  if (utilsStore.isMobile && props.currentApp) {
    const commonLayout = props.currentApp.layoutCommonCollection.flat()
    const layout = selectedLayout.value.flat()
    const mobileModules = [...commonLayout, ...layout].filter((item) => item.inMobileMenu)
    return mobileModules
  }
  return []
})

</script>
<template>
  <template v-for="module in mobileMenuModules">
    <component
      :is="availableModules[module.type]"
      :current-app="currentApp"
      :module-params="module"
    />
  </template>
</template>

<style lang="postcss" scoped>
</style>
