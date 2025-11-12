<script lang="ts" setup>
import {computed, reactive, ref, watch} from "vue";
import {useSettingsStore} from '@stores/settings'
import {useUtilsStore} from "@stores/utils";
import {helpers, required} from "@vuelidate/validators";
import {useRoute, useRouter} from "vue-router";
import {updateSettings} from "./utils/api";
import {MESSAGE} from "@utils/const";
import {copy} from "copy-anything"
import {useVuelidate} from '@vuelidate/core'
import {picFetch} from "@utils/api";

const utilStore = useUtilsStore()
const settingsStore = useSettingsStore()
const appFormState = ref<'newApp' | 'selectedApp' | "noApp">('noApp')
const newAppName = ref('')
const router = useRouter()
const route = useRoute()

const emit = defineEmits<{
  reloadSettings: []
}>()

const settings = computed(() => {
  return settingsStore.allSettings
})
const currentSettings = computed(() => {
  return copy(settingsStore.currentAppSettings)
})

async function newAppForm() {
  await router.push({name: 'newApp'})
  settingsStore.currentAppSettings = undefined
}

watch(() => settingsStore.currentAppSettings, () => {
  if (settingsStore.currentAppSettings) {
    appFormState.value = 'selectedApp'
  }
}, {immediate: true})

watch(() => route.name, () => {
  if (route.name === 'newApp') {
    appFormState.value = 'newApp'
  } else if (route.name === 'app') {

  }
}, {immediate: true})

function createApp() {
  const response = picFetch<{ appCreatedId: string }>(`/api/setup/create/${newAppName.value}`,
      {
        method: 'POST',
        callback: () => {
          emit('reloadSettings')
        }
      }
  )
  if (response) {
    watch(response.data, () => {
      if (response.data.value) {
        router.push({name: 'app', params: {appId: response.data.value.appCreatedId}})
            .catch((error) => console.error(error))
      }
    })
  }
}

function deleteApp() {
  utilStore.awaitConfirmation({
    text:
        "Are you sure you want to delete the app ?",
    type: "warning"
  }).then(() => {
    fetch(`/api/setup/delete/${currentSettings.value?.id}`,
        {
          method: 'DELETE',
        }
    ).then(async () => {
      await router.push({name: 'app'})
      emit('reloadSettings')
    }).catch((error) => console.error(error))
  }).catch((e) => {
    if (e !== MESSAGE.PROMISE_USER_CANCELLED) {
      throw new Error(e)
    }
  });
}

async function updateApp() {
  if (currentSettings.value && settingsStore.currentAppSettings) {
    await updateSettings(currentSettings.value, settingsStore.currentAppSettings.applicationName)
    emit('reloadSettings')
  }
}

const rules = computed(() => {
  const alpha = helpers.withMessage("Only lowercase letters without spaces are allowed", (v: string) => {
    return v === '' || /^[a-z]+$/.test(v)
  })
  return {
    title: {
      required
    },
    applicationName: {
      required,
      alpha
    },
  }
})

const form = reactive({
  title: currentSettings.value?.title ?? '',
  applicationName: currentSettings.value?.applicationName ?? '',
})

watch(form, () => {
  if (currentSettings.value) {
    currentSettings.value.title = form.title
    currentSettings.value.applicationName = form.applicationName
  }
})

watch(currentSettings, () => {
  if (currentSettings.value) {
    form.title = currentSettings.value.title
    form.applicationName = currentSettings.value.applicationName
  }
})


const v$ = useVuelidate(rules, form)


</script>

<template>
  <div v-if="appFormState === 'noApp'" class="pic-container">
    <VRow>
      <h2>
        Select or create an application
      </h2>
    </VRow>
    <VRow>
      <VCol v-for="app in settings" :key="app.applicationName">
        <VCard
          :title="app.applicationName"
          :to="{name: 'app', params: {appId: app.id}}"
          color="primary"
          data-testid="app-button"
          height="100"
        />
      </VCol>
      <VCol>
        <VCard :to="{name: 'newApp'}" color="grey" height="100">
          <VCardTitle>
            New App
          </VCardTitle>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <template v-else>
    <div
      class="pic-flex"
      data-testid="app-title"
    >
      <aside class="pic-container pic-aside" data-testid="app list">
        <h3>
          App List
        </h3>

        <div v-for="app in settings" :key="app.id">
          <router-link
            :class="{selected: app.id === currentSettings?.id}"
            :to="{name: 'app', params: {appId: app.id}}"
            class="pic-aside-menu--link"
          >
            {{ app.applicationName }}
          </router-link>
        </div>

        <v-btn color="primary" @click="newAppForm">
          New App
        </v-btn>
      </aside>
      <main class="pic-container">
        <template v-if="currentSettings && appFormState === 'selectedApp'">
          <h3 data-testid="app-title-selected">
            {{ currentSettings.applicationName }}
          </h3>
          <v-text-field
            v-model="form.title"
            :validation="v$.title"
            data-testid="title"
            label="Title"
            variant="outlined"
          />
          <v-text-field
            v-model="form.applicationName"
            :validation="v$.applicationName"
            data-testid="app name"
            label="Application name"
            variant="outlined"
          />
          <v-text-field
            v-model="currentSettings.messageTimeOut"
            :validation="v$.messageTimeOut"
            label="Message Timeout"
            variant="outlined"
          />
          <v-select
            :items="settingsStore.allStyleSets"
            :model-value="currentSettings.styleSet"
            item-title="setName"
            item-value="id"
            label="Style Set"
            variant="outlined"
            @update:model-value="currentSettings.styleSet = $event"
          />
          <v-checkbox
            v-model="currentSettings.devMode"
            label="Dev mode"
            type="checkbox"
          />
          <div class="pic-flex pic-between">
            <v-btn
              :disabled="v$.$invalid"
              color="primary"
              @click="updateApp()"
            >
              Update
            </v-btn>
            <v-btn class="pic-button--text" variant="text" @click="deleteApp">
              Delete
            </v-btn>
          </div>
        </template>
        <template v-if="appFormState === 'newApp'">
          <VTextField
            v-model="newAppName"
            :validation="v$.newAppName"
            data-testid="new-app-input"
            label="App Name"
            variant="outlined"
          />
          <VBtn
            color="primary"
            data-testid="create app"
            @click="createApp"
          >
            Create App
          </VBtn>
        </template>
      </main>
    </div>
  </template>
</template>

<style lang="postcss">

</style>
