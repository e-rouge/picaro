<script lang="ts" setup>
import {useUtilsStore} from "@stores/utils";
import {computed, ref} from "vue";
import {useUserStore} from "@stores/user";
import {picFetch} from "@utils/api";

type ImageList = { name: string, files: ImageListFiles[] }
type ImageListFiles = { ext: string, file: string, size: string | undefined }
const userStore = useUserStore()

const utilsStore = useUtilsStore()


const imageFile = ref<File>();
const allImages = picFetch<string[]>(
    '/api/setup/allimages',
    'GET'
)

const structuredImages = computed<ImageList[]>(() => {
  const data = allImages?.data?.value ?? []
  return data.reduce((acc: ImageList[], currentValue: string) => {
    const [name, ext] = currentValue.split('.')
    const [originalName, , size] = name.split('-')

    const fileIndex = acc.findIndex(item => item.name === originalName)
    const fileParams = {
      size: size,
      ext: ext,
      file: currentValue
    }
    if (fileIndex === -1) {
      acc.push({
        name: originalName,
        files: [fileParams]
      })
    } else {
      acc[fileIndex].files.push(fileParams)
    }
    return acc
  }, [])
})

function uploadImage() {
  if (imageFile.value) {
    const formData = new FormData();
    formData.append('image', imageFile.value);
    fetch(`/api/setup/uploadimages`, {
      method: 'POST',
      body: formData,
    }).then(() => {
      allImages?.refresh()
      utilsStore.addAlert({
        text: "Image uploaded",
        type: "success"
      });
    }).catch((error) => console.error(error));
  }
}

</script>

<template>
  <v-navigation-drawer
    v-model="userStore.imageDrawerToggle"
    location="left"
    width="300"
  >
    <v-btn
      class="float-end"
      density="compact"
      variant="text"
      @click="userStore.imageDrawerToggle = !userStore.imageDrawerToggle"
    >
      <VIcon>mdi-close</VIcon>
    </v-btn>
    <div class="pic-container pic-container-s">
      <v-form class="pic-image-upload-form">
        <v-file-input
          v-model="imageFile"
          accept="image/*"
          density="compact"
          label="Image"
        />
        <v-btn class="ml-4" density="compact" @click="uploadImage">
          Upload
        </v-btn>
      </v-form>
      <div class="pic-image-upload-container">
        <div v-for="image in structuredImages" :key="image.name" class="pic-image-upload">
          <img
            :class="{selected: image.name === userStore.rteImage}"
            :src="`/api/uploads/${image.files[1].file}`"
            class="uploaded-image"
          >
          <div class="size-btn-container">
            <v-btn
              v-for="(imageSize) in (image.files)"
              :key="imageSize.file"
              density="compact"
              variant="text"
              @click="userStore.rteImage = `/api/uploads/${imageSize.file}`"
            >
              {{ imageSize.size }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
