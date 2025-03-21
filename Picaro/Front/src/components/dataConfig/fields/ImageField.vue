<script lang="ts" setup>
import {computed, defineEmits, defineProps, ref} from "vue";
import {useUtilsStore} from "@stores/utils";
import type {FieldParams} from "@types";

const props = defineProps<{
  fieldParams: FieldParams,
  fieldContent: string,
  index: number,
  isEdit: boolean
}>()

const emit = defineEmits(["updateData", "saveEdit", "endEdit"])

const imageFile = ref<File>();
const uploadedImage = ref('')
const utilsStore = useUtilsStore()

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
    fetch(`/api/setup/uploadimages`, {
      method: 'POST',
      body: formData,
    }).then(() => {
      formattedData.value[1] = imageFile.value?.name ?? ''
      console.log(formattedData.value)
      emit("updateData", formattedData.value);

      utilsStore.addAlert({
        text: "Image uploaded",
        type: "success"
      });
    }).catch((error) => console.error(error));
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
  <img v-if="fieldContent" :src="`/api/uploads/${thumb}`">
  <v-btn class="ml-4" @click="uploadImage">
    Upload
  </v-btn>
</template>
