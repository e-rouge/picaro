<script lang="ts" setup>
import {computed, ref} from "vue";
import {useUtilsStore} from "@stores/utils";
import {Module, SingleImageParams} from "@types";

const props = defineProps<{
  moduleParams: Module
}>()

const content = computed(() => props.moduleParams.content as SingleImageParams)

const imageFile = ref<File>();
const link = ref(content.value.link ?? '')
const utilsStore = useUtilsStore()
const emit = defineEmits<{
  updateData: [{ image: string, link: string }]
}>()

function uploadImage() {
  if (imageFile.value) {
    const formData = new FormData();
    formData.append('image', imageFile.value);
    fetch(`/api/setup/uploadimages/single-image`, {
      method: 'POST',
      body: formData,
    }).then(() => {
      utilsStore.addAlert({
        text: "Image uploaded",
        type: "success"
      });
      emit('updateData', {image: imageFile.value?.name ?? '', link: link.value ?? ''})
    }).catch((error) => console.error(error));
  }
}
</script>

<template>
  <v-form class="pic-image-upload-form">
    <div class="current-image">
      current image:
      {{ content.image ?? "none" }}
    </div>
    <v-file-input
      v-model="imageFile"
      accept="image/*"
      density="compact"
      label="Image"
    />

    <v-btn class="m-4" color="primary" density="compact" @click="uploadImage">
      Upload
    </v-btn>
    <VTextField v-model="link" class="mt-4" density="compact" label="link"/>
  </v-form>
</template>

<style scoped>
.current-image {
  font-size: .8em;
  text-align: left;
  margin-bottom: .5rem;
}

.pic-image-upload-form {
  overflow: hidden;
}
</style>
