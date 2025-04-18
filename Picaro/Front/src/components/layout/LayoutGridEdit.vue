<script lang="ts" setup>
import type {AvailableModules, Category, Model, Module} from "@types";
import {computed, ref} from "vue";
import {updateSettings} from "@components/utils/api";
import {useUtilsStore} from "@stores/utils";
import {useSettingsStore} from "@stores/settings";
import LayoutImage from "@components/layout/LayoutImage.vue";

const utilsStore = useUtilsStore()

type ModuleEditParams = {
  name: string
  commonOnly?: boolean,
  hideModel?: boolean,
  hideCategories?: boolean
  component?: unknown
}

const utilStore = useUtilsStore()
const settingsStore = useSettingsStore();

const props = defineProps<{
  dynamic?: boolean
}>()

const isFull = ref<number | null>(null)
const showConfig = ref<number | null>(null)
const showMobile = ref<number | null>(null)


const layoutCollection = defineModel<Module[][]>({default: []})

const modelCollection = computed<Model[]>(() => {
  return settingsStore.currentAppSettings?.modelCollection ?? []
});

const components: ModuleEditParams[] = [
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
    name: "SingleImage",
    component: LayoutImage,
    hideModel: true,
    hideCategories: true
  }
];

const filteredComponents = computed(() => {
  return components.filter(item => !props.dynamic || props.dynamic && !item.commonOnly)
})

const filteredComponentsParams = computed(() => {
  return filteredComponents.value.reduce((acc: Record<string, ModuleEditParams>, currentValue) => {
    acc[currentValue.name] = currentValue
    return acc
  }, {})
})

function addRow() {
  layoutCollection.value.push([{type: 'List'}]);
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
}

function openMobile(index: number) {
  showMobile.value = showMobile.value === index ? null : index
  showConfig.value = null
}
</script>

<template>
  <div class="pic-layout--main-container">
    <v-row
      v-for="(layoutLine, index) in layoutCollection"
      :key="index"
      class="pic-layout-container pic-row-container"
    >
      <v-col
        v-for="(layoutColumn, subIndex) in layoutLine"
        :key="subIndex"
        :cols="isFull === subIndex ? 12 : layoutColumn.cols"
        class="pic-layout--container pic-layout--common-module pic-module-container"
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
              <v-text-field
                :model-value="layoutColumn.cols || 0"
                class="module-type-size"
                data-testid="module-width"
                density="compact"
                label="Width"
                max="12"
                min="0"
                type="number"
                variant="underlined"
                @input="layoutColumn.cols = $event.target.value"
              />
              <v-select
                :items="filteredComponents"
                :model-value="layoutColumn.type || 'none'"
                data-testid="module-type"
                density="compact"
                item-title="name"
                item-value="name"
                label="Module"
                variant="underlined"
                @update:modelValue="changeModule($event as AvailableModules, index, subIndex)"
              />
            </div>
          </span>
          <div>
            <v-select
              v-if="!filteredComponentsParams[layoutColumn.type].hideModel"
              :items="modelCollection"
              :model-value="modelCollection.find((item: Model) => item.id === layoutColumn.model)"
              data-testid="module-model"
              density="compact"
              item-title="name"
              item-value="id"
              label="Model"
              @update:model-value="layoutColumn.model = $event as unknown as Model['id']"
            />
            <v-select
              v-if="!filteredComponentsParams[layoutColumn.type].hideCategories"
              :items="settingsStore.currentAppSettings?.categories"
              :multiple="true"
              density="compact"
              item-title="label"
              item-value="id"
              label="Categories"
              @update:model-value="layoutColumn.categories = $event as Category[]"
            />
          </div>
          <div class="mb-4 settings-buttons">
            <VBtn v-if="filteredComponentsParams[layoutColumn.type].component"
                  icon="mdi-cog"
                  @click="openConfig(subIndex)"
            />
            <VBtn
              icon="mdi-cellphone"
              @click="openMobile(subIndex)"/>
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

          <div class="text-right">
            <v-btn
              data-jest="remove-common-column"
              small="small"
              @click="deleteColumn(index, subIndex)"
            >
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </div>

          <div
            class="pic-layout--add-column"
            data-jest="add-common-column"
            data-testid="add-common-column"
            @click="layoutLine.splice(index + 1,0 , {type: 'List'})"
          >
            <v-icon>mdi-table-column-plus-after</v-icon>
          </div>
        </div>
      </v-col>
      <div
        v-if="layoutCollection.length > 1"
        class="pic-layout--add-row"
        data-jest="add-common-row-inner"
        @click="layoutCollection.splice(index + 1, 0, [] )"
      >
        <v-icon>mdi-table-row-plus-after</v-icon>
      </div>
    </v-row>
    <div
      v-if="layoutCollection.length <= 1"
      :class="{'no-row': layoutCollection.length === 0}"
      class="pic-layout--add-row"
      data-testid="add-common-row"
      @click="addRow"
    >
      <v-icon>mdi-table-row-plus-after</v-icon>
    </div>
  </div>
  <v-btn
    v-if="layoutCollection.length !== 0"
    class="ml-4 mb-4"
    color="primary"
    data-testid="save-common-layout"
    @click="saveLayout()"
  >
    Save Layout
    <v-icon>
      mdi-content-save
    </v-icon>
  </v-btn>
</template>

<style lang="postcss" scoped>
:deep(.v-row) {
  margin: 0;
}

.pic-container {
  margin-left: 0 !important;
  margin-right: 0 !important;
  position: relative;

}


.expand-icon {
  position: absolute;
  right: 10px;
  top: 0;
  padding: 0;
  min-width: 0;

  &.expanded {
    .v-icon {
      color: var(--main)
    }
  }

  .v-icon {
    font-size: .9em;
    color: #aaa;
  }
}

.pic-layout {
  &--container {
    padding: 0 var(--s) 0 var(--xxs)
  }

  &--main-container,
  &--row-container {
    position: relative;
  }

  &--add-row, &--add-column {
    transform: translate(-50%, -50%);
    background: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main);
    height: var(--l);
    width: var(--l);
    border-radius: var(--3xs);
    border: var(--main) 1px solid;
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
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.25rem;

  .v-btn {
    min-width: 48px;
  }
}
</style>
