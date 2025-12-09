<script lang="ts" setup>
import {ModelContent, Settings} from "@types";
import {picFetch} from "@api";

const props = defineProps<{
  moduleParams: any
  currentApp: Settings
}>()

function getData() {
  return picFetch<ModelContent[]>(`/api/data/${props.currentApp.id}/${props.moduleParams.model}`)
}

const content = getData()
</script>

<template>
  <div>
    <h3>Test module</h3>

    {{ props.moduleParams.content.testContent }}
  </div>


</template>

<style scoped>

</style>
