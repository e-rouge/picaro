<script lang="ts" setup>
// @ts-nocheck
import {ColorParameters, StyleSet} from "@types";
import {ColorHelper} from "@libs/colorHelper/index";
import {GenerateColorSet} from "@libs/colorGenerator";
import {useSettingsStore} from "@stores/settings";
import {ref} from "vue";
import type {ColorHSL} from "@libs/colorHelper/index.d";
import {copy} from "copy-anything"


const settingsStore = useSettingsStore()

const styleSet = settingsStore.currentStyleSet as StyleSet

const colorHelper = new ColorHelper()

const colorSet = new GenerateColorSet(styleSet.dominant)

colorSet.generate(
    styleSet.colorParameterCollection,
    styleSet.colorGeneratorParams,
);
const colorCollection = ref(copy(colorSet.colorCollection))


const dominantColorParams = ref(colorHelper.hexToHsl(styleSet.dominant).getValueCollection() as ColorHSL)


function updateColor() {
  styleSet.dominant = colorHelper.hslToHex(dominantColorParams.value).getString()

  colorSet
      .updateColor(dominantColorParams.value)
      .generate(
          styleSet.colorParameterCollection,
          styleSet.colorGeneratorParams
      )
  colorCollection.value = copy(colorSet.colorCollection)
}

function bgColor(color: ColorHSL, index?: number, location?: "dominant" | "sub", subIndex?: number) {
  let textColor = "";
  if (location === 'dominant' && index !== undefined) {
    textColor = colorCollection.value.dominantTextSubCollection[index].hex
  } else if (location === 'sub' && index !== undefined && subIndex !== undefined) {
    textColor = colorCollection.value.combinationCollection[index].textSubCombination[subIndex].hex
  }

  return `background:${colorHelper.getString(color)};color:${textColor}`
}

function updateCombinationColor(type: "hue" | "light" | "saturation", index: number | string, event: number) {
  index = Number(index)
  const colorChanged = colorSet.colorCollection.combinationCollection[index]
  colorChanged[type] = event
  styleSet.colorParameterCollection[index] = generateNewColorSet(
      dominantColorParams.value,
      colorSet.colorCollection.combinationCollection[index]
  )
  colorSet.generate(
      styleSet.colorParameterCollection,
      styleSet.colorGeneratorParams
  )
  colorCollection.value = copy(colorSet.colorCollection)
}

function generateNewColorSet(dominant: ColorHSL, combination: ColorHSL): ColorParameters {
  const newCombination: ColorParameters = {hueVariation: 0}
  newCombination.hueVariation =
      combination.hue - dominant.hue
  if (combination.saturation !== dominant.saturation) {
    newCombination.saturation = combination.saturation
  }
  if (combination.light !== dominant.light) {
    newCombination.light = combination.light
  }
  return newCombination
}

function getStringColor(color: ColorHSL) {

  color = JSON.parse(JSON.stringify(color)) // clone
  color.light = 50
  color.saturation = 100
  return colorHelper.getString(color)
}

function isMainColor(color: string, subColor: string) {
  return color === subColor
}

function resetSetting(setting: keyof ColorParameters, index: number) {
  const newSettings = styleSet.colorParameterCollection[index]
  delete newSettings[setting]

  styleSet.colorParameterCollection[index] = newSettings

  regenerateColorSet()
}

function colorIsHidden(location: "sub" | "dominant", index: number, subIndex?: number) {
  let hiddenCombination
  if (location === 'dominant') {
    hiddenCombination = styleSet.hiddenCombination[location]
  } else if (location === 'sub' && subIndex !== undefined) {
    hiddenCombination = styleSet.hiddenCombination[location][subIndex]
  }
  return hiddenCombination.find((item: number) => item === index) !== undefined
}

function generateColors() {
  colorSet.generate(
      styleSet.colorParameterCollection,
      styleSet.colorGeneratorParams
  )
  colorCollection.value = copy(colorSet.colorCollection)
}

function addColor() {
  const newColorSet = styleSet.colorParameterCollection
  newColorSet.push({
    hueVariation: 0,
  })
  colorSet.generate(
      styleSet.colorParameterCollection,
      styleSet.colorGeneratorParams
  )
  styleSet.hiddenCombination.sub.push([])
  colorCollection.value = colorSet.colorCollection
}

function removeColor(index: number | string) {
  index = Number(index)
  colorSet.colorCollection.combinationCollection.splice(index, 1)
  styleSet.colorParameterCollection.splice(index, 1)
  styleSet.hiddenCombination.sub.splice(index, 1)
  colorCollection.value = colorSet.colorCollection
}

