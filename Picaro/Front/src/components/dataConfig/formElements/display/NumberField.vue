<script lang="ts" setup>

import {FieldParams} from "@types";

defineProps<{
  fieldParams: FieldParams,
  fieldContent: number
}>()

</script>
<template>
  <component :is="fieldParams.template ?? 'span'">
    {{ fieldContent }}
  </component>
</template>

