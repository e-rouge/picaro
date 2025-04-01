<script lang="ts" setup>
import {Module, SingleImageParams} from "@types";
import {computed} from "vue";

const props = defineProps<{
  moduleParams: Module
}>()

const content = computed(() => props.moduleParams.content as SingleImageParams)


function goToLink() {
  if (content.value?.link) {
    window.location.href = content.value.link
  }
}
</script>

<template>
  <span :class="{'is-link':content.link}" @click="goToLink()">
    <img :src="`/api/uploads/single-image/${content.image}`" class="single-image">
  </span>
</template>

<style scoped>
.single-image {
  max-width: 100%;
}

.is-link {
  cursor: pointer;
}
</style>
