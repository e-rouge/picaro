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
.pic-module-width- {
  &1 {
    flex: 0 0 8.33%
  }

  &2 {
    flex: 0 0 16.66%;
  }

  &3 {
    flex: 0 0 25%
  }

  &4 {
    flex: 0 0 33.33%
  }

  &5 {
    flex: 0 0 41.66%
  }

  &6 {
    flex: 0 0 50%
  }

  &7 {
    flex: 0 0 58.33%
  }

  &8 {
    flex: 0 0 66.66%
  }

  &9 {
    flex: 0 0 75%
  }

  &10 {
    flex: 0 0 84.33%
  }

  &11 {
    flex: 0 0 92.66%
  }

  &12 {
    flex: 0 0 100%
  }
}

.pic-is-mobile.pic-module-mobile-width- {
  &1 {
    flex: 0 0 8.33%
  }

  &2 {
    flex: 0 0 16.66%;
  }

  &3 {
    flex: 0 0 25%
  }

  &4 {
    flex: 0 0 33.33%
  }

  &5 {
    flex: 0 0 41.66%
  }

  &6 {
    flex: 0 0 50%
  }

  &7 {
    flex: 0 0 58.33%
  }

  &8 {
    flex: 0 0 66.66%
  }

  &9 {
    flex: 0 0 75%
  }

  &10 {
    flex: 0 0 84.33%
  }

  &11 {
    flex: 0 0 92.66%
  }

  &12 {
    flex: 0 0 100%
  }
}
</style>
