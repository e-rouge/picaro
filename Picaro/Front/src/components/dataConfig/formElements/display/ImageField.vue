<script lang="ts" setup>

import {computed} from "vue";
import {FieldParams} from "@types";

const props = defineProps<{
  fieldParams: FieldParams,
  fieldContent: string
}>()

const imageSrc = computed(() => {
  if (!props.fieldContent) return ''
  const [name, ext] = props.fieldContent.split('.')
  return `${name}-3-l.${ext}`
})


</script>
<template>
  <img :src="`/api/uploads/${imageSrc}`">
</template>

<style scoped>
img {
  object-fit: cover
}
</style>

