<script lang="ts" setup>
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {RichTextContent} from "@types";
import {ref, watch} from "vue";
import {generateHTML} from '@tiptap/core'


const props = defineProps<{
  fieldContent: RichTextContent | null
}>()


const html = ref("")

watch(() => props.fieldContent, () => {
  if (props.fieldContent?.json) {
    html.value = generateHTML(
        props.fieldContent.json,
        [
          StarterKit,
          Image,
          Link
        ],
    )
  }

}, {immediate: true})

</script>
<template>
  <div v-html="html" />
</template>
