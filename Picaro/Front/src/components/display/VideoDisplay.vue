<script lang="ts" setup>
import {Module, SingleImageParams} from "@types";
import {computed} from "vue";
import VideoEmbed from "@components/dataConfig/formElements/display/VideoEmbed.vue";

const props = defineProps<{
  moduleParams: Module
}>()

const content = computed(() => props.moduleParams.content as SingleImageParams)

</script>

<template>
  <VideoEmbed :field-content="content.link"></VideoEmbed>
</template>

<style scoped>
</style>
