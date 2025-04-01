<script lang="ts" setup>
import {useSettingsStore} from "@stores/settings";
import {ref} from "vue";
import settings from '@data/build/settings.json'
import styleset from '@data/build/styleset.json'

import '../../../../static/css/baseStyle-custom.pcss'

import('../../../../static/css/stylesFront.pcss')

const settingsStore = useSettingsStore()

const settingsLoaded = ref(false)

settingsStore.allSettings = settings
settingsStore.allStyleSets = styleset
settingsLoaded.value = true

</script>

<template>
  <router-view v-if="settingsLoaded"/>
</template>

<style scoped>
</style>
