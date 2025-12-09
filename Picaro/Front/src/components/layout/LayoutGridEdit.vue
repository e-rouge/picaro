<script lang="ts" setup>
import type {AvailableModules, Category, Model, Module, ModuleEditParams} from "@types";
import {computed, reactive, ref} from "vue";
import {updateSettings} from "@components/utils/api";
import {useUtilsStore} from "@stores/utils";
import {useSettingsStore} from "@stores/settings";
import LayoutImage from "@components/layout/LayoutImage.vue";
import LayoutVideo from "@components/layout/LayoutVideo.vue";
import {HTMLElement, MouseEvent} from "happy-dom";
import {pluginLayoutModules} from "@plugins/modules/pluginModules.ts";

const utilsStore = useUtilsStore()

const utilStore = useUtilsStore()
const settingsStore = useSettingsStore();

const screenWidth: number = window.innerWidth

const props = defineProps<{
  dynamic?: boolean
}>()

const isFull = ref<number | null>(null)
const showConfig = ref<number | null>(null)
const showMobile = ref<number | null>(null)
const showData = ref<number | null>(null)

const selectedColumn = ref<Module | null>()

const selectedContainerDistance = ref<number>(0)

const layoutCollection = defineModel<Module[][]>({default: reactive([])})

const modelCollection = computed<Model[]>(() => {
  return settingsStore.currentAppSettings?.modelCollection ?? []
});

const nativeComponents: ModuleEditParams[] = [
  {
    name: "List"
  },
  {
    name: "FilterCategories"
  },
  {
    name: "Preview"
  },
  {
    name: "FilterSingle"
  },
  {
    name: "Layout",
    commonOnly: true,
    hideModel: true
  },
  {
    name: "FilterLayoutSelect",
    commonOnly: true,
    hideModel: true,
    hideCategories: true
  },
  {
    name: "FilterLayout",
    commonOnly: true
  },
  {
    name: "FilterLink"
  },
  {
    name: "Video",
    component: LayoutVideo,
    hideModel: true,
    hideCategories: true
  },
  {
    name: "SingleImage",
    component: LayoutImage,
    hideModel: true,
    hideCategories: true
  }
];

const components = nativeComponents.concat(pluginLayoutModules)

const filteredComponents = computed(() => {
  return components.filter(item => !props.dynamic || props.dynamic && !item.commonOnly)
})

const filteredComponentsParams = computed(() => {
  return filteredComponents.value.reduce((acc: Record<string, ModuleEditParams>, currentValue) => {
    acc[currentValue.name] = currentValue
    return acc
  }, {})
})

function addRow(index?: number) {
  if (index === undefined || index + 1 === layoutCollection.value.length) {
    layoutCollection.value.push([{type: 'List'}]);
  } else {
    layoutCollection.value.splice(index + 1, 0, [{type: 'List'}])
  }
}

function deleteColumn(line: number, column: number) {
  utilStore.awaitConfirmation({
    text:
        "Are you sure you want to delete this module ?",
    type: "warning"
  }).then(() => {
    layoutCollection.value[line].splice(column, 1)
    if (layoutCollection.value[line].length === 0) {
      layoutCollection.value.splice(line, 1)
    }
  }).catch((error) => console.error(error))
}

function changeModule(event: AvailableModules, index: number, subIndex: number) {
  layoutCollection.value[index][subIndex].type = event;
}

async function saveLayout() {
  if (settingsStore.currentAppSettings) {
    await updateSettings(settingsStore.currentAppSettings).then(() => {
      utilsStore.addAlert({
        text: "Layout saved",
        type: "success"
      });
    }).catch(() => {
      utilsStore.addAlert({
        text: "The layout couldn't be deleted",
        type: "error"
      });
    });
  }
}

function openConfig(index: number) {
  showConfig.value = showConfig.value === index ? null : index
  showMobile.value = null
  showData.value = null
}

function openDataConfig(index: number) {
  showConfig.value = null
  showMobile.value = null
  showData.value = showConfig.value === index ? null : index
}

function openMobile(index: number) {
  showMobile.value = showMobile.value === index ? null : index
  showConfig.value = null
  showData.value = null
}

