<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers} from "@vuelidate/validators";
import {FieldParams} from "@types";

const emit = defineEmits(["updateData", "saveEdit", "endEdit"])
const props = defineProps<{
  fieldParams: FieldParams
  fieldContent: number
  index: number
  isEdit: boolean

}>()
const state = ref({number: 0})
state.value.number = props.fieldContent ?? 0
const formattedData = computed(() => {
  return [
    props.fieldParams.id,
    state.value.number,
  ]
})
const rules = computed(() => {
  return {
    number: [
      helpers.withMessage("this field is required", (v: number) => {
        if (!props.fieldParams.required) {
          return true;
        }
        return !!v
      })
    ]
  };
})
const v$ = useVuelidate(rules.value, state.value)

watch(() => state.value.number, async () => {
  if (await v$.value.$validate()) {
    emit("updateData", formattedData.value);
  }
})


if (props.isEdit) {
  state.value.number = props.fieldContent ?? 0;
}

</script>
<template>
  <label>
    <VNumberInput
      v-model="state.number"
      :label="fieldParams.label"
      :name="fieldParams.name"
      data-testid="text-field"
      variant="outlined"
    />
  </label>
</template>
