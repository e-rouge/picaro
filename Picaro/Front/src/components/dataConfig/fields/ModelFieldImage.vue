<script lang="ts" setup>
import {ref} from "vue";

type ExtraParams = {
  showFull: boolean
  size: string
}

const props = defineProps<{
  extraParams: ExtraParams
}>()

const sizeList = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'original']

defineEmits<{
  updateParams: [ExtraParams]
}>()

const extraParams = ref<ExtraParams>(props.extraParams ?? {showFull: false})

</script>

<template>
  <VCheckbox
    v-model="extraParams.showFull"
    label="show full image on click"
    type="checkbox"
  />
  <VSelect v-model="extraParams.size" :items="sizeList"/>
</template>

<style scoped>

</style>