function resizeOn(event: MouseEvent, column: Module) {
  getDistanceFromLeft(event)
  selectedColumn.value = column
  // @ts-ignore
  addEventListener("mousemove", handleResize)
}

function handleResize(event: MouseEvent) {
  if (selectedColumn.value) {
    selectedColumn.value.cols = Math.floor(((event.clientX + 100) / (screenWidth / 12))) - selectedContainerDistance.value
  }
}

function resizeOff() {
  selectedColumn.value = null
  // @ts-ignore
  window.removeEventListener("mousemove", handleResize)
}

function getDistanceFromLeft(event: MouseEvent) {
  const distance: number = (event.target as HTMLElement).closest(".pic-container")?.getBoundingClientRect().x || 1
  selectedContainerDistance.value = Math.floor(distance / (screenWidth / 12))
}
</script>

<template>
  <div class="pic-layout--main-container" @mouseup="resizeOff">
    <VRow
      v-for="(layoutLine, index) in layoutCollection"
      :key="index"
      class="pic-layout-container pic-layout--row-container"
    >
      <VCol
        v-for="(layoutColumn, subIndex) in layoutLine"
        :key="subIndex"
        :cols="isFull === subIndex ? 12 : layoutColumn.cols"
        class="pic-layout--container pic-layout--module pic-module-container"
      >
        <div :class="`pic-container-width-${layoutColumn.cols}`" class="pic-container">
          <span
            class="pic-layout-settings"
          >
            <VBtn
              :class="{expanded: isFull === subIndex}"
              class="expand-icon"
              density="compact"
              variant="text"
              @click="isFull = isFull === subIndex ? null : subIndex"
            >
              <VIcon>{{ isFull === subIndex ? "mdi-arrow-collapse" : "mdi-arrow-expand" }}</VIcon>
            </VBtn>
            <div class="module-type">
              <VSelect
                :items="filteredComponents"
                :model-value="layoutColumn.type || 'none'"
                data-testid="module-type"
                item-title="name"
                item-value="name"
                label="Module"
                variant="outlined"
                @update:modelValue="changeModule($event as AvailableModules, index, subIndex)"
              />
            </div>
          </span>
          <div class="mb-4 settings-buttons">
            <VBtn v-if="filteredComponentsParams[layoutColumn.type].component"
                  variant="outlined"
                  @click="openConfig(subIndex)"
            >
              <VIcon>mdi-cog</VIcon>
              <span>Settings</span>
            </VBtn>
            <VBtn
              v-if="!filteredComponentsParams[layoutColumn.type].hideModel || !filteredComponentsParams[layoutColumn.type].hideCategories"
              data-testid="content-button"
              variant="outlined"
              @click="openDataConfig(subIndex)"
            >
              <VIcon>mdi-tag-multiple</VIcon>
              <span>Content</span>
            </VBtn>
            <VBtn
              variant="outlined"
              @click="openMobile(subIndex)">
              <VIcon>mdi-cellphone</VIcon>
              <span>Mobile</span>
            </VBtn>
          </div>

          <div
            v-if="filteredComponentsParams[layoutColumn.type].component"
          >
            <component
              :is="filteredComponentsParams[layoutColumn.type].component"
              v-if="showConfig === subIndex"
              :module-params="layoutColumn"
              @updateData="layoutColumn.content = $event"
            />
          </div>
          <div v-if="showMobile === subIndex">
            <VCheckbox v-model="layoutColumn.hideOnMobile" density="compact" label="Hide on mobile"/>
            <VCheckbox v-model="layoutColumn.inMobileMenu" density="compact" label="Put in burger menu"/>
            <VTextField v-model="layoutColumn.mobileCols"
                        density="compact"
                        label="Mobile Size"
                        max="12"
                        min="0"
                        type="number"/>
          </div>
          <div v-if="showData === subIndex">
            <VSelect
              v-if="!filteredComponentsParams[layoutColumn.type].hideModel"
              :items="modelCollection"
              :model-value="modelCollection.find((item: Model) => item.id === layoutColumn.model)"
              data-testid="module-model"
              item-title="name"
              item-value="id"
              label="Model"
              variant="outlined"
              @update:model-value="layoutColumn.model = $event as unknown as Model['id']"
            />
            <VSelect
              v-if="!filteredComponentsParams[layoutColumn.type].hideCategories"
              :items="settingsStore.currentAppSettings?.categories"
              :multiple="true"
              item-title="label"
              item-value="id"
              label="Categories"
              variant="outlined"
              @update:model-value="layoutColumn.categories = $event as Category[]"
            />
          </div>

          <div>
            <VBtn
              color="secondary"
              data-testid="remove-column"
              density="compact"
              small="small"
              @click="deleteColumn(index, subIndex)"
            >
              <VIcon>mdi-delete-outline</VIcon>
            </VBtn>
          </div>
          <div class="pic-flex justify-end">
            <VBtn
              class="pic-resize-button"
              variant="text"
              @mousedown="resizeOn($event, layoutColumn)"
            >
              <VIcon>mdi-arrow-split-vertical</VIcon>
            </VBtn>
          </div>

          <div
            class="pic-layout--add-column"
            data-jest="add-column"
            data-testid="add-column"
            @click="layoutLine.splice(index + 1,0 , {type: 'List'})"
          >
            <v-icon>mdi-table-column-plus-after</v-icon>
          </div>
        </div>
      </VCol>
      <div v-if="layoutCollection.length > 1" class="pic-layout--add-row__inner">
        <div
          data-testid="add-row-inner"
          @click="addRow(index)"
        >
          <v-icon>mdi-table-row-plus-after</v-icon>
        </div>
      </div>
    </VRow>
    <div
      v-if="layoutCollection.length <= 1"
      :class="{'no-row': layoutCollection.length === 0}"
      class="pic-layout--add-row"
      data-testid="add-row"
      @click="addRow()"
    >
      <v-icon>mdi-table-row-plus-after</v-icon>
    </div>
  </div>
  <VBtn
    v-if="layoutCollection.length !== 0"
    class="ml-4 mb-4"
    color="primary"
    data-testid="save-layout"
    @click="saveLayout()"
  >
    Save Layout
    <VIcon>
      mdi-content-save
    </VIcon>
  </VBtn>
