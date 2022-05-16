<template>
  <div class="q-pa-md">
    <transition-group
      appear
      enter-active-class="animated bounceIn"
      leave-active-class="animated bounceOut"
      :duration="{ enter: 2000, leave: 300 }"
    >
      <div
        v-show="AnimatorGroup1"
        key="vector"
        class="Decorator AnimatorDecorator"
      ></div>

      <h1 v-show="AnimatorGroup1" key="Cabecera" class="AnimatorCabecera">
        Bienvenidos <br />
        a nuestro círculo infantil <br />
        <span>Alegría</span>
      </h1>
    </transition-group>

    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut"
    >
      <div
        v-show="AnimatorButtons"
        class="Buttons flex flex-center AnimatorButtons"
      >
        <q-btn @click="toLogin" icon="login" label="Iniciar Sesión" outline>
        </q-btn>

        <q-btn
          @click="toCreateAccount"
          icon="badge"
          label="Crear Cuenta"
          outline
        ></q-btn>
      </div>
    </transition>
    <transition-group
      appear
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
      :duration="{ enter: 500, leave: 300 }"
    >
      <p v-show="AnimatorGroup2" key="q" class="AnimationGroup2">
        <q
          >Para los niños trabajamos, porque los niños son los que saben querer,
          porque los niños son la esperanza del mundo. Y queremos que nos
          quieran, y nos vean como cosa de su corazón.</q
        >
      </p>

      <p v-show="AnimatorGroup2" key="cite" class="AnimationGroup2">
        <cite>José Martí </cite>
      </p>
    </transition-group>
  </div>
</template>

<script>
import { useUIStore } from "./../stores/ui-store";
import { debounce } from "quasar";
export default {
  data() {
    return {
      AnimatorGroup1: true,
      AnimatorGroup2: true,
      AnimatorButtons: true,
      UIStore: useUIStore(),
    };
  },
  methods: {
    toLogin() {
      this.UIStore.ToggleHeader();
      this.AnimatorGroup1 = false;
      this.AnimatorGroup2 = false;
      this.AnimatorButtons = false;
      debounce(this.debounceLogin, 1000)();
    },
    toCreateAccount() {
      this.UIStore.ToggleHeader();
      this.AnimatorGroup1 = false;
      this.AnimatorGroup2 = false;
      this.AnimatorButtons = false;
      debounce(this.debounceCreateAccount, 1000)();
    },
    debounceLogin() {
      this.$router.push("/login");
    },
    debounceCreateAccount() {
      this.$router.push("/login/createAccount");
    },
  },
  unmounted() {
    this.UIStore.ToggleHeader();
  },
};
</script>

<style scoped>
.Decorator {
  inline-size: 100%;
  block-size: 100px;
  margin: 0 auto;
  margin-top: 0px;

  background-image: url("./../assets/Bebe Logo Para presentacion.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

h1 {
  font-size: 22px;
  line-height: 30px;
  font-weight: 900;
  text-align: center;
  color: #000072;
}
h1 span {
  font-size: 30px;
  line-height: 50px;
  color: #4066ff;
}

.Buttons {
  block-size: 100px;
  flex-direction: column;
  justify-content: space-around;
}

p:nth-of-type(1) {
  inline-size: 90%;
  font-weight: 600;
  font-size: 15px;
  margin: 0 auto;
  text-align: center;
  margin-block-start: 40px;
}

p:nth-of-type(2) {
  inline-size: 70%;
  margin: 0 auto;
  margin-block-start: 20px;
  font-weight: 500;
  font-size: 15px;
  text-align: right;
}

.AnimatorDecorator {
  animation-duration: 2s;
}
.AnimatorCabecera {
  animation-duration: 500ms;
}
.AnimatorButtons {
  animation-duration: 300ms;
  animation-delay: 300ms;
}
.AnimationGroup2 {
  animation-duration: 500ms;
}
</style>
