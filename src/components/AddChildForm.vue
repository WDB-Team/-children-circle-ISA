<template>
  <transition
    appear
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
    :duration="{ enter: 700, leave: 300 }"
  >
    <div
      v-show="AnimatorGroup1"
      class="q-pt-sm FormContainer AnimatorFormContainer"
    >
      <div class="Decorator"></div>

      <q-stepper
        class="Stepper"
        v-model="step"
        ref="stepper"
        animated
        keep-alive
      >
        <q-step
          :name="1"
          title="Información Básica"
          icon="info"
          :done="step > 1"
          done-color="indigo-4"
          active-color="indigo-10"
        >
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md Form">
            <q-input
              class="UserName"
              color="indigo-10"
              v-model="name"
              label="El nombre de tu peque???"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor llena este campo',
              ]"
            />
            <div class="ToggleContainer">
              <q-toggle
                label="Sexo"
                left-label
                class="Toggle"
                v-model="toggle"
                color="pink"
              />
              <div class="SexImage">
                <q-img
                  class="Image"
                  :src="toggle ? 'Nina.svg' : 'Nino.svg'"
                  style="height: 100px; width: 100px; object-fit: 50%"
                />
                <p v-if="toggle">Niña</p>
                <p v-else>Niño</p>
              </div>
            </div>
            <q-input
              class="Password"
              color="indigo-10"
              type="number"
              v-model="edad"
              label="Que edad tiene???"
              lazy-rules="ondemand"
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your password',
              ]"
            >
            </q-input>
          </q-form>
        </q-step>

        <q-step
          :name="2"
          title="Informacion Detallada"
          icon="create_new_folder"
          :done="step > 2"
          done-color="indigo-4"
          active-color="indigo-10"
        >
          <div class="AlimentoContent">
            <p>Alimentos Dañinos</p>
            <div class="Form">
              <q-input
                ref="input"
                class="Password Alimento"
                color="indigo-10"
                type="text"
                v-model="alimento"
                label="Escribe un alimento"
                lazy-rules="ondemand"
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type your password',
                ]"
              >
              </q-input>
              <q-btn
                size="14px"
                icon="add"
                flat
                style="line-height: 1rem; height: 40px"
                color="indigo-10"
                @click="onAlimentoButton"
                >Anadir</q-btn
              >
            </div>

            <q-chip
              v-for="(data, index) of alimentos"
              removable
              v-model="isAlimentos[index]"
              :key="data"
              color="primary"
              text-color="white"
              icon="restaurant"
              :label="data"
              :title="data"
              @remove="removeChip"
            />
          </div>
          <q-input
            class="Password"
            color="indigo-10"
            type="textarea"
            v-model="descripcion"
            label="Escribe tu Contraseña"
            lazy-rules="ondemand"
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]"
          >
          </q-input>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="flex flex-center">
            <q-btn
              @click="$refs.stepper.next()"
              color="indigo-10"
              label="Continuar"
              v-if="step !== 2"
            />
            <q-btn
              class="Crear"
              label="Matricular"
              @click="toApp"
              color="indigo-10"
              v-if="step === 2"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="indigo-8"
              @click="$refs.stepper.previous()"
              label="Retroceder"
              class="q-ml-sm"
            />

            <q-btn
              flat
              color="indigo-8"
              @click="toApp"
              label="Salir"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </transition>
</template>

<script>
import { useQuasar } from "quasar";
import { debounce } from "quasar";

import { ref } from "vue";

export default {
  data() {
    return {
      AnimatorGroup1: true,
      alimentos: [],
      isAlimentos: [],
      alimento: null,
    };
  },
  methods: {
    removeChip(event) {
      let position;
      this.isAlimentos.forEach((el, index) => {
        if (!el) {
          position = index;
          this.alimentos.splice(index, 1);
        }
      });

      this.isAlimentos.splice(position, 1);
    },

    isChipAlready(name) {
      return this.alimentos.indexOf(name) != -1;
    },

    onAlimentoButton() {
      if (!this.isChipAlready(this.alimento)) {
        this.alimentos.push(this.alimento);
        this.isAlimentos.push(true);
        this.alimento = "";
        this.$refs.input.focus();
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "Ya ha puesto ese alimento",
          position: "left",
          timeout: 1000,
        });
        this.$refs.input.focus();
      }
    },

    toInnit() {
      this.AnimatorGroup1 = false;

      debounce(this.debounceInnit, 400)();
    },
    toApp() {
      this.AnimatorGroup1 = false;

      debounce(this.debounceApp, 600)();
    },
    debounceInnit() {
      this.$router.push("/");
    },
    debounceApp() {
      this.$router.push("/app");
    },
  },

  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const edad = ref(null);

    const descripcion = ref(null);
    const toggle = ref(false);
    return {
      name,
      edad,

      descripcion,
      toggle,
      step: ref(1),
      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        password.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style scoped>
.FormContainer {
  inline-size: 95%;
  block-size: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 0 auto;

  position: relative;

  background-color: rgb(255, 255, 162);

  border: 2px solid #000072b5;
  border-radius: 8px;
}

.FormContainer .Decorator {
  inline-size: 100%;
  block-size: 80px;

  position: absolute;
  top: -50px;

  background-image: url("./../assets/Logo.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  z-index: 10;
}

.FormContainer p {
  inline-size: 80%;

  margin-block-end: 40px;

  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  color: #000072cc;
}

.FormContainer .Form {
  inline-size: 100%;
}

.UserName {
  inline-size: 100%;
  margin-block-end: 0px;
}

.UserName .q-field__label {
  font-size: 15px;
  font-weight: 400;
}
.Password {
  margin-block-end: 0px;
  inline-size: 100%;
}

.Password.Alimento {
  inline-size: 60%;
}

.Password .q-field__label {
  font-size: 15px;
  font-weight: 400;
}

.q-field--filled .q-field__control {
  background-color: #0000724d;
}

.Stepper {
  background-color: rgb(255, 255, 162);
  box-shadow: none;
}

.ToggleContainer {
  display: flex;
  justify-content: space-between;
  color: #000072cc;
  font-weight: 500;
  font-size: 18px;
}

.ToggleContainer .SexImage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ToggleContainer .SexImage p {
  margin: 10px;
}

.AlimentoContent p {
  text-align: center;
  inline-size: 100%;
  margin: 0;
  margin-block-start: 10px;
  margin-block-end: 20px;
}

.Form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.AnimatorFormContainer {
  animation-duration: 700ms;
}
</style>

<style>
.Stepper .Toggle .q-toggle__inner--falsy .q-toggle__thumb:after {
  background-color: rgb(57, 107, 209);
}
.Toggle .q-toggle__inner--falsy .q-toggle__track {
  background-color: rgb(42, 70, 230);
}

.Image img {
  object-fit: contain !important;
}
</style>
