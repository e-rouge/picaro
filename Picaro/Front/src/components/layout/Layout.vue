<script lang="ts" setup>
import {Layout, Settings} from "@types";
import {computed, ref, watch} from "vue";
import {availableModules} from "@utils/modules";
import {useUserStore} from "@stores/user";

const props = defineProps<{
  currentApp: Settings
}>()


const userStore = useUserStore()

const selectedLayoutId = ref(props.currentApp.defaultLayout)

watch(() => userStore.filterCollection.all, () => {
  const layout = userStore.filterCollection.all.find(item => item.type === 'layout')
  if (layout) {
    selectedLayoutId.value = layout.value[0]
  }
}, {immediate: true})

const selectedLayout = computed<Layout[][]>(() => {
  return props.currentApp.layoutCollection.find(item => item.id === selectedLayoutId.value)?.layout || []
})
</script>
<template>
  <v-row
    v-for="(layoutLine, index) in selectedLayout"
    :key="index"
    class="pic-layout--container pic-row-container"
  >
    <v-col
      v-for="module in layoutLine"
      :key="module.type"
      :class="`pic-module-${module.type} pic-module-${selectedLayoutId}`"
      :cols="module.cols"
      class="pic-module-container"
    >
      <component
        :is="availableModules[module.type]"
        :current-app="currentApp"
        :module-params="module"
      />
    </v-col>
  </v-row>
</template>
