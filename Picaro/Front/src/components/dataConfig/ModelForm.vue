<script lang="ts" setup>
import {computed, defineProps, reactive, ref, shallowRef} from "vue";
import {useRoute, useRouter} from "vue-router";
import {Category, FieldContentParams, FieldParams, Model, ModelContent, ModelContentStatus} from "@types";
import TextLine from "@components/dataConfig/fields/TextLine.vue";
import {useUtilsStore} from "@stores/utils";
import {useSettingsStore} from "@stores/settings";
import {nanoid} from "nanoid";
import {copy} from "copy-anything";
import {helpers} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {picFetch} from "@utils/api";
import ImageField from "@components/dataConfig/fields/ImageField.vue";

const route = useRoute()
const router = useRouter()
const utilsStore = useUtilsStore()
const settingsStore = useSettingsStore()
const emit = defineEmits<{
  reloadData: [],
}>()

const createdDate = computed<Date>(() => {
  return currentModelContent.value.created ? new Date(currentModelContent.value.created) : new Date()
})

const createdDateDisplay = computed<string>(() =>
    createdDate.value.toLocaleString()
)

const displayDate = ref(false)

const possibleStatus = ['published', "draft", "deleted", "archived"] satisfies ModelContentStatus[]

const componentMap = shallowRef();

import("@components/dataConfig/fields/RichText.vue").then(component => {
      componentMap.value = {
        text: TextLine,
        image: ImageField,
        richText: component.default,
        select: 'Select',
        radio: 'Radio',
        checkbox: 'CheckBox',
        booleanSwitch: 'BooleanSwitch',
        categoryFilter: 'CategoryFilter',
      }
    }
).catch(e => console.error(e))


const props = defineProps<{
  currentEditModel: Model
  categories: Category[]
  modelContent?: ModelContent
}>()

const filteredCategories = computed(() => {
  return props.categories.filter(item => !item.section)
})
const currentModelContent = ref(copy(props.modelContent) || defaultEmptyContent())

const rules = computed(() => {
  const notEmpty = helpers.withMessage("You need to select at least one category", (v: Category[]) => {
    return v.length > 0
  })
  return {
    categories: {
      notEmpty
    },
  }
})

const form = reactive({
  categories: currentModelContent.value.categories ?? [],
})

const v$ = useVuelidate(rules, form)

function defaultEmptyContent(): ModelContent {
  return {
    categories: [],
    content: props.currentEditModel.fieldCollection.map((field: FieldParams) => ({
      fieldContent: null,
      fieldParamsId: field.id,
      contentId: nanoid(6),
    })),
    status: "published",
    id: nanoid(7),
    modelId: route.params.modelId as string,
    created: null,
    updated: null
  }

}

function updateData(data: [string, FieldContentParams['fieldContent']]) {
  const [id, content] = data

  const changedItem = currentModelContent.value.content.find(item => item.fieldParamsId === id)
  if (!changedItem) {

    utilsStore.addAlert({
      type: "error",
      text: `Field with id ${id} not found`
    })
    return
  }
  changedItem.fieldContent = content
}

function setHours(event: number) {
  createdDate.value.setHours(event)
  currentModelContent.value.created = createdDate.value
}


function sendForm(newStatus ?: ModelContent['status']) {
  if (newStatus) {
    currentModelContent.value.status = newStatus;
  }
  let method: "POST" | "PUT" = "POST";

  if (props.modelContent) method = "PUT";

  if (!settingsStore.currentAppSettings) {
    utilsStore.addAlert({
      type: "error",
      text: "No app selected"
    });
    return
  }

  if (!currentModelContent.value.created) {
    currentModelContent.value.created = new Date()
  } else {
    currentModelContent.value.updated = new Date()
  }

  picFetch(
      `/api/data/${settingsStore.currentAppSettings.id}/${route.params.modelId as string}`,
      {
        method,
        body: JSON.stringify({
          ...currentModelContent.value,
          categories: form.categories,
        }),
        callback: () => {
          emit('reloadData')
          currentModelContent.value = defaultEmptyContent()
        }
      }
  )
}

</script>
<template>
  <div>
    <div v-if="componentMap" class="pic-container model-form-container" data-testid="content-form">
      <component
        :is="componentMap[field.type ?? '']"
        v-for="(field) in currentEditModel.fieldCollection"
        :key="field.id"
        :field-content="currentModelContent.content?.find((item: FieldContentParams) => item.fieldParamsId === field.id)?.fieldContent"
        :field-params="field"
        @updateData="updateData($event)"
      />
      created : {{ createdDateDisplay }}
      <VBtn variant="text" @click="displayDate = !displayDate">
        Change Date
      </VBtn>
      <VDatePicker
        v-if="displayDate"
        :model-value="createdDate"
        label="Created"
        @update:model-value="currentModelContent.created = $event"
      />
      <VTextField
        :model-value="createdDate.getHours()"
        label="Hour"
        type="number"
        @update:model-value="setHours($event as unknown as number)"
      />
      <v-select
        v-model="form.categories"
        :items="filteredCategories"
        :multiple="true"
        data-testid="select-categories"
        item-title="label"
        item-value="id"
        label="category"
      />
      <v-select v-model="currentModelContent.status" :items="possibleStatus"/>
      <div class="pic-flex pic-between">
        <v-btn :disabled="v$.$invalid" color="primary" data-testid="content-save" @click="sendForm()">
          Save
        </v-btn>
        <v-btn
          v-if="modelContent"
          color="secondary"
          @click.stop="router.push({params: {contentId: ''}})"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="modelContent"
          color="secondary"
          variant="text"
          @click.stop="sendForm('deleted')"
        >
          delete
        </v-btn>
      </div>
    </div>
  </div>
</template>
<style lang="postcss" scoped>
.model-form-container {
  max-height: calc(100vh - 130px);
  overflow: auto;
}
</style>

