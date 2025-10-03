<script lang="ts" setup>
// @ts-nocheck
import ColorEdit from "@components/styleSet/ColorEdit.vue";
import {nanoid} from "nanoid";
import {useRoute, useRouter} from "vue-router";
import {useSettingsStore} from "@stores/settings";
import {watch} from "vue";
import {StyleSet} from "@types";
import FontEdit from "@components/styleSet/FontEdit.vue";
import {generateCSS} from "@utils/cssGenerator";
import {createStyleSet, updateStyleSet} from "@components/utils/api";
import RatioEdit from "@components/styleSet/RatioEdit.vue";

const router = useRouter()
const route = useRoute()
const settingsStore = useSettingsStore()

defineEmits(['reloadSettings'])


watch(() => route.params.styleId, (styleId) => {
  if (styleId) {
    settingsStore.currentStyleSet = settingsStore.allStyleSets.find((styleSet) => styleSet.id === styleId);
  }
}, {immediate: true})

async function createNewStyle() {
  const newStyleId = nanoid(8);
  const newStyle = {
    dominant: "#04729b",
    colorParameterCollection: [],
    colorGeneratorParams: {
      count: 3,
      text: {variation: 3, curve: 0, move: 0},
      hue: {variation: 3, curve: 0, move: 0},
      light: {variation: 3, move: 0, curve: 0},
      saturation: {variation: 3, move: 0, curve: 0},
      full: false,
    },
    selectorCollection: {html: {}},
    'font-size': "16px",
    id: newStyleId,
    setName: "New Set",
    fontFamilyMain: {
      font: "arial",
      origin: "webSafe"
    },
    fontFamilyAlt: {
      font: "arial",
      origin: "webSafe"
    },
    fontFamilyTitle: {
      font: "arial",
      origin: "webSafe"
    },
    ratioCollection: {
      h1: {
        text: "header 1",
        "margin-top": "1.6",
        "margin-bottom": "2",
        "font-size": "4.2",
        "line-height": "4.2"
      },
      h2: {
        text: "header 2",
        "margin-top": "1.3",
        "margin-bottom": "2",
        "font-size": "3",
        "line-height": "3"
      },
      h3: {
        text: "header 3",
        "margin-top": "0",
        "margin-bottom": "1.3",
        "font-size": "2",
        "line-height": "3"
      },
      h4: {
        text: "header 4",
        "margin-top": "0",
        "margin-bottom": "1.3",
        "font-size": "1.6",
        "line-height": "2"
      },
      h5: {
        text: "header 5",
        "margin-top": "0",
        "margin-bottom": "1.3",
        "font-size": "1",
        "line-height": "1"
      },
      h6: {
        text: "header 6",
        "margin-top": "0",
        "margin-bottom": "0",
        "font-size": "1",
        "line-height": "1"
      },
      p: {
        "line-height": "1.5",
        "font-size": "1",
        "margin-bottom": "0",
        "margin-top": "0",
        text: "base text"
      },
      html: {
        "line-height": "24",
        "font-size": "16"
      }
    },
    hiddenCombination: {dominant: [], sub: []},
  } as StyleSet
  settingsStore.allStyleSets.push(newStyle);
  settingsStore.currentStyleSet = newStyle
  await router.replace({params: {styleId: ""}});

  refreshLiveStyle()
}

async function setStyle(styleId: string) {
  const style = settingsStore.allStyleSets.find((styleSet) => styleSet.id === styleId);
  if (!style) return
  settingsStore.currentStyleSet = style
  await router.push({params: {appId: route.params.appId, styleId: style.id}});
}

function refreshLiveStyle() {
  const generatedCSS = generateCSS(settingsStore.currentStyleSet)
  const styleContainer = document.getElementById("pic-live-styles") as HTMLStyleElement
  console.log(generatedCSS)
  styleContainer.innerHTML = generatedCSS
  return generatedCSS
}

async function save() {
  const styleSet = settingsStore.currentStyleSet as StyleSet
  const generatedCSS = refreshLiveStyle()
  if (route.params.styleId) {
    await updateStyleSet({styleSet, generatedCSS})
  } else {
    await router.push({params: {appId: route.params.appId, styleId: styleSet.id}});
    const {data} = await createStyleSet({styleSet, generatedCSS})
    settingsStore.currentStyleSet = data
  }

}
</script>

<template>
  <div class="pt-4">
    <div>
      <div class="pic-container">
        <v-select
          v-if="settingsStore.allStyleSets.length > 0"
          :items="settingsStore.allStyleSets"
          item-title="setName"
          item-value="id"
          label="Select style"
          @update:modelValue="setStyle"
        />
        <v-btn v-if="!settingsStore.currentStyleSet" color="primary" @click="createNewStyle">
          New Style
        </v-btn>
      </div>

      <template v-if="settingsStore.currentStyleSet">
        <div class="pic-container">
          <h3>Style name</h3>
          <v-text-field v-model="settingsStore.currentStyleSet.setName" label="Style Name"/>
        </div>
        <v-btn @click="refreshLiveStyle">
          Refresh style
        </v-btn>
        <div class="pic-font-fix pic-container">
          <FontEdit @reload-settings="refreshLiveStyle()"/>
        </div>
        <div class="pic-container">
          <ColorEdit/>
        </div>
        <div class="pic-container pic-live-style">
          <RatioEdit @reload-settings="refreshLiveStyle()"/>
          <v-btn color="primary" @click="save()">
            Save Style
            <v-icon class="ml-2">
              mdi-content-save
            </v-icon>
          </v-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>