function regenerateColorSet() {
  colorSet.generate(
      styleSet.colorParameterCollection,
      styleSet.colorGeneratorParams
  )
  colorCollection.value = colorSet.colorCollection

}

function toggleColor(location: 'dominant' | 'sub', index: number, locationIndex?: number) {

  if (location === 'dominant') {
    const existingItemIndex = styleSet.hiddenCombination[
        location
        ].findIndex((item) => item === index)
    if (existingItemIndex === -1) {
      styleSet.hiddenCombination[location].push(index)
    } else {
      styleSet.hiddenCombination[location].splice(existingItemIndex, 1)
    }
  } else if (location === 'sub' && locationIndex !== undefined) {
    const existingItemIndex = styleSet.hiddenCombination[location][
        locationIndex
        ].findIndex((item: number) => item === index)
    if (existingItemIndex === -1) {
      styleSet.hiddenCombination[location][locationIndex].push(index)
    } else {
      styleSet.hiddenCombination[location][locationIndex].splice(
          existingItemIndex,
          1
      )
    }
  }
}

</script>
<template>
  <v-row>
    <v-col cols="6">
      <v-row>
        <v-col cols="6">
          <div class="pic-color-control--container">
            <v-slider
              v-model="styleSet.colorGeneratorParams.light.variation"
              density="compact"
              hint="Changes the light difference of the first and last sub color"
              label="Light variation"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.light.curve"
              hint="Math curve fallowed by the light increase (first one is linear)"
              label="Light curve"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.light.move"
              hint="Shift all color's light : left is darker, right is lighter"
              label="Light move"
              max="8"
              min="-8"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
          </div>
          <div class="pic-color-control--container">
            <v-slider
              v-model="styleSet.colorGeneratorParams.saturation.variation"
              hint="Changes the saturation difference of the first and last"
              label="Saturation variation"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.saturation.curve"
              hint="Math curve fallowed by the saturation increase (first one is linear)"
              label="Saturation curve"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.saturation.move"
              hint="Shift all color's saturation : left is more saturated, right is less saturated"
              label="Saturation move"
              max="8"
              min="-8"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div class="pic-color-control--container">
            <v-slider
              v-model="styleSet.colorGeneratorParams.hue.variation"
              density="compact"
              hint="Add hue variation based on color theory : darker gets warmer"
              label="Hue variation"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.hue.curve"
              density="compact"
              hint="Math curve fallowed by the hue shift (first one is linear)"
              label="hue curve"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.hue.move"
              density="compact"
              hint="Move the hue in the color wheel"
              label="hue move"
              max="8"
              min="-8"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
          </div>
          <div class="pic-color-control--container">
            <v-slider
              v-model="styleSet.colorGeneratorParams.text.variation"
              label="Text variation"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.text.curve"
              label="Text curve"
              max="10"
              min="0"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
            <v-slider
              v-model="styleSet.colorGeneratorParams.text.move"
              label="Text move"
              max="8"
              min="-8"
              show-ticks="always"
              step="1"
              tick-size="3"
              @end="generateColors()"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <v-slider
            v-model="styleSet.colorGeneratorParams.count"
            density="compact"
            label="Number of sub colors"
            max="10"
            min="3"
            show-ticks="always"
            step="1"
            tick-size="3"
            @end="generateColors()"
          />
        </v-col>
        <v-col cols="3">
          <v-checkbox
            v-model="styleSet.colorGeneratorParams.full"
            label="Always 10 sub colors"
            @change="generateColors()"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">
      <!-- Dominant color -->
      <v-row>
        <v-col :style="bgColor(dominantColorParams)" cols="2"/>
        <v-col cols="10">
          <div data-jest="dominant-preview">
            <div class="mb-0">
              <v-slider
                ref="dominantHue"
                v-model="dominantColorParams.hue"
                :thumb-color="getStringColor(dominantColorParams)"
                label="Hue"
                max="360"
                min="0"
                step="1"
                thumb-label="always"
                @update:modelValue="updateColor()"
              />
              <v-slider
                ref="dominantLight"
                v-model="dominantColorParams.light"
                label="light"
                max="100"
                min="0"
                step="1"
                thumb-label="always"
                @update:modelValue="updateColor()"
              />
              <v-slider
                ref="dominantSat"
                v-model="dominantColorParams.saturation"
                max="100"
                min="0"

                step="1"
                thumb-label="always"
                @update:modelValue="updateColor()"
              />
            </div>

            <div class="color-panel--sample">
              <v-card
                v-for="(subColor, index) in colorSet.colorCollection.dominantSubCollection"
                :key="index"
                :class="{'__main':isMainColor(bgColor(subColor), bgColor(dominantColorParams)), '__is-hidden': colorIsHidden('dominant', index)}"
                :style="bgColor(subColor, index, 'dominant')"
                class="pa-3"
                @click="toggleColor('dominant',index)"
              >
                text
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Complementary colors -->
      <v-row
        v-for="(color, index) in colorCollection.combinationCollection"
        :key="color.hex"
        class="sub-color-parameters"
      >
        <v-col :style="bgColor(color)" cols="2">
          <v-btn
            :data-jest="`remove-color-${index}`"
            class="center"
            density="compact"
            text="text"
            @click="removeColor(index)"
          >
            Remove
            Color
          </v-btn>
        </v-col>
        <v-col cols="10">
          <div :data-jest="`sub-preview${index}`">
            <v-slider
              ref="subHue"
              :model-value="color.hue"
              :thumb-color="getStringColor(color)"
              label="Hue"
              max="360"
              min="0"
              step="1"
              thumb-label="always"
              @end="updateCombinationColor('hue', index, $event)"
            />
            <v-slider
              :model-value="color.light"
              label="Light"
              max="100"
              min="0"
              step="1"
              thumb-label="always"
              @update:modelValue="updateCombinationColor('light', index, $event)"
            />
            <v-btn v-if="color.light !== dominantColorParams.light" @click.stop="resetSetting('light', index)">
              reset
            </v-btn>
            <v-slider
              :model-value="color.saturation"
              label="Sat."
              max="100"
              min="0"
              thumb-label="always"
              @update:modelValue="updateCombinationColor('saturation', index, $event)"
            />
          </div>
          <div :key="color.hex" class="color-panel--sample">
            <v-card
              v-for="(subColor, subIndex) in color.subCombination"
              :key="subColor.hex"
              :class="{'__is-hidden': colorIsHidden('sub',subIndex,index)}"
              :style="bgColor(subColor, index, 'sub', subIndex)"
              class="pa-3"
              data-jest="sub-combination-square"
              @click="toggleColor('sub', subIndex, index)"
            >
              text
            </v-card>
          </div>
        </v-col>
      </v-row>
      <div class="color-panel--sample">
        <div v-for="(subColor, index) in colorCollection.graySubCollection" :key="index">
          <v-card :style="bgColor(subColor)" class="pa-3"/>
        </div>
      </div>
      <div class="color-panel--sample">
        <div
          v-for="(subColor, index) in colorCollection.alertSubCollection"
          :key="index"
          class="sub-combination"
        >
          <v-card :style="bgColor(subColor)" class="pa-3"/>
        </div>
      </div>
      <div class="color-panel--sample">
        <div
          v-for="(subColor, index) in colorCollection.warningSubCollection"
          :key="index"
          class="sub-combination"
        >
          <v-card :style="bgColor(subColor)" class="pa-3"/>
        </div>
      </div>
      <div class="color-panel--sample">
        <div
          v-for="(subColor, index) in colorCollection.successSubCollection"
          :key="index"
          class="sub-combination"
        >
          <v-card :style="bgColor(subColor)" class="pa-3"/>
        </div>
      </div>
      <div class="color-panel--sample">
        <div
          v-for="(subColor, index) in colorCollection.infoSubCollection"
          :key="index"
          class="sub-combination"
        >
          <v-card :style="bgColor(subColor)" class="pa-3"/>
        </div>
      </div>

      <v-btn class="_color-button" data-jest="addColor" text="text" @click="addColor">
        Add Color
      </v-btn>
    </v-col>
  </v-row>
</template>
<style lang="postcss" scoped>
.color-panel--sample :deep(.v-card),
.color-panel--sample > div {
  display: inline-block;
}

.__is-hidden {
  background: repeating-linear-gradient(
      45deg,
      #ddd,
      #ddd 16px,
      #333 16px,
      #333 19px
  ) !important;
}

.pic-color-control--container:nth-of-type(even) {
  background: #dfdfdf;
}

.v-row {
  margin: 0;
}

:deep(.v-btn.v-btn--density-compact) {
  height: auto;
  padding: .5rem 0;
}

:deep(.v-btn__content) {
  white-space: normal;
  width: auto;
}

</style>
