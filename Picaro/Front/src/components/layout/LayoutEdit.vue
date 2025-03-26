<script lang="ts" setup>
import {computed, ref} from "vue";
import {useSettingsStore} from "@stores/settings";
import {nanoid} from "nanoid";
import {LayoutCollection} from "@types";
import LayoutGridEdit from "@components/layout/LayoutGridEdit.vue";
import {updateSettings} from "@components/utils/api";

const settingsStore = useSettingsStore();

const selectedEditLayout = ref(settingsStore.currentAppSettings?.defaultLayout);
const isNewLayout = ref(false)

const layoutCollection = computed<LayoutCollection[]>(() => {
  return settingsStore.currentAppSettings?.layoutCollection ?? []
});
const defaultLayout = computed(() => {
  return settingsStore.currentAppSettings?.defaultLayout
})

const createdLayoutName = ref('')

const selectedLayout = computed(() => {
  const id = selectedEditLayout.value
  return settingsStore.currentAppSettings?.layoutCollection.find(item => {
    return item.id === id
  });
});

function createLayout() {
  if (!createdLayoutName.value) {
    return false
  }
  layoutCollection.value?.push({
    name: createdLayoutName.value,
    id: nanoid(4),
    layout: [],
    order: 0
  });
  createdLayoutName.value = "";
  if (settingsStore.currentAppSettings) {
    updateSettings(settingsStore.currentAppSettings).catch(e => console.error(e))
  }
}

async function saveLayout() {
  if (settingsStore.currentAppSettings) {
    await updateSettings(settingsStore.currentAppSettings)
  }
}

</script>

<template>
  <div v-if="selectedLayout" class="pic-layout--dynamic-module">
    <div
      v-if="layoutCollection && settingsStore.currentAppSettings"
      class="pic-container pic-container-layout-settings"
    >
      <template v-if="!isNewLayout">
        <div class="layout-selector-container">
          <v-select
            v-if="layoutCollection?.length > 0"
            v-model="selectedEditLayout"
            :items="layoutCollection"
            item-title="name"
            item-value="id"
            label="Choose a Layout to edit"
          />
          <v-select
            v-if="layoutCollection.length > 0"
            v-model="defaultLayout"
            :items="layoutCollection"
            class="default-layout"
            item-title="name"
            item-value="id"
            label="Default Layout (index)"
            @update:model-value="settingsStore.currentAppSettings.defaultLayout = $event"
          />
          <VTextField
            v-model="selectedLayout.order"
            class="order ml-4"
            label="order"
            type="number"
          />
        </div>

        <v-text-field
          v-model="selectedLayout.name"
          density="compact"
          label="Layout Name"
          variant="underlined"
        />
      </template>


      <div v-if="!isNewLayout" class="layout-controls">
        <v-btn @click="isNewLayout = true">
          New layout
        </v-btn>
        <v-btn
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
      </div>

      <v-form v-else @submit.prevent="createLayout">
        <v-text-field
          v-model="createdLayoutName"
          density="compact"
          label="Layout Name"
          variant="underlined"
        />
        <div class="layout-controls">
          <v-btn color="secondary" @click="isNewLayout=false">
            Cancel
          </v-btn>
          <v-btn color="primary" type="submit">
            Create layout
          </v-btn>
        </div>
      </v-form>
    </div>
    <LayoutGridEdit v-if="!isNewLayout" v-model="selectedLayout.layout" :dynamic="true" />
  </div>
</template>

<style scoped>
.order {
  flex: 0 0 100px !important;
}

.layout-controls {
  display: flex;
  justify-content: space-between;
}

.pic-container {
  margin-left: 0 !important;
  margin-right: 0 !important;
  position: relative;

  &-layout-settings {
    margin: var(--s) !important;
    background: var(--bgLight) !important;
    border-color: var(--main) !important;

    .layout-selector-container {
      display: flex;
    }

    .default-layout {
      border-top: var(--main) 1px solid;
    }

    .v-select {
      &:last-of-type {
        margin-left: var(--m);
      }

      display: inline-block;
    }
  }
}

.pic-layout {

  &--container {
    padding: 0 var(--l) 0 var(--s)
  }

  &--dynamic-module {
    background: var(--white);
  }

  &--module {
    border: var(--main) var(--4xs) solid;
    border-radius: var(--3xs);
    position: relative;
    padding: var(--m);
    margin: var(--s);
  }

  &--main-container,
  &--row-container {
    position: relative;
  }

  &--add-row, &--add-column {
    transform: translateY(-50%);
    background: var(--main);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
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
    bottom: 15px;
    right: 50%;
    transform: translateX(-50%);
  }

  &--add-column {
    right: -20px;
    top: 50%;
  }
}

.module-type {
  &-size {
    max-width: 40px;
    margin-right: 1rem;
  }

  display: flex;
  margin-top: -.5rem;
}
</style>
