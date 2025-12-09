<script lang="ts" setup>
import {ref} from "vue";
import {Module} from "@types";

const props = defineProps<{
  moduleParams: Module
}>()
const emit = defineEmits<{
  updateData: [{ testContent: string }]
}>()


const testContent = ref<string>(props.moduleParams.content?.testContent as string ?? '')


function updateData() {
  emit('updateData', {testContent: testContent.value})
}


</script>

<template>
  <VTextField v-model="testContent" class="mt-4" label="Où a été tourné le film"
              @update:model-value="updateData"/>
</template>

<style scoped>
</style>
