<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useSettingsStore} from '@stores/settings'
import {Model, ModelState} from '@types'
import {useRoute, useRouter} from "vue-router";
import {nanoid} from "nanoid";
import {useUtilsStore} from "@stores/utils";


defineEmits(['reloadSettings'])

const settingsStore = useSettingsStore()
const utilsStore = useUtilsStore()
const router = useRouter()
const route = useRoute()

const modelFormState = ref<ModelState>("noModel");
const currentEditModel = ref<Model>();
const modelNameInput = ref('');
const asideHidden = ref(false)


const modelCollection = computed((): Model[] | [] => {
  return settingsStore.currentAppSettings?.modelCollection || []
})

const currentEditModelName = computed((): string => {
  return currentEditModel.value?.name || ""
})
const modelNameIsUnique = computed(() => {
  return (
      Object.keys(modelCollection).filter(
          item => item === modelNameInput.value
      ).length === 0
  );
})


async function selectModel(model: Model, content?: boolean) {
  if (settingsStore.currentAppSettings) {
    await router.push({path: `/admin/data/${settingsStore.currentAppSettings.id}/${model.id}${content ? '/content' : ''}`})
  } else {
    utilsStore.addAlert({
      text: "Please select an app first",
      type: "warning"
    });
  }
}

const currentAppModelCollection = computed((): Model[] | [] => {
  return settingsStore.currentAppSettings?.modelCollection || []
})

function createNewModel() {
  modelFormState.value = "modelSelected";
  modelNameInput.value = modelNameInput.value.toLowerCase()

  currentEditModel.value = {
    id: nanoid(7),
    name: modelNameInput.value,
    fieldCollection: []
  }

}

async function cancelEditModel() {
  modelFormState.value = 'noModel';
  currentEditModel.value = undefined;
  modelNameInput.value = '';
  if (settingsStore.currentAppSettings) {
    await router.push({name: 'data'})
  } else {
    utilsStore.addAlert({
      text: "Please select an app first",
      type: "warning"
    });
  }
}

function modelFromRoute() {
  if (route.params.modelId === 'newModel') {
    modelFormState.value = "awaitingName"
    return
  }
  currentEditModel.value = settingsStore.currentAppSettings?.modelCollection.find(model => {
    return route.params.modelId && model.id === route.params.modelId
  })

  if (currentEditModel.value) {
    modelFormState.value = "modelSelected";
  } else {
    modelFormState.value = "noModel"
  }
}

async function newModelForm() {
  await cancelEditModel()
  await router.replace({name: 'data-model', params: {appId: route.params.appId, modelId: 'newModel'}});
  currentEditModel.value = undefined;
  modelFormState.value = 'awaitingName';
}

watch(() => route.params.modelId, (newVal) => {
  if (newVal) {
    modelFromRoute()
  }
}, {immediate: true})


</script>

<template>
  <VBtn class="pic-aside--hide-btn" variant="text" @click="asideHidden = !asideHidden">
    <VIcon>{{ `mdi-arrow-expand-${asideHidden ? "right" : "left"}` }}</VIcon>
  </VBtn>

  <div class="pic-flex">
    <aside :class="{hidden: asideHidden}" class="pic-aside pic-container" data-testid="model list">
      <h3>
        Model List
      </h3>

      <div v-for="model in currentAppModelCollection" :key="model.id" class="current-model-elements">
        <a :class="{selected: model.id === route.params.modelId}" class="pic-aside-item" @click="selectModel(model)">
          {{ model.name }}
        </a>
        <a class="content-link" @click="selectModel(model, true)">
          content
        </a>
      </div>
      <VBtn
        color="primary"
        data-testid="new-model-button"
        @click="newModelForm"
      >
        New Model
      </VBtn>
    </aside>
    <main :class="{'pic-main-empty': modelFormState === 'noModel'}" class="pic-main pic-container">
      <div v-if="modelFormState === 'awaitingName'" class="pic-new-model">
        <VTextField
          v-model="modelNameInput"
          data-testid="create-model-name-input"
          label="New model name"
          variant="outlined"
        />
        <VBtn
          v-if="!currentEditModelName"
          :disabled="!modelNameInput || !modelNameIsUnique"
          color="primary"
          data-testid="start-model-edit-button"
          @click="createNewModel"
        >
          Next
        </VBtn>
      </div>
      <div
        v-if="currentEditModel"
        data-testid="model-is-edited"
      >
        <router-view
          :key="currentEditModel.id"
          :current-edit-model="currentEditModel"
          :model-collection="modelCollection"
          :model-form-state="modelFormState"
          @cancelEditModel="cancelEditModel()"
          @updateModelFormState="modelFormState = $event"
        />
      </div>
    </main>
  </div>
</template>
<style lang="postcss" scoped>
.content-link {
  margin-left: var(--s) !important;
  display: inline-block;
  color: var(--secondaryDark) !important;
  background: var(--bgDark);
}

.pic-aside-item {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
