<script lang="ts" setup>
// @ts-nocheck
import {useSettingsStore} from "@stores/settings";
import {StyleSet} from "@types";
import {computed, ref} from "vue";

const settingsStore = useSettingsStore()

const emit = defineEmits(['reloadSettings'])

const styleSet = settingsStore.currentStyleSet as StyleSet

const selectedTag = ref<string>("")

function selectTag(tag: string) {
  if (selectedTag.value === tag) {
    selectedTag.value = "";
  }
  selectedTag.value = tag;
}


const ratio = computed(() => {
  if (!selectedTag.value) return 0
  const selectedTagHeight = parseFloat(styleSet.ratioCollection[selectedTag.value]['line-height']) + parseFloat(styleSet.ratioCollection[selectedTag.value]['margin-bottom']) + parseFloat(styleSet.ratioCollection[selectedTag.value]['margin-top']);

  return selectedTagHeight.toFixed(1)
})

</script>

<template>
  <VContainer class="pic-content-container">
    <VRow class="reset-margin-bottom">
      <VCol class="pa-0 rf-ratio-text-container" cols="8">
        <template v-for="(data, tag) in styleSet.ratioCollection">
          <div
            v-if="tag !== 'html'"
            :key="tag"
            :class="{'--selected-tag': tag === selectedTag}"
            class="pic-ratio--text-example"
            @click="selectTag(tag)"
          >
            <component :is="tag" class="--inner-text-example">
              {{ tag }}
            </component>
          </div>
        </template>
        <div
          class="pic-ratio--text-example"
        >
          Size for base text
        </div>
      </VCol>
      <VCol v-if="selectedTag" class="pa-0" cols="4">
        <VTextField
          v-model="styleSet.ratioCollection[selectedTag]['font-size']"
          data-jest="ratio-fs"
          label="Font size"
          step="0.1"
          type="number"
          variant="outlined"
          @update:modelValue="emit('reloadSettings')"
        />
        <VTextField
          v-model="styleSet.ratioCollection[selectedTag]['line-height']"
          data-jest="ratio-lh"
          label="Line height"
          step="0.1"
          type="number"
          variant="outlined"

          @update:modelValue="emit('reloadSettings')"
        />
        <VTextField
          v-model="styleSet.ratioCollection[selectedTag]['margin-bottom']"
          data-jest="ratio-mb"
          label="Margin bottom"
          step="0.1"
          type="number"
          variant="outlined"
          @update:modelValue="emit('reloadSettings')"
        />
        <VTextField
          v-model="styleSet.ratioCollection[selectedTag]['margin-top']"
          data-jest="ratio-mt"
          label="Margin top"
          step="0.1"
          type="number"
          variant="outlined"
          @update:modelValue="emit('reloadSettings')"
        />
        Ratio header height / base height : {{ ratio }}
      </VCol>
    </VRow>
    <VRow class="mt-8">
      <VTextField
        v-model="styleSet.ratioCollection.html['font-size']"
        data-jest="main-font-size"
        label="font-size"
        type="number"
        variant="outlined"
        @update:modelValue="emit('reloadSettings')"
      />
      <VTextField
        v-model="styleSet.ratioCollection.html['line-height']"
        data-jest="main-line-height"
        label="line height"
        step="1"
        type="number"
        variant="outlined"
        @update:modelValue="emit('reloadSettings')"
      />
    </VRow>
  </VContainer>
</template>

<style scoped>

.pic-ratio--text-example > * {
  display: inline-block;
}

.pic-ratio--text-example {
  position: relative;
}

.pic-ratio--text-example::before {
  content: "";
  position: absolute;
  left: -1rlh;
  top: 0;
  bottom: 0;
  background: var(--warning);
  right: 100%;
}

.pic-ratio--text-example:nth-of-type(odd)::before {
  background: var(--main);
}

</style>
