<script lang="ts" setup>
import {useSettingsStore} from "@stores/settings";
import {computed, ref} from "vue";
import {nanoid} from "nanoid";
import {useUtilsStore} from "@stores/utils";
import {useUserStore} from "@stores/user";

const userStore = useUserStore()

const isEdit = ref(true)
const form = ref()
const currentAddedItem = ref('')
const categoryEditIndex = ref<number | null>(null)
const rules = [
  (value: string) => !availableCategories.value.find(item => item.label === value) || 'This category already exists',
  (value: string) => !!value
]


const settingsStore = useSettingsStore()
const utilStore = useUtilsStore()
const availableCategories = computed(() => {
  return settingsStore.currentAppSettings?.categories ?? []
})

function changeCategory(id: string) {
  userStore.updateFilterCollection({
    type: "categories",
    filterParams: {value: [id], field: "categories", method: "in"},
    models: []
  });
}

async function addItem() {
  if (!settingsStore.currentAppSettings) return
  const {valid} = await form.value.validate()
  if (!valid) return
  if (!settingsStore.currentAppSettings?.categories) settingsStore.currentAppSettings.categories = []
  settingsStore.currentAppSettings.categories.push({label: currentAddedItem.value, id: nanoid()})
  currentAddedItem.value = ''
}

function addSection() {
  if (!settingsStore.currentAppSettings) return
  if (!settingsStore.currentAppSettings?.categories) settingsStore.currentAppSettings.categories = []
  settingsStore.currentAppSettings.categories.push({label: currentAddedItem.value, id: "section"})
  currentAddedItem.value = ''
}


function deleteCategory(index: number, category: string) {
  utilStore.awaitConfirmation({
    text:
        `Are you sure you want to delete the category ${category} ?`,
    type: "warning"
  }).then(() => {
    availableCategories.value.splice(index, 1)
  }).catch((error) => console.error(error))
}

</script>
<template>
  <div class="pic-filter-categories">
    <div
      v-for="(category, index) in availableCategories"
      :key="index"
      class="pic-filter-categories--item"
    >
      <v-text-field
        v-if="index === categoryEditIndex"
        v-model="category.label"
        @keydown.enter="categoryEditIndex=null"
      />
      <component
        :is="category.id === 'section' ? 'span' : 'a'"
        v-else
        :class="{
          'pic-section': category.id === 'section',
          'pic-section-empty': !category.label
        }"
        class="pic-filter-categories--link"
        @click="changeCategory(category.id)"
      >
        {{ category.label }}
      </component>
      <v-icon @click="categoryEditIndex = index">
        mdi-pencil-outline
      </v-icon>
      <v-icon @click="deleteCategory(index, category.label)">
        mdi-delete-outline
      </v-icon>
    </div>
    <v-form ref="form" validate-on="input" @submit.prevent="addItem">
      <v-text-field v-if="isEdit" v-model="currentAddedItem" :rules="rules" />
    </v-form>
    <v-btn variant="text" @click="addSection">
      Add section
    </v-btn>
  </div>
</template>
<style lang="postcss" scoped>
.pic-section-empty {
  border: 3px solid;
  display: block;
}
</style>
