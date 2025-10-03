<script lang="ts" setup>

import {FieldParams} from "@types";

defineProps<{
  fieldParams?: FieldParams,
  fieldContent: string
}>()

</script>
<template>
  <div class="container">
    <iframe :src="`https://www.youtube.com/embed/${fieldContent}`"/>
  </div>
</template>

<style lang="postcss" scoped>
.container {
  display: flex;
  justify-content: center;
}

iframe {
  aspect-ratio: 16 / 9;
  width: 100% !important;
}
</style>
