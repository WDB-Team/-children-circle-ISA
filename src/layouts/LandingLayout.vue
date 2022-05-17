<template>
  <q-layout view="lHh Lpr lFf">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <q-header v-show="UIStore.Header" class="Header AnimatorHeader" elevated>
        <q-toolbar>
          <q-toolbar-title class="Title">
            <q-icon class="q-mr-xs" size="80px" name="img:Logo.svg"></q-icon>
            <span class="q-mr-md">Alegría</span> Círculo Infantil
          </q-toolbar-title></q-toolbar
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
import { onMounted } from "vue";

const UIStore = useUIStore();

onMounted(() => !UIStore.Header && UIStore.ToggleHeader());
</script>

<style scoped>
.Header {
  background-color: rgb(255, 255, 179);
  color: #000072;
}

.Header .Title {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  inline-size: 100%;
}

.Header .Title span {
  color: #4066ff;
  font-size: 20px;
}

.AnimatorHeader {
  animation-duration: 1s;
}
</style>
