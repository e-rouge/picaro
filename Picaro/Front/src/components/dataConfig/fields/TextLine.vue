<script lang="ts" setup>
import {computed, defineEmits, defineProps, ref, watch} from "vue";
import {useVuelidate} from "@vuelidate/core";
import {helpers} from "@vuelidate/validators";

const emit = defineEmits(["updateData", "saveEdit", "endEdit"])
const props = defineProps({
  fieldParams: {type: Object, required: true},
  fieldContent: {type: Object, required: true},
  index: {type: Number, required: true},
  isEdit: {type: Boolean, default: false}
})
const state = ref({text: ""})
state.value.text = props.fieldContent?.content ?? ''
const formattedData = computed(() => {
  return [
    props.fieldParams.id,
    state.value.text,
  ]
})
const rules = computed(() => {
  return {
    text: [
      helpers.withMessage("this is not the correct pattern", (v: string) => {
        if (!props.fieldParams.regex) {
          return true;
        }
        const regex = new RegExp(props.fieldParams.regex);
        return regex.test(v)
      }),
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
  state.value.text = props.fieldContent?.content ?? "";
}

</script>
<template>
  <label>
    <VTextField v-model="state.text" :label="fieldParams.label" :name="fieldParams.name" data-testid="text-field" />
  </label>
</template>
