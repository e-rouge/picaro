<script lang="ts" setup>
import {computed} from "vue";
import {useUserStore} from "@stores/user";
import type {Category, Layout, Settings} from "@types";

const userStore = useUserStore();
const props = defineProps<{
  currentApp: Settings
  moduleParams?: Layout
  currentModelId: string
}>()
const availableCategories = computed(() => {
  return props.currentApp.categories.filter(item => item.model === props.currentModelId || item.model === props.moduleParams?.model)
});

function changeCategory(category: Category | 'all') {
  if (category !== 'all' && category.section) {
    return
  }
  const id = typeof category === "string" ? '' : category.id

  userStore.updateFilterCollection(
      {value: [id ?? ''], target: '', method: "in"},
      "categories",
      props.moduleParams?.model ? [props.moduleParams?.model] : undefined,
  );
}

</script>

<template>
  <div>
    <a @click="changeCategory('all')">All</a>
  </div>
  <div v-for="category in availableCategories" :key="category.id">
    <component
      :is="category.section ? 'div' : 'a'"
      :class="{
        'pic-section': category.section,
        'pic-section-empty': !category.label
      }"
      @click="changeCategory(category)"
    >
      {{ category.label }}
    </component>
  </div>
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
