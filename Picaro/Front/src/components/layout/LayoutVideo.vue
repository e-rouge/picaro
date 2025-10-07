<script lang="ts" setup>
import {ref} from "vue";
import {Module} from "@types";

const props = defineProps<{
  moduleParams: Module
}>()
const emit = defineEmits<{
  updateData: [{ link: string }]
}>()


const link = ref<string>(props.moduleParams.content?.link as string ?? '')


function updateData() {
  emit('updateData', {link: link.value ?? ''})
}


</script>

<template>
  <VTextField v-model="link" class="mt-4" density="compact" label="Youtube video ID" @update:model-value="updateData"/>
</template>

<style scoped>
</style>
