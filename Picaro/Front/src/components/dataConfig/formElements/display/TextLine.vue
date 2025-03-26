<script lang="ts" setup>

import {FieldParams} from "@types";
import {inject} from "vue";

defineProps<{
  fieldParams: FieldParams,
  fieldContent: string
}>()

const isPreviewTitle = inject('isPreviewTitle')
</script>
<template>
  <component :is="isPreviewTitle ? 'a' : fieldParams.template ?? 'span'">
    {{ fieldContent }}
  </component>
</template>

