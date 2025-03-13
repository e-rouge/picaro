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
    id: nanoid(),
    layout: []
  });
  createdLayoutName.value = "";
  if (settingsStore.currentAppSettings) {
    updateSettings(settingsStore.currentAppSettings).catch(e => console.error(e))
  }

}

</script>

<template>
  <div v-if="selectedLayout" class="pic-layout--dynamic-module">
    <div v-if="layoutCollection && settingsStore.currentAppSettings" class="pic-container">
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
        item-title="name"
        item-value="id"
        label="Default Layout (index)"
        @update:model-value="settingsStore.currentAppSettings.defaultLayout = $event"
      />
      <v-text-field
        v-model="selectedLayout.name"
        density="compact"
        label="Layout Name"
        variant="underlined"
      />

      <v-btn v-if="!isNewLayout" @click="isNewLayout = true ">
        Create a layout
      </v-btn>
      <v-form v-else @submit.prevent="createLayout">
        <v-text-field
          v-model="createdLayoutName"
          density="compact"
          label="Layout Name"
          variant="underlined"
        />
        <v-btn type="submit">
          Save layout
        </v-btn>
        <v-btn @click="isNewLayout=false">
          Cancel
        </v-btn>
      </v-form>
    </div>
    <LayoutGridEdit v-model="selectedLayout.layout" :dynamic="true" />
  </div>
</template>

<style scoped>
.pic-container {
  margin-left: 0 !important;
  margin-right: 0 !important;
  position: relative;
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
