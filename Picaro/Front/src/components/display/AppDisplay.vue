<script lang="ts" setup>
import {computed, onMounted, watch} from "vue"
import {Filter, FilterCollection, ModelFilter, Settings} from "@types"
import Layout from "@components/layout/Layout.vue"
import {RouteParams, useRoute} from "vue-router"
import {useSettingsStore} from "@stores/settings"
import {availableModules} from "@utils/modules"
import {setCSSLink} from "@utils/helper";
import {useUserStore} from "@stores/user";
import {useWindowSize} from "@vueuse/core"
import {useUtilsStore} from "@stores/utils";
import MobileMenuLayout from "@components/layout/MobileMenuLayout.vue";

const route = useRoute()

const settingsStore = useSettingsStore()
const utilsStore = useUtilsStore()
const userStore = useUserStore()


const currentApp = computed(() => {
  return settingsStore.currentAppSettings
})

const {width} = useWindowSize()

const cssPrefix = import.meta.env.VITE_BUILD_MODE !== 'static' ? '/api' : ''

onMounted(() => {
  if (!currentApp.value?.styleSet) return;
  setCSSLink(`${cssPrefix}/css/baseStyle-${currentApp.value.styleSet}.css`)
})

watch(width, () => {
  utilsStore.isMobile = width.value < 800;
}, {immediate: true})
const appID = computed<string>(() => {
  return settingsStore.allSettings.find((app: Settings) => app.applicationName === route.params.app)?.id ?? ''
})

watch(appID, () => {
  if (appID.value) {
    settingsStore.currentAppSettings = settingsStore.allSettings.find((app: Settings) => app.id === appID.value)
  }
}, {immediate: true})


watch(route, (to) => {
  if (to?.params.globalFilters) {
    userStore.filterCollection = filterRouteToStore(to.params) as FilterCollection
  }
}, {immediate: true})

function getParams(params: string, type: string, modelIdCollection?: string[]): ModelFilter[] | Filter[] {
  return params.split("++").map(subItem => {
    // first two letters item
    const method = subItem.slice(0, 2)
    const [target, value] = subItem.slice(2).split("..")

    const valueArray = value.split('**')

    let paramObject
    if (modelIdCollection) {
      paramObject = {method, target, value: valueArray, type, modelIdCollection} as ModelFilter
    } else {
      paramObject = {method, target, value: valueArray, type} as Filter
    }
    return paramObject
  })
}

function filterRouteToStore({
                              globalFilters,
                              modelFilters,
                              globalParams,
                              modelFilterParams
                            }: RouteParams): FilterCollection | undefined {
  if (!globalFilters) return;

  const filterParams: FilterCollection = {
    all: [],
    modelFilters: []
  };
  if (globalFilters !== "~") {

    //filter type
    globalFilters = decodeURI(globalFilters.toString()).split("~");
    //filter parameters
    globalParams = decodeURI(globalParams.toString()).split("~");


    globalFilters.forEach((item, index) => {
          const params = getParams(globalParams[index], item)
          filterParams.all = filterParams.all.concat(params);
        }
    );
  }
  if (modelFilters && modelFilters !== "~") {
    const params = decodeURI(modelFilterParams.toString()).split("~");
    decodeURI(modelFilters.toString()).split("~").forEach((item, index) => {

      const [models, filters] = item.split("::");
      const modelsId = models.split("++");
      const filtersArray = filters.split("++");
      const paramsArray = params[index].split("::");
      filtersArray.forEach((subItem, subIndex) => {
        filterParams.modelFilters = filterParams.modelFilters.concat(getParams(paramsArray[subIndex], subItem, modelsId) as ModelFilter[]);
      });
    });
  }
  return filterParams;
}

function hasPadding(type: string) {
  const noPadding = ['SingleImage', 'Layout']

  return !noPadding.includes(type)
}
</script>

<template>
  <div v-if="currentApp"
       :class="{'pic-is-mobile': utilsStore.isMobile}"
       class="pic-layout--main-container pic-content-container">
    <div v-if="utilsStore.isMobile" class="d-flex justify-end">
      <VMenu transition="fade-transition">
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" variant="text"></v-btn>
        </template>
        <MobileMenuLayout :current-app="currentApp"/>
      </VMenu>
    </div>

    <div
      v-for="(layoutCommonLine, index) in currentApp.layoutCommonCollection"
      :key="index"
      class="pic-layout-container pic-row"
    >
      <template v-for="(layoutCommonColumn, subIndex) in layoutCommonLine">
        <div
          v-if="!(utilsStore.isMobile  && (layoutCommonColumn?.hideOnMobile || layoutCommonColumn?.inMobileMenu))"
          :key="`${layoutCommonColumn.type}${subIndex}`"
          :class="[
            {
              'pic-module-container': hasPadding(layoutCommonColumn.type)
            },
            `pic-col-size-${layoutCommonColumn?.cols}`,
            `pic-module-${layoutCommonColumn.type}`
          ]"
          class="pic-layout--container pic-layout--common-module pic-col"
        >
          <component
            :is="availableModules[layoutCommonColumn.type]"
            v-if="layoutCommonColumn.type !== 'Layout' &&
              layoutCommonColumn.type"
            :current-app="currentApp"
            :module-params="layoutCommonColumn"
          />
          <span v-else>
            <Layout :current-app="currentApp"/>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
:deep(.pic-col) {
  flex-shrink: 0;
}

:deep(.pic-row) {
  display: flex;
}


</style>
