<script lang="ts" setup>
import {computed, watch} from "vue";
import {Settings, SettingsStore} from "@types";
import {useRoute, useRouter} from "vue-router";
import Alert from "./utils/alertModal.vue";
import {useSettingsStore} from '@stores/settings'

import('../style.pcss').catch((error) => console.error(error))

const route = useRoute()
const router = useRouter()

const settingsStore = useSettingsStore()

const selected = computed(() => route.name);

async function selectApp(event: string | string[]) {
  if (event !== 'none') {
    await router.push({name: route.name || 'index', params: {appId: event}})
  }
}

function reloadSettings() {
  if (import.meta.env.VITE_BUILD_MODE !== "static") {
    fetch('/api/setup/all').then(res => res.json()).then((data: SettingsStore) => {
      settingsStore.allSettings = data.allSettings
      settingsStore.allStyleSets = data.allStyleSets
    }).catch((error) => {
      console.error(error)
    })
  }
}

watch(() => settingsStore.allSettings, () => {
  if (route.params.appId && settingsStore.allSettings.length > 0) {
    settingsStore.currentAppSettings = settingsStore.allSettings.find((app: Settings) => app.id === route.params.appId)
  }
})

watch(() => route.params.appId, () => {
  if (route.params.appId) {
    settingsStore.currentAppSettings = settingsStore.allSettings.find((app: Settings) => app.id === route.params.appId)
  }
}, {immediate: true})
</script>

<template>
  <v-app id="picaro-app" class="picaro-app text--primary">
    <nav class="pic-tabs">
      <img alt="logo" class="logo" src="/images/logo2.svg" width="50">
      <v-tabs :model-value="route.name">
        <v-tab
          to="/admin/app"
          value="app"
        >
          App Config
        </v-tab>
        <template v-if="settingsStore.currentAppSettings">
          <v-tab
            :class="{selected: selected === 'model'}"
            data-testid="model-tab"
            to="/admin/data"
            value="data"
          >
            Data
          </v-tab>
          <v-tab
            :class="{selected: selected === 'layout'}"
            data-testid="layout-tab"
            to="/admin/layout"
            value="layout"
          >
            Layout
          </v-tab>
          <v-tab
            :class="{selected: selected === 'style'}"
            to="/admin/style"
            value="style"
          >
            Style
          </v-tab>
        </template>
        <v-select
          v-if="settingsStore.allSettings.length > 0"
          :items="settingsStore.allSettings"
          :model-value="route.params.appId"
          item-title="applicationName"
          item-value="id"
          label="select app"
          variant="solo-filled"
          @update:model-value="selectApp"
        />
      </v-tabs>
    </nav>
    <div class="pic-main-container">
      <router-view @reloadSettings="reloadSettings()"/>
    </div>
    <Alert/>
  </v-app>
</template>

<style lang="postcss" scoped>

</style>
