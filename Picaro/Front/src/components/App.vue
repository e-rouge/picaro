<script lang="ts" setup>
import {useSettingsStore} from "@stores/settings";
import {ref} from "vue";
import {SettingsStore} from "@types";
import '../../../../static/css/baseStyle-custom.pcss'


import('../../../FrontStatic/src/stylesFront.pcss').catch((error) => {
  console.error(error)
})


const settingsStore = useSettingsStore()

const settingsLoaded = ref(false)


fetch('/api/setup/all').then((res) => res.json())
    .then((data: SettingsStore) => {
      settingsStore.allSettings = data.allSettings
      settingsStore.allStyleSets = data.allStyleSets
      settingsLoaded.value = true
    }).catch((error) => {
  console.error(error)
})


</script>

<template>
  <router-view v-if="settingsLoaded" />
</template>

<style scoped>
:deep(.pic-row-container) {
  width: 100vw
}
</style>
