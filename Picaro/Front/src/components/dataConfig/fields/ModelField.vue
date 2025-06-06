<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import {nanoid} from "nanoid";
import {useVuelidate} from '@vuelidate/core'
import {MESSAGE} from "@utils/const";
import {useUtilsStore} from "@stores/utils";
import {AvailableContentType, FieldParams, Model, ModelState} from "@types";
import {helpers, required as vuelidateRequired} from "@vuelidate/validators";
import {copy} from "copy-anything";
import ModelFieldImage from "@components/dataConfig/fields/ModelFieldImage.vue";


const props = withDefaults(defineProps<{
  modelFormState?: ModelState
  existingFieldData?: FieldParams
  currentEditField?: string
  isNew?: boolean
  model: Model
}
>(), {
  modelFormState: "noModel",
  currentEditField: "",
  existingFieldData: () => ({
    id: "",
    label: "",
    name: "",
    regex: "",
    required: false,
    hidden: false,
    template: "",
    attributes: "",
    extraParams: {},
    type: null,
  }),
  isNew: false
})


const emit = defineEmits<{
  updateEditedFieldData: [FieldParams],
  addFieldData: [FieldParams],
  updateEditField: [string],
  cancelField: [],
  deleteField: []
}>()


const utilsStore = useUtilsStore()

const hidden = ref(false)


const fieldData = ref<FieldParams>(copy(props.existingFieldData))
const isFieldSelected = ref(fieldData.value.type !== null)
const savedFieldType = ref<AvailableContentType | null>(null);

const isEdited = computed(() => {
  return (props.modelFormState === 'editingField' && props.currentEditField === props.existingFieldData.id) || (props.isNew && props.modelFormState === 'addingField')
})


const fieldType = [
  {name: 'Text Input', type: 'text'},
  {name: 'Rich text', type: 'richText'},
  {name: 'Image', type: 'image'},
];

const typeParams: Record<AvailableContentType, { hideTemplate?: boolean, hideRegex?: boolean, component?: unknown }> = {
  text: {},
  richText: {
    hideTemplate: true,
    hideRegex: true
  },
  image: {
    hideTemplate: true,
    hideRegex: true,
    component: ModelFieldImage
  },
}

function addField() {
  const fieldParams: FieldParams = {
    ...fieldData.value,
    ...form,
    id: nanoid(6),
  }
  emit("addFieldData",
      fieldParams)
}

function editField() {
  emit("updateEditField", props.existingFieldData.id)
}


function deleteField() {
  utilsStore.awaitConfirmation({
    text:
        `Are you sure you want delete the field ${fieldData.value.name}?`,
    type: "warning"
  }).then(() => {
    emit("deleteField")
  }).catch((e) => {
    if (e !== MESSAGE.PROMISE_USER_CANCELLED) {
      throw new Error(e)
    }
  });
}

function cancelEdit() {
  fieldData.value = copy(props.existingFieldData)
  emit("cancelField")
}

function saveEdit() {
  emit("updateEditedFieldData", {...fieldData.value, ...form});
}


const rules = computed(() => {
  const alphaNumHyphen = helpers.withMessage("Only letters and numbers and hyphens are allowed", (v: string) => {
    return v === '' || /^[a-z0-9-]+$/.test(v)
  })
  return {
    label: {
      vuelidateRequired
    },
    name: {
      vuelidateRequired,
      alphaNumHyphen
    },
    template: {
      alphaNumHyphen
    }
  }
})

const form = reactive({
  label: props.existingFieldData?.label ?? '',
  name: props.existingFieldData?.name ?? '',
  template: props.existingFieldData?.template ?? '',
})

const v$ = useVuelidate(rules, form)

</script>
<template>
  <div
    v-if="!isEdited && !isNew"
    class="pic-model-field-summary"
    data-testid="created-model-field"
  >
    <button
      class="pic-button--text"
      data-testid="edit-model-field-button"
      @click="editField"
    >
      Edit
    </button>
    <strong>{{ fieldData.type }}</strong>

    {{ existingFieldData.name }}

    <span class="pic-sortable-handle">
      <v-icon>mdi-drag</v-icon>
    </span>
  </div>
  <template v-if="isEdited">
    <h3 data-testid="add-title">
      Add field:
    </h3>

    <v-btn
      class="mb-8"
      color="secondary"
      @click="cancelEdit"
    >
      Cancel edit
    </v-btn>
    <v-select
      v-show="!isFieldSelected"
      v-model="fieldData.type"
      :items="fieldType"
      data-testid="select-model-field"
      item-title="name"
      item-value="type"
      placeholder="select a field"
      @update:modelValue="isFieldSelected = fieldData.type !== null"
    />
    <div v-if="isFieldSelected">
      <strong>
        <span>{{ fieldData.type }}</span>
      </strong>
      <button class="pic-button--text" @click="savedFieldType = fieldData.type; isFieldSelected = false">
        Change
      </button>
    </div>
    <span v-if="isFieldSelected" data-testid="edit-field-selected">
      <v-text-field
        v-model="form.label"
        :validation="v$.label"
        aria-required="true"
        data-testid="field-label"
        label="Label *"
      />
      <v-text-field
        v-model="form.name"
        :validation="v$.name"
        aria-required="true"
        data-testid="field-name"
        label="Name *"
      />
      <v-text-field
        v-if="fieldData.type && !typeParams[fieldData.type]?.hideTemplate"
        v-model="form.template"
        :validation="v$.template"
        label="template (or HTML tag)"
      />

      <v-text-field
        v-model.trim="fieldData.attributes"
        label="Attributes"
      />

      <v-checkbox
        v-model="fieldData.required"
        label="required"
        type="checkbox"
      />
      <v-checkbox
        v-model="hidden"
        label="hidden"
        type="checkbox"
      />
      <v-text-field
        v-if="fieldData.type && !typeParams[fieldData.type]?.hideRegex"
        v-model="fieldData.regex"
        label="Regex"
      />
      <component
        :is="typeParams[fieldData.type].component"
        v-if="fieldData.type && typeParams[fieldData.type]?.component"
        :extraParams="fieldData.extraParams"
        @updateParams="fieldData.extraParams = $event"
      />
      <v-btn
        v-if="modelFormState === 'editingField'"
        :disabled="v$.$invalid"
        data-testid="save-model-field-button"
        @click="saveEdit"
      >
        Save
      </v-btn>
      <div class="pic-flex pic-between">
        <v-btn
          v-if="modelFormState === 'addingField'"
          :disabled="v$.$invalid"
          color="primary"
          data-testid="add-field-button"
          @click="addField"
        >
          Add field to model
        </v-btn>


        <v-btn
          v-if="modelFormState === 'editingField'"
          class="pic-button--text"
          data-testid="delete-model-field-button"
          @click="deleteField"
        >
          delete
        </v-btn>
      </div>
    </span>
  </template>
</template>
<style scoped>

</style>
