<script lang="ts" setup>
import {applyFilter} from '@components/utils/filter'
import ModelField from "@components/dataConfig/ModelField.vue"
import {computed, ref, toValue, watch} from "vue";
import {useRoute} from "vue-router";
import ModelForm from "@components/dataConfig/ModelForm.vue";
import {Category, Model, ModelContent, Module, Settings} from "@types";
import {useDataStore} from "@stores/data";
import {useSettingsStore} from "@stores/settings";
import {picFetch} from "@utils/api";
import {useUserStore} from "@stores/user";

const settings = useSettingsStore()
const userStore = useUserStore()

const route = useRoute();
const dataStore = useDataStore()


const emit = defineEmits<{
  clickItem: [index: number]
  clickItemContent: [id: string]
  clickField: [{ name: string, id: string }]
}>()

const categories: Category[] = settings.currentAppSettings?.categories || []


const props = defineProps<{
  moduleParams: Module
  displayAll?: boolean
  currentApp: Settings
  dataReloaded?: boolean
  displayStatus?: ModelContent['status']
  fieldSelection?: string[]
}>()


const content = import.meta.env.VITE_BUILD_MODE === "static" ? {
  data: ref(),
  refresh: () => {
    return;
  }
} : getData()

if (import.meta.env.VITE_BUILD_MODE === "static") {
  getStaticData()
}

watch(() => props.dataReloaded, () => {
  if (content) {
    content.refresh()
  }
})

watch(() => content?.data, () => {
  dataStore.currentModelData = content?.data.value
})

const filteredList = computed<ModelContent[]>(() => {
  const fetchData = toValue(content?.data) ?? []
  if (props.displayAll) {
    return fetchData.filter((item: ModelContent) =>
        (!props.displayStatus && (item.status === 'published')) ||
        (props.displayStatus && item.status === props.displayStatus)
    )
  } else {
    return fetchData.filter((item: ModelContent) => {
      return item.status === "published"
          && applyFilter(
              item,
              userStore.filterCollection,
              props.moduleParams
          );
    })
  }

})

const currentModel = computed(() => {
  return props.currentApp.modelCollection.find(
      (item: Model) => item.id === props.moduleParams.model
  )
})

function getStaticData() {
  if (!content) return
  import(`./../../../../Data/build/${props.currentApp.id}.json`)
      .then(data => {
        content.data.value = data.default.filter((item: ModelContent) =>
            item.modelId === props.moduleParams.model
        )
      })
      .catch(e => console.error(e))
}

function getData() {
  return picFetch<ModelContent[]>(`/api/data/${props.currentApp.id}/${props.moduleParams.model}`)
}


</script>
<template>
  <div data-testid="content-list">
    <div
      v-for="(fieldList, index) in filteredList"
      :key="index"
      @click="emit('clickItem', index)"
    >
      <div
        v-if="index !== parseInt(route.params.contentId as string) && currentModel"
        class="pic-display-list-item"
        data-testid="list-display"
        @click="emit('clickItemContent', fieldList.id)"
      >
        <model-field
          v-for="(field, subIndex) in fieldList.content"
          :key="subIndex"
          :current-model="currentModel"
          :field-content="field"
          :field-selection="fieldSelection"
          :module-params="moduleParams"
          data-testid="content-display"
          @clickFieldName="emit('clickField', {name: $event, id: fieldList.id})"
        />
      </div>

      <ModelForm
        v-else-if="currentModel"
        :categories="categories"
        :current-edit-model="currentModel"
        :model-content="fieldList"
        data-testid="content-edit"
        @reloadData="content?.refresh()"
      />
    </div>
  </div>
</template>
