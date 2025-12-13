<script lang="ts" setup>
import {ref} from "vue";

const emit = defineEmits<{
  (emit: 'update', value: string): void
}>()

const props = defineProps<{
  value: string
  onSave?: (value: string) => void
}>()

const editedValue = ref(props.value)

const isEditing = ref(false)

function cancel() {
  isEditing.value = false
  editedValue.value = props.value
}
</script>

<template>
  <div class="pic-editable-container pic-flex">
    <v-text-field
      v-if="isEditing"
      v-model="editedValue"
      :hide-details="true"
      data-testid="edit-name-input"
      variant="outlined"/>
    <slot v-else/>
    <div>
      <VIcon v-if="!isEditing" class="edit-icon" data-testid="edit-name" @click="isEditing = !isEditing">
        mdi-pencil
      </VIcon>
      <span v-else>
        <v-icon data-testid="edit-name-save" @click="emit('update', editedValue);isEditing = false">
          mdi-check
        </v-icon>
        <v-icon @click="cancel">
          mdi-close
        </v-icon>
      </span>
    </div>
  </div>
</template>

<style scoped>
.edit-icon {
  margin-bottom: var(--l);
  margin-left: var(--s);
  font-size: 16px;
}
</style>
