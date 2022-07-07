<template>
  <transition
    appear
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutLeft"
    :duration="{ enter: 700, leave: 300 }"
  >
    <div
      v-show="AnimatorGroup1"
      class="q-pt-lg FormContainer AnimatorFormContainer"
    >
      <div class="Decorator"></div>
      <p>
        Hola que bueno tenerte de vuelta, ingresa para saber como le va a tú
        niño
      </p>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md Form">
        <q-input
          class="UserName"
          color="indigo-10"
          type="email"
          v-model="email"
          label="Escribe tu Email"
          lazy-rules="ondemand"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor llena este campo',
          ]"
        />

        <q-input
          class="Password"
          color="indigo-10"
          :type="inputPasswordType"
          v-model="password"
          label="Escribe tu Contraseña"
          lazy-rules="ondemand"
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your password',
          ]"
        >
          <template v-slot:append>
            <q-btn
              @click="onVisibility"
              flat
              round
              :icon="inputPasswordIcon"
              color="indigo-10"
            />
          </template>
        </q-input>
        <div class="Buttons">
          <q-btn type="Submit" class="Crear" label="Crear" color="indigo-10" />
          <q-btn
            label="Regresar"
            @click="toInnit"
            color="indigo-10"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </transition>
</template>

<script>
import { useQuasar } from "quasar";
import { useUserSeccionStore } from "stores/UserSeccionStore";
import { useRouter } from "vue-router";
import { debounce } from "quasar";

import { ref } from "vue";

export default {
  methods: {
    toInnit() {
      this.AnimatorGroup1 = false;

      debounce(this.debounceInnit, 400)();
    },

    debounceInnit() {
      this.$router.push("/");
    },
  },

  setup() {
    const $q = useQuasar();
    const userSeccionStore = useUserSeccionStore();
    const router = useRouter();

    const email = ref(null);
    const password = ref(null);

    const AnimatorGroup1 = ref(true);

    const isPasswordVisible = ref(false);
    const inputPasswordType = ref("password");
    const inputPasswordIcon = ref("o_visibility_off");

    function toMain() {
      AnimatorGroup1.value = false;

      debounce(debounceMain, 1000)();
    }

    function debounceMain() {
      router.push("/app");
    }

    return {
      email,
      password,
      userSeccionStore,
      router,
      isPasswordVisible,
      inputPasswordType,
      inputPasswordIcon,
      AnimatorGroup1,

      toMain,
      debounceMain,
      async onSubmit() {
        try {
          let encryptedData = btoa(`${email.value}:${password.value}`);

          let response = await fetch(
            "https://tempora.herokuapp.com/api/authorization/sign-in",
            {
              method: "GET",
              headers: {
                Authorization: `Basic ${encryptedData}`,
              },
            }
          );

          $q.notify({
            color: "blue-6",
            textColor: "white",
            message: "Procesando",
            spinner: true,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
          });

          response = await response.json();

          let response1 = await fetch(
            `https://tempora.herokuapp.com/api/user/searchUserById/${response.Body[0]}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${response.Body[1]}`,
              },
            }
          );
          response1 = await response1.json();

          if (response.Error) {
            $q.notify({
              color: "red-6",
              textColor: "white",
              message: "Error compruebe que todo este OK",
              spinner: false,
              position: "top",
              group: "my-group",
              badgeStyle: { display: "none" },
            });
          } else {
            $q.notify({
              color: "green-6",
              textColor: "white",
              message: "Todo Listo",
              spinner: false,
              position: "top",
              group: "my-group",
              badgeStyle: { display: "none" },
              timeout: 1000,
            });

            userSeccionStore.fillSeccion(
              response.Body[0],
              response.Body[1],
              response1.Body.full_name,
              email
            );

            toMain();
          }
        } catch (err) {
          console.log(err);
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Error compruebe que todo este OK",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },

      onVisibility() {
        isPasswordVisible.value = !isPasswordVisible.value;

        if (isPasswordVisible.value) {
          inputPasswordType.value = "text";
          inputPasswordIcon.value = "o_visibility";
        } else {
          inputPasswordType.value = "password";
          inputPasswordIcon.value = "o_visibility_off";
        }
      },
    };
  },
};
</script>

<style scoped>
.FormContainer {
  inline-size: 80%;
  block-size: 500px;

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
  inline-size: 80%;
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

.Password .q-field__label {
  font-size: 15px;
  font-weight: 400;
}

.q-field--filled .q-field__control {
  background-color: #0000724d;
}

.FormContainer .Form .Buttons {
  inline-size: 100%;
  display: flex;
  justify-content: center;
}

.FormContainer .Form .Buttons .Crear {
  inline-size: 100px;
}

.AnimatorFormContainer {
  animation-duration: 700ms;
}
</style>
