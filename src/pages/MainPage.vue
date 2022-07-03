<template>
  <q-page class="flex flex-center">
    <MainNotChild v-if="true" />
    <MainWithChild v-else />
  </q-page>
</template>

<script setup>
import MainNotChild from "src/components/MainNotChild.vue";
import MainWithChild from "src/components/MainWithChild.vue";

import { useUIStore } from "src/stores/ui-store";
import { onMounted } from "vue";

const uiStore = useUIStore();

onMounted(() => {
  uiStore.setHeader(true);
});
</script>
