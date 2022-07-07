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
        Créese una cuenta para que su niño pueda comenzar a disfrutar de todos
        los privilegios que posee nuestro círculo
      </p>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md Form">
        <q-input
          class="UserName"
          color="indigo-10"
          v-model="name"
          label="Escribe tu Nombre"
          lazy-rules="ondemand"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor llena este campo',
          ]"
        />

        <q-input
          class="UserName"
          color="indigo-10"
          v-model="email"
          label="Escribe tu Email"
          lazy-rules="ondemand"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor llena este campo',
          ]"
          type="email"
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
          <q-btn type="submit" class="Crear" label="Crear" color="indigo-10" />
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
  data() {
    return {};
  },
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
    const name = ref(null);
    const email = ref(null);
    const password = ref(null);

    const AnimatorGroup1 = ref(true);

    const isPasswordVisible = ref(false);
    const inputPasswordType = ref("password");
    const inputPasswordIcon = ref("o_visibility_off");

    function toOnBoarding() {
      AnimatorGroup1.value = false;

      debounce(debounceOnBoarding, 600)();
    }
    function debounceOnBoarding() {
      router.push("/login/onBoarding");
    }

    return {
      name,
      email,
      password,
      userSeccionStore,
      isPasswordVisible,
      inputPasswordType,
      inputPasswordIcon,
      router,
      AnimatorGroup1,

      toOnBoarding,
      debounceOnBoarding,

      async onSubmit() {
        try {
          $q.notify({
            color: "blue-6",
            textColor: "white",
            message: "Procesando",
            spinner: true,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
          });
          let response = await fetch(
            "https://tempora.herokuapp.com/api/authorization/sign-up",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: `{"full_name":"${name.value}","email":"${email.value}","password":"${password.value}"}`,
            }
          );

          response = await response.json();

          if (response.Error) {
            $q.notify({
              color: "red-6",
              textColor: "white",
              message: "Error en la operacion vuelva a intentarlo mas tarde",
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
              name,
              email
            );

            toOnBoarding();
          }
        } catch (err) {
          console.log(err);
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Error en la operacion vuelva a intentarlo mas tarde",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
          });
        }
      },

      onReset() {
        name.value = null;
        password.value = null;
        accept.value = false;
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
