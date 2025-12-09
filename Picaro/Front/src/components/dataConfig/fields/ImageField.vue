<script lang="ts" setup>
import {computed, ref} from "vue";
import type {FieldParams} from "@types";
import {picFetch} from "@utils/api";

const props = defineProps<{
  fieldParams: FieldParams,
  fieldContent: string,
  index: number,
  isEdit: boolean
}>()

const emit = defineEmits(["updateData", "saveEdit", "endEdit"])

const imageFile = ref<File>();

const thumb = computed(() => {
  if (!props.fieldContent) return ''
  const [name, ext] = props.fieldContent.split('.')
  return `${name}-1-s.${ext}`
})

const formattedData = computed(() => {
  return [
    props.fieldParams.id,
    ''
  ]
})

function uploadImage() {
  if (imageFile.value) {
    const formData = new FormData();
    formData.append('image', imageFile.value);
    picFetch(`/api/setup/uploadimages`, {
      method: 'POST',
      body: formData,
      header: false,
      callback: () => {
        formattedData.value[1] = imageFile.value?.name ?? ''
        emit("updateData", formattedData.value);
      }
    })
  }
}


</script>
<template>
  <v-file-input
    v-model="imageFile"
    :label="fieldParams.label "
    accept="image/*"
    density="compact"
  />
  <img
    v-if="fieldContent"
    :src="`/api/uploads/${thumb}`"
  >
  <v-btn class="ml-4" @click="uploadImage">
    Upload
  </v-btn>
</template>
