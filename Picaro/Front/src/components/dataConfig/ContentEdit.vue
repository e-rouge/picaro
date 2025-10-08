<script lang="ts" setup>
import ModelForm from "./ModelForm.vue"
import {computed, defineEmits, defineProps, ref} from "vue";
import {Category, Model, ModelContent, Settings} from "@types";
import DisplayList from "@components/display/DisplayList.vue";
import FilterCategories from "@components/filters/FilterCategories.vue";
import {useSettingsStore} from "@stores/settings";
import {useRouter} from "vue-router";
import {nanoid} from "nanoid";
import {useUtilsStore} from "@stores/utils";
import {updateSettings} from "@components/utils/api";
import draggable from "vuedraggable";
import ImageUpload from "@components/ImageUpload.vue";

defineEmits(["updateModelFormState", "cancelEditModel"])

const props = defineProps<{
  currentEditModel: Model
}>()

const selectedStatus = ref<ModelContent['status']>('published')

const possibleStatus: ModelContent['status'][] = ['published', "draft", "archived", 'deleted']

const settingsStore = useSettingsStore();
const utilsStore = useUtilsStore();

const router = useRouter()

const dataReloaded = ref(false)


const categories = computed<Category[]>(() => settingsStore.currentAppSettings?.categories.filter(item => item.model === props.currentEditModel.id) || [])

const newCategory = ref('')
const editCategories = ref(false)

function editItem(item: number) {

  router.push({params: {contentId: item}}).catch(e => console.error(e))
  newCategory.value = ''
}

function addCategory() {
  settingsStore.currentAppSettings?.categories.push({
    label: newCategory.value,
    id: nanoid(6),
    model: props.currentEditModel.id
  })
  newCategory.value = ''
}

function cancelEdit() {
  window.location.reload()
}

function deleteCategory(index: number) {
  utilsStore.awaitConfirmation({
    text: "Are you sure you want to delete this category?",
    type: "warning"
  }).then(() => {
    settingsStore.currentAppSettings?.categories.splice(index, 1)
  }).catch((error) => console.error(error))
}

async function saveCategory() {
  await updateSettings(settingsStore.currentAppSettings as Settings)
  editCategories.value = false
}

</script>
<template>
  <v-row>
    <v-col :cols="3">
      <v-btn
        v-if="!editCategories"
        color="secondary"
        data-testid="edit-categories"
        variant="text"
        @click="editCategories = !editCategories"
      >
        Edit categories
      </v-btn>
      <v-btn
        v-else
        color="secondary"
        variant="text"
        @click="cancelEdit()"
      >
        Cancel
      </v-btn>
      <div class="v-label">
        Existing categories :
      </div>
      <FilterCategories
        v-if="settingsStore.currentAppSettings && !editCategories"
        :current-app="settingsStore.currentAppSettings"
        :current-model-id="currentEditModel.id"
      />
      <div v-else-if="settingsStore.currentAppSettings">
        <draggable
          v-model="settingsStore.currentAppSettings.categories"
          ghost-class="pic-sortable-ghost"
          handle=".pic-sortable-handle"
          item-key="id"
        >
          <template #item="{element,index}">
            <div v-if="element.model === currentEditModel.id">
              <v-checkbox
                v-model="element.section"
                data-testid="separator-check"
                density="compact"
                hide-details
                label="Separator (non-clickable)"
              />

              <div class="pic-flex">
                <span class="pic-sortable-handle pic-sortable-handle__category">
                  <v-icon>mdi-drag</v-icon>
                </span>
                <v-text-field
                  :key="element.id"
                  v-model="element.label"
                  append-icon="mdi-delete"
                  @click:append="deleteCategory(index)"
                />
              </div>
            </div>
          </template>
        </draggable>

        <v-text-field v-model="newCategory" data-testid="new-category-input" label="New category"/>
        <v-btn data-testid="new-category-add" @click="addCategory">
          Add category
        </v-btn>
        <br>
        <v-btn class="mt-4" color="primary" data-testid="new-category-save" @click="saveCategory()">
          Save
        </v-btn>
      </div>
    </v-col>
    <v-col>
      <div
        v-if="categories.length === 0"
        data-testid="category-warning"
      >
        <p>You must add a category first</p>
      </div>

      <template v-else>
        <div
          class="v-label"
          data-testid="new-content"
        >
          New content :
        </div>
        <ModelForm
          :categories="categories"
          :current-edit-model="currentEditModel"
          data-testid="new-content-form"
          @reloadData="dataReloaded = !dataReloaded"
        />
        <div class="v-label mt-4">
          Edit existing content :
        </div>
        <div>
          <v-btn
            v-for="status in possibleStatus"
            :key="status"
            :color="status === selectedStatus ? 'primary' : ''"
            variant="text"
            @click="selectedStatus = status"
          >
            {{ status }}
          </v-btn>
        </div>
        <display-list
          v-if="settingsStore.currentAppSettings"
          :categories="categories"
          :current-app="settingsStore.currentAppSettings"
          :data-reloaded="dataReloaded"
          :display-all="true"
          :display-status="selectedStatus"
          :module-params="{model: currentEditModel.id, categories: [], type: 'List'}"
          class="pic-display-edit"
          data-testid="content-list"
          @clickItem="editItem($event)"
        />
      </template>
    </v-col>
  </v-row>
  <ImageUpload/>
</template>

<style scoped>

</style>
