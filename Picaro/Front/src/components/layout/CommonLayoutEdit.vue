<script lang="ts" setup>

import {computed, ref} from "vue";
import type {Settings} from "@types";
import {useSettingsStore} from "@stores/settings";
import LayoutGridEdit from "@components/layout/LayoutGridEdit.vue";
import AppDisplay from "@components/display/AppDisplay.vue";

const isPreview = ref(false)

const settingsStore = useSettingsStore();


const layoutCommonCollection = computed<Settings["layoutCommonCollection"]>(() => {
  return settingsStore.currentAppSettings?.layoutCommonCollection || [];
});

</script>

<template>
  <VBtn class="mt-4 ml-4" color="secondary" variant="outlined" @click="isPreview = !isPreview">Preview</VBtn>
  <AppDisplay v-if="isPreview"></AppDisplay>
  <LayoutGridEdit v-else v-model="layoutCommonCollection"/>
</template>

<style scoped>

</style>
