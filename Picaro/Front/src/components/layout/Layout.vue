<script lang="ts" setup>
import {Module, Settings} from "@types";
import {computed, ref, watch} from "vue";
import {availableModules} from "@utils/modules";
import {useUserStore} from "@stores/user";
import {useUtilsStore} from "@stores/utils";

const props = defineProps<{
  currentApp: Settings
}>()


const userStore = useUserStore()
const utilsStore = useUtilsStore()

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


function hasPadding(type: string) {
  const noPadding = ['SingleImage']

  return !noPadding.includes(type)
}
</script>
<template>
  <div
    v-for="(layoutLine, index) in selectedLayout"
    :key="index"
    class="pic-layout-container pic-row-container pic-row"
  >
    <template v-for="module in layoutLine">
      <div
        v-if="!(utilsStore.isMobile && (module?.hideOnMobile || module?.inMobileMenu))"
        :key="module.type"
        :class="[
          {'pic-is-mobile': utilsStore.isMobile},
          `pic-module-${module.type}`,
          `pic-module-${selectedLayoutId}`,
          `pic-module-mobile-width-${module.mobileCols}`,
          `pic-module-width-${module.cols}`,
          {'pic-module-container': hasPadding(module.type)}
        ]"
        class="pic-col"
      >
        <component
          :is="availableModules[module.type]"
          :current-app="currentApp"
          :module-params="module"
        />
      </div>
    </template>
  </div>
</template>
<style lang="postcss" scoped>

</style>