</template>

<style lang="postcss" scoped>
:deep(.v-row) {
  margin: 0;
}

.pic-layout {
  &--container {
    padding: 0 var(--s) 0 var(--xxs);
    position: relative;

    .pic-container {
      position: relative;
      margin: var(--m);
      border-radius: var(--s);
      border: 1px solid var(--greyMedium);
    }

  }

  &--main-container,
  &--row-container {
    position: relative;
  }

  &--add-row, &--add-column {
    transform: translate(-100%, -50%);
    background: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main);
    height: var(--l);
    width: var(--l);
    border-radius: var(--3xs);
    border: var(--main) 1px solid;
    cursor: pointer;
  }

  &--add-row,
  &--add-column {
    position: absolute;
  }

  &--add-row {
    &.no-row {
      top: 0;
      right: auto;
      left: 50%;
      transform: translate(-50%, 0);
      position: relative;
    }

    min-height: 40px;
    bottom: 0px;
    right: 50%;
    transform: translateX(-50%);

    &__inner {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 0);
      background: var(--white);
      width: 100%;
      cursor: pointer;
      color: var(--main);
      border: 1px var(--main) solid;
      width: var(--l);
      height: var(--l);
    }
  }

  &--add-column {
    right: -35px;
    top: 50%;
  }
}

.module-type {
  margin-top: -.5rem;
}

.settings-buttons {
  overflow: hidden;
  padding-bottom: 0.25rem;

  .v-btn {
    margin-right: var(--m);
    margin-top: var(--m);
    min-width: 120px;
  }

  span {
    margin-left: var(--xs);
    font-size: 12px;
  }
}

.pic-resize-button, .expand-icon {
  position: absolute;
  right: 0;
  padding: 0 var(--s) !important;
  height: var(--xl);
  min-width: auto;
  border-left: 1px solid var(--greyMedium);


  .v-icon {
    font-size: .9em;
    color: var(--greyDark);
  }
}

.pic-resize-button {
  bottom: 0;
  border-top: 1px solid var(--greyMedium);
}

.expand-icon {
  top: 0;
  border-bottom: 1px solid var(--greyMedium);

  &.expanded {
    .v-icon {
      color: var(--main)
    }
  }
}
</style>
