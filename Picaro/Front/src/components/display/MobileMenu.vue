<script lang="ts" setup>

import MobileMenuLayout from "@components/layout/MobileMenuLayout.vue";
import {Settings} from "@types";
import {ref} from "vue";

defineProps<{
  currentApp: Settings
}>()

const showMenu = ref(false)
</script>

<template>
  <div class="mobile-menu-container">
    <img alt="mobile menu" class="menu" src="/images/menu.svg" width="50" @click="showMenu = !showMenu"/>
  </div>
  <div :class="{hidden: !showMenu}" class="mobile-menu" @click=" showMenu = false">
    <MobileMenuLayout :current-app="currentApp"/>
  </div>
</template>

<style lang="postcss" scoped>
.mobile-menu-container {
  position: fixed;
  top: .1rem;
  right: .1rem;
}

.mobile-menu {
  transition: opacity .3s ease;
  position: fixed;
  width: 90%;
  top: 2.5rem;
  right: .5rem;
  background: #fff;
  padding: 1rem;
  box-shadow: -5px 5px 10px #333;
  border: 1px solid #ccc;
  opacity: 1;

  &.hidden {
    opacity: 0;
    transition: none;
  }

  :deep(> div) {
    margin-bottom: .25rlh;
  }
}

.menu {
  cursor: pointer;
}
</style>
