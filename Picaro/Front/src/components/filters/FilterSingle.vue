<script lang="ts" setup>
import type {FilterParams, Layout, Settings} from "@types";
import {useUserStore} from "@stores/user";
import DisplayList from "@components/display/DisplayList.vue";

const userStore = useUserStore();

const props = defineProps<{
  currentApp: Settings
  moduleParams: Layout
  currentModelId: string
}>()


function selectTitle(clickedField: { name: string, id: string }) {
  if (clickedField.name !== 'title') {
    return
  }
  userStore.updateFilterCollection(
      {value: [clickedField.id], target: 'id', method: "eq"} as FilterParams,
      "full",
      props.moduleParams?.model ? [props.moduleParams?.model] : undefined,
  );

}

</script>

<template>
  <DisplayList
    :current-app="currentApp"
    :display-all="true"
    :field-selection="['title']"
    :module-params="moduleParams"
    @clickField="selectTitle"
  />
</template>
<style scoped>
a {
  cursor: pointer;
}

.pic-section {
  font-family: var(--font-alt);
  margin: 1rem 0;
  border-bottom: 1px solid;
}
</style>

