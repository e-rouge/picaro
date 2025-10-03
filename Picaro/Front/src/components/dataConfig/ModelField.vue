<script lang="ts" setup>
import Text from "./formElements/display/TextLine.vue";
import {FieldContentParams, Model, Module} from "@types";
import {computed, shallowRef} from "vue";
import ImageField from "@components/dataConfig/formElements/display/ImageField.vue";
import VideoEmbed from "@components/dataConfig/formElements/display/VideoEmbed.vue";

const props = defineProps<{
  fieldContent: FieldContentParams
  moduleParams: Module
  currentModel: Model
  fieldSelection: string[] | undefined
}>()

const emit = defineEmits<{
  clickFieldName: [string]
}>()


const fieldParams = computed(() => props.currentModel.fieldCollection.find(item => item.id === props.fieldContent.fieldParamsId))

const attributes = computed(() => {
  if (fieldParams.value?.attributes) {
    const attr = fieldParams.value?.attributes.split(' ')
    return attr.reduce((acc: Record<string, string>, curr: string) => {
      const [name, val] = curr.split('=')
      acc[name] = val.replaceAll('"', '')
      return acc
    }, {}) ?? {}
  }
})

const componentMap = shallowRef();

const richTextComponent = () => import.meta.env.VITE_BUILD_MODE !== "static" ?
    import("./formElements/display/RichText.vue") :
    import("./formElements/display/RichTextStatic.vue")

richTextComponent()
    .then(component => {
          componentMap.value = {
            richText: component.default,
            text: Text,
            image: ImageField,
            videoEmbed: VideoEmbed
          }
        }
    ).catch(e => console.error(e))

function isDisplayed() {
  if (!props.fieldSelection) {
    return true
  } else {
    return props.fieldSelection.includes(fieldParams.value?.name ?? "")
  }
}
</script>
<template>
  <component
    :is="componentMap[fieldParams.type]"
    v-if="fieldParams && fieldParams.type && fieldContent && componentMap && isDisplayed()"
    :key="fieldParams.id"
    :class="fieldParams.name"
    :field-content="fieldContent.fieldContent"
    :field-params="fieldParams"
    :module-params="moduleParams"
    v-bind="attributes"
    @click="emit('clickFieldName', fieldParams.name)"
  />
</template>
