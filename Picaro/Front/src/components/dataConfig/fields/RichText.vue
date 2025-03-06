<script lang="ts" setup>
import {EditorContent, useEditor} from "@tiptap/vue-3";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import StarterKit from "@tiptap/starter-kit";
import {onMounted, ref, watch} from "vue";
import {FieldParams, RichTextContent, RichTextEditorJson} from "@types";
import {generateHTML} from "@tiptap/core";
import {useUserStore} from "@stores/user";

const userStore = useUserStore()

watch(() => userStore.rteImage, () => {
  if (userStore.rteImage) {
    editor.value?.commands.setImage({src: userStore.rteImage})

  }
})

const props = defineProps<{
  fieldParams: FieldParams;
  fieldContent?: RichTextContent | null;
}>()


const emit = defineEmits<{
  updateData: [[string, RichTextEditorJson]]
  endEdit: []
}>()

const selectedImg = ref<string | null>(null)


const editor = useEditor({
  extensions:
      [StarterKit,
        Image.configure({
          inline: true,
          HTMLAttributes: {
            class: 'pic-rte-image',
          },
        }),
        Link,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        })
      ],
  onUpdate: ({editor}) => {
    updateModelData(editor.getJSON());
  }
})

onMounted(() => {


      editor.value?.on("selectionUpdate", ({editor}) => {
        const src = editor.state.selection.$anchor.node()?.attrs?.src;
        if (src) {
          selectedImg.value = src.split("/").at(-1);
        } else {
          selectedImg.value = null;
        }
      });
      editor.value?.commands.setContent(props.fieldContent?.json || "");

    }
)

function setUrl() {
  if (!editor.value) {
    return;
  }
  const previousUrl = editor.value.getAttributes("link").href;
  const url = window.prompt("URL", previousUrl);
  if (url === null) {
    return;
  }
  if (url === "") {
    editor.value
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

    return;
  }
  editor.value
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({href: url})
      .run();
}

function updateModelData(content: RichTextEditorJson) {
  emit("updateData", [props.fieldParams.id, {
    json: content,
    html: generateHTML(
        content,
        [
          StarterKit,
          Image,
          Link
        ],
    )
  }]);
}

</script>
<template>
  <div class="editor-container">
    <h3 class="pic-field-title">
      {{ fieldParams.label }}
    </h3>
    <div v-if="editor" class="editor-toolbar">
      <span
        :class="{ 'is-active': editor.isActive('bold') }"
        @click.stop="editor.chain().focus().toggleBold().run()"
      >
        <v-icon>mdi-format-bold</v-icon>
      </span><span
        :class="{ 'is-active': editor.isActive('italic') }"
        @click.stop="editor.chain().focus().toggleItalic().run()"
      >
        <v-icon>mdi-format-italic</v-icon>
      </span><span
        :class="{ 'is-active': editor.isActive('heading',{ level: 1 }) }"
        @click.stop="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <v-icon>mdi-format-header-1</v-icon>
      </span><span
        :class="{ 'is-active': editor.isActive('heading',{ level: 2 }) }"
        @click.stop="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <v-icon>mdi-format-header-2</v-icon>
      </span><span
        :class="{ 'is-active': editor.isActive('heading',{ level: 3 }) }"
        @click.stop="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      >
        <v-icon>mdi-format-header-3</v-icon>
      </span>
      <span
        :class="{ 'is-active': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <v-icon>mdi-format-list-bulleted</v-icon>
      </span>
      <span
        :class="{ 'is-active': editor.isActive('codeBlock') }"
        @click.stop="editor.chain().focus().toggleCodeBlock().run()"
      >
        <v-icon>mdi-code-array</v-icon>
      </span>
      <span :class="{ 'is-active': editor.isActive('link') }" @click="setUrl">
        <v-icon>mdi-link</v-icon>
      </span>
      <span
        :class="{ 'is-active': editor.isActive('code') }"
        @click.stop="editor.chain().focus().toggleCode().run()"
      >
        <v-icon>mdi-code-not-equal-variant</v-icon>
      </span>
      <span
        :class="{ 'is-active': userStore.imageDrawerToggle }"
        @click.stop="userStore.imageDrawerToggle = !userStore.imageDrawerToggle"
      >
        <v-icon>mdi-image</v-icon>
      </span>
      <span
        @click.stop="editor.chain().focus().setTextAlign('left').run()"
      >
        <v-icon>mdi-format-align-left</v-icon>
      </span>
      <span
        @click.stop="editor.chain().focus().setTextAlign('center').run()"
      >
        <v-icon>mdi-format-align-center</v-icon>
      </span>
      <span
        @click.stop="editor.chain().focus().setTextAlign('right').run()"
      >
        <v-icon>mdi-format-align-right</v-icon>
      </span>
    </div>
    <editor-content :editor="editor" class="editor-textarea" data-testid="rte-editor" />
  </div>
</template>
<style scoped>
.editor-textarea {
  margin: var(--xs) 0;
  border: 1px solid var(--greyDark);


  :deep(.tiptap) {
    > * {
      padding: 0 var(--xs);
    }

    p:first-of-type {
      margin-top: 0;
      padding-top: var(--xs);
    }

    p:last-of-type {
      margin-bottom: 0;
      padding-bottom: var(--xs);
    }
  }

}

.is-active :deep(.v-icon) {
  color: var(--main);
}

.uploaded-image {
  max-height: 100px;
  display: inline-block;
}

.v-form {
  display: flex;
  align-items: start;
}

.size-btn-container {
  width: 250px;
}

.editor-toolbar {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
}
</style>
