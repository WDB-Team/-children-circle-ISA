<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="{ enter: 1000, leave: 300 }"
  >
    <div
      v-show="UIStore.MainNotChild"
      class="Container flex flex-center AnimatorContainer"
    >
      <div class="Decorator"></div>

      <p class="text-grey-10">
        Aún no tienes ningún niño inscrito que esperas para comenzar!!!
      </p>

      <q-btn
        color="grey-10"
        icon="person_add"
        outline
        label="Iniciar Matricula"
      ></q-btn>
    </div>
  </transition>
</template>

<script>
import { useUIStore } from "src/stores/ui-store";

export default {
  data() {
    return { UIStore: useUIStore() };
  },

  mounted() {
    if (!this.UIStore.MainNotChild) {
      this.UIStore.ToggleMainNotChild();
    }
  },
};
</script>

<style scoped></style>
