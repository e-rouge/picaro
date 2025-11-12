<script lang="ts" setup>
import {computed, defineEmits, defineProps, ref, watch} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers} from "@vuelidate/validators";
import {FieldParams} from "@types";

const emit = defineEmits(["updateData", "saveEdit", "endEdit"])
const props = defineProps<{
  fieldParams: FieldParams
  fieldContent: string
  index: number
  isEdit: boolean

}>()
const state = ref({text: ""})
state.value.text = props.fieldContent ?? ''
const formattedData = computed(() => {
  return [
    props.fieldParams.id,
    state.value.text,
  ]
})
const rules = computed(() => {
  return {
    text: [
      helpers.withMessage("this field is required", (v: string) => {
        if (!props.fieldParams.required) {
          return true;
        }
        return !!v
      })
    ]
  };
})
const v$ = useVuelidate(rules.value, state.value)

watch(() => state.value.text, async () => {
  if (await v$.value.$validate()) {
    emit("updateData", formattedData.value);
  }
})


if (props.isEdit) {
  state.value.text = props.fieldContent ?? "";
}

</script>
<template>
  <label>
    <VTextField
      v-model="state.text"
      :label="fieldParams.label"
      :name="fieldParams.name"
      data-testid="text-field"
      variant="outlined"
    />
  </label>
</template>
