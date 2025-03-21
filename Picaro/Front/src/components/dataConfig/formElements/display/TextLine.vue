<script lang="ts" setup>

import {FieldParams} from "@types";

defineProps<{
  fieldParams: FieldParams,
  fieldContent: string
}>()
</script>
<template>
  <component :is="fieldParams.template || 'span'" v-if="fieldContent">
    {{ fieldContent }}
  </component>
</template>

