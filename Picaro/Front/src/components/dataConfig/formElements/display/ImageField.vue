<script lang="ts" setup>

import {computed} from "vue";
import {FieldParams} from "@types";
import {imageSizeMap} from "@utils/helper";

const props = defineProps<{
  fieldParams: FieldParams,
  fieldContent: string
}>()

const sizeLetter = props.fieldParams.extraParams?.size

const size = imageSizeMap[sizeLetter ?? 'l']
const [name, ext] = props.fieldContent.split('.')

const imageSrc = computed(() => {
  if (!props.fieldContent) return ''
  return `${name}-${size}.${ext}`
})


</script>
<template>
  <img
    v-if="fieldParams.extraParams?.showFull"
    v-fullscreen-image="{
      imageUrl: `/api/uploads/${name}.${ext}`,
      withDownload: false,
      animation: 'blur',
    }"
    :src="`/api/uploads/${imageSrc}`"
  >
  <img
    v-else
    :src="`/api/uploads/${imageSrc}`"
  >
</template>

<style scoped>
img {
  object-fit: cover
}
</style>

