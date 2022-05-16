<template>
  <q-layout view="lHh Lpr lFf">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <q-header v-show="UIStore.Header" class="Header AnimatorHeader" elevated>
        <q-toolbar>
          <q-toolbar-tittle class="Tittle">
            <q-icon class="q-mr-xs" size="80px" name="img:Logo.svg"></q-icon>
            <span class="q-mr-md">Alegría</span> Círculo Infantil
          </q-toolbar-tittle></q-toolbar
        >
      </q-header>
    </transition>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useUIStore } from "src/stores/ui-store";

const UIStore = useUIStore();
console.log(UIStore.Header);
</script>

<style scoped>
.Header {
  background-color: rgb(255, 255, 179);
  color: #000072;
}

.Header .Tittle {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  inline-size: 100%;
}

.Header .Tittle span {
  color: #4066ff;
  font-size: 20px;
}

.AnimatorHeader {
  animation-duration: 1s;
}
</style>
