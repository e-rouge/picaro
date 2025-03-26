<script lang="ts" setup>
import type {AvailableModules, AvailableModulesComponentList, Category, Layout, Model} from "@types";
import {computed} from "vue";
import {updateSettings} from "@components/utils/api";
import {useUtilsStore} from "@stores/utils";
import {useSettingsStore} from "@stores/settings";

const utilStore = useUtilsStore()
const settingsStore = useSettingsStore();

const props = defineProps<{
  dynamic?: boolean
}>()


const layoutCollection = defineModel<Layout[][]>({default: []})

const modelCollection = computed<Model[]>(() => {
  return settingsStore.currentAppSettings?.modelCollection ?? []
});

const components: Partial<AvailableModulesComponentList> = {
  /*
  FilterLayout: "FilterLayout",
  FilterLink: "FilterLink",
  */
  List: "List",
  FilterCategories: "FilterCategories",
  Preview: "Preview",
  FilterSingle: "FilterSingle"
};

if (!props.dynamic) {
  components.Layout = "Layout"
  components.FilterLayoutSelect = "FilterLayoutSelect"
}

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
    await updateSettings(settingsStore.currentAppSettings)
  }
}

</script>

<template>
  <div class="pic-layout--main-container">
    <v-row
      v-for="(layoutCommonLine, index) in layoutCollection"
      :key="index"
      class="pic-layout-container pic-row-container"
    >
      <v-col
        v-for="(layoutCommonColumn, subIndex) in layoutCommonLine"
        :key="subIndex"
        :cols="layoutCommonColumn.cols"
        class="pic-layout--container pic-layout--common-module pic-module-container"
      >
        <div :class="`pic-container-width-${layoutCommonColumn.cols}`" class="pic-container">
          <span
            class="pic-layout-settings"
          >
            <div class="module-type">
              <v-text-field
                :model-value="layoutCommonColumn.cols || 0"
                class="module-type-size"
                data-testid="module-width"
                density="compact"
                label="Width"
                max="12"
                min="0"
                type="number"
                variant="underlined"
                @input="layoutCommonColumn.cols = $event.target.value"
              />
              <v-select
                :items="Object.keys(components)"
                :model-value="layoutCommonColumn.type || 'none'"
                data-testid="module-type"
                density="compact"
                label="Module"
                variant="underlined"
                @update:modelValue="changeModule($event as AvailableModules, index, subIndex)"
              />
            </div>
          </span>
          <component
            :is="components[layoutCommonColumn.type]"
            v-if="layoutCommonColumn.type && typeof components[layoutCommonColumn.type] !== 'string'"
          />

          <div v-else>
            <v-select
              :items="modelCollection"
              :model-value="modelCollection.find((item: Model) => item.id === layoutCommonColumn.model)"
              data-testid="module-model"
              density="compact"
              item-title="name"
              item-value="id"
              label="Model"
              @update:model-value="layoutCommonColumn.model = $event as unknown as Model['id']"
            />
            <v-select
              :items="settingsStore.currentAppSettings?.categories"
              :multiple="true"
              density="compact"
              item-title="label"
              item-value="id"
              label="Categories"
              @update:model-value="layoutCommonColumn.categories = $event as Category[]"
            />
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
            @click="layoutCommonLine.splice(index + 1,0 , {type: 'List'})"
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

  &-width-1 {
    padding: 2rem 5px !important;
    min-width: 110px;
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
</style>
