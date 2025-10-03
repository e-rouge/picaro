<script lang="ts" setup>

import {computed} from "vue";
import type {Settings} from "@types";
import {useSettingsStore} from "@stores/settings";
import LayoutGridEdit from "@components/layout/LayoutGridEdit.vue";


const settingsStore = useSettingsStore();


const layoutCommonCollection = computed<Settings["layoutCommonCollection"]>(() => {
  return settingsStore.currentAppSettings?.layoutCommonCollection || [];
});

</script>

<template>
  <LayoutGridEdit v-model="layoutCommonCollection"/>
</template>

<style scoped>

</style>
