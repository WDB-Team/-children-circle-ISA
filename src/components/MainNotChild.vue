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

<style scoped>
.Container {
  margin-block-end: 150px;
}

.Decorator {
  inline-size: 100%;
  block-size: 150px;
  background-image: url("./../assets/Childrens.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

p {
  margin-block-start: 24px;
  inline-size: 80%;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
}

.AnimatorContainer {
  animation-duration: 1000ms;
}
</style>
