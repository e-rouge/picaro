<script lang="ts" setup>
import {useSettingsStore} from "@stores/settings";
import {computed} from "vue";
import {LayoutCollection} from "@types";
import {useUserStore} from "@stores/user";

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const layoutList = computed<LayoutCollection[]>(() => {
  const layout = structuredClone(settingsStore.currentAppSettings?.layoutCollection ?? [])
  layout.sort((a, b) => a.order - b.order)
  return layout
})

function changeLayout(id: string) {
  userStore.updateFilterCollection({value: [id], target: '', method: 'eq'}, 'layout')
}
</script>

<template>
  <div v-for="layout in layoutList" :key="layout.id" class="pic-layout-select">
    <span @click="changeLayout(layout.id)">{{ layout.name }}</span>
  </div>
</template>

<style scoped>
</style>
