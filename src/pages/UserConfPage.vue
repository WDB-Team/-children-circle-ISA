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
      <div class="Name">
        <q-icon name="person" color="indigo-10" size="100px" />
        <p>{{ userSeccionStore.fullName }}</p>
        <q-btn
          @click="nameDialog = true"
          class="Button"
          label="editar Nombre"
          color="indigo-7"
        ></q-btn>
      </div>
      <hr />
      <div class="Email">
        <p><span>Email:</span> {{ userSeccionStore.email }}</p>
        <q-btn
          @click="emailDialog = true"
          class="Button"
          label="editar Correo"
          color="indigo-7"
        ></q-btn>
      </div>

      <hr />
      <div class="Password">
        <q-btn
          @click="passwordDialog = true"
          class="Button"
          label="Editar Password"
          color="indigo-7"
        ></q-btn>
      </div>
      <hr />
      <div class="Delete">
        <q-btn class="Button" label="Eliminar Cuenta" color="red-7"></q-btn>
      </div>
    </div>
  </transition>

  <q-dialog class="NameDialog" v-model="nameDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="badge" color="primary" text-color="white" />
        <span class="q-ml-sm">Edite su nombre</span>
        <q-input
          class="NewName"
          color="indigo-10"
          v-model="newName"
          lazy-rules="ondemand"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor llena este campo',
          ]"
          type="text"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Regresar" color="primary" v-close-popup />
        <q-btn @click="onNewName" label="Cambiar" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog class="EmailDialog" v-model="emailDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="email" color="primary" text-color="white" />
        <span class="q-ml-sm">Edite su correo</span>
        <q-input
          class="NewEmail"
          color="indigo-10"
          v-model="newEmail"
          lazy-rules="ondemand"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor llena este campo',
          ]"
          type="email"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Regresar" color="primary" v-close-popup />
        <q-btn @click="onNewEmail" label="Cambiar" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog class="PasswordDialog" v-model="passwordDialog" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="password" color="primary" text-color="white" />
        <span class="q-ml-sm">Edite su password</span>
        <q-input
          class="NewPassword"
          color="indigo-10"
          :type="inputPasswordType"
          v-model="newPassword"
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
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Regresar" color="primary" v-close-popup />
        <q-btn @click="onNewPassword" label="Cambiar" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar } from "quasar";
import { useUserSeccionStore } from "src/stores/UserSeccionStore";
import { useRouter } from "vue-router";
import { debounce } from "quasar";

import { ref } from "vue";

export default {
  data() {
    return {
      AnimatorGroup1: true,
    };
  },
  methods: {
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
    const userSeccionStore = useUserSeccionStore();
    const router = useRouter();
    /*if (!userSeccionStore.id) {
      router.push("pepe");
    }*/

    const nameDialog = ref(false);
    const newName = ref("");
    const emailDialog = ref(false);
    const newEmail = ref("");
    const passwordDialog = ref(false);
    const newPassword = ref("");
    const isPasswordVisible = ref(false);
    const inputPasswordType = ref("password");
    const inputPasswordIcon = ref("o_visibility_off");
    return {
      userSeccionStore,
      nameDialog,
      newName,
      emailDialog,
      newEmail,
      passwordDialog,
      newPassword,
      isPasswordVisible,
      inputPasswordType,
      inputPasswordIcon,

      async onNewName() {
        if (newName.value.length > 0) {
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
              "https://tempora.herokuapp.com/api/user/updateFullNameOfUser",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userSeccionStore.token}`,
                },
                body: `{"user_id":"${userSeccionStore.id}","new_fullname":"${newName.value}"}`,
              }
            );

            response = await response.json();

            if (response.Error) {
              $q.notify({
                color: "red-6",
                textColor: "white",
                message: "Ese es su nombre Actual Escriba Otro ",
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

              nameDialog.value = false;
              userSeccionStore.fullName = newName.value;
              newName.value = "";
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
        } else {
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Escriba un nombre",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
            timeout: 1000,
          });
        }
      },

      async onNewEmail() {
        if (newEmail.value.length > 0 && newEmail.value.includes("@")) {
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
              "https://tempora.herokuapp.com/api/user/updateEmailOfUser",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userSeccionStore.token}`,
                },
                body: `{"user_id":"${userSeccionStore.id}","new_email":"${newEmail.value}"}`,
              }
            );
            response = await response.json();

            if (response.Error) {
              $q.notify({
                color: "red-6",
                textColor: "white",
                message: "Ya usted esta usando ese correo ",
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

              emailDialog.value = false;
              userSeccionStore.email = newEmail.value;
              newEmail.value = "";
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
        } else {
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Escriba un correo valido",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
            timeout: 1000,
          });
        }
      },
      async onNewPassword() {
        if (newPassword.value.length > 0) {
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
              "https://tempora.herokuapp.com/api/user/updatePasswordOfUser",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userSeccionStore.token}`,
                },
                body: `{"user_id":"${userSeccionStore.id}"},"new_password":"${newPassword.value}"}`,
              }
            );

            response = await response.json();
            console.log(response);
            if (response.Error) {
              $q.notify({
                color: "red-6",
                textColor: "white",
                message: "Ya usted esta usando ese password ",
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

              passwordDialog.value = false;

              newPassword.value = "";
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
        } else {
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Escriba un password",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
            timeout: 1000,
          });
        }
      },

      async onDelete() {
        if (newPassword.value.length > 0) {
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
              "https://tempora.herokuapp.com/api/user/deleteUserSystem",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userSeccionStore.token}`,
                },
                body: `{"user_id":"${userSeccionStore.id}"}`,
              }
            );

            response = await response.json();
            console.log(response);
            if (response.Error) {
              $q.notify({
                color: "red-6",
                textColor: "white",
                message: "Ya usted esta usando ese password ",
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

              passwordDialog.value = false;

              newPassword.value = "";
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
        } else {
          $q.notify({
            color: "red-6",
            textColor: "white",
            message: "Escriba un password",
            spinner: false,
            position: "top",
            group: "my-group",
            badgeStyle: { display: "none" },
            timeout: 1000,
          });
        }
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
  inline-size: 95%;
  block-size: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 38px auto;

  position: relative;

  background-color: rgb(255, 255, 162);

  border: 2px solid #000072b5;
  border-radius: 8px;
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

.FormContainer .Name {
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormContainer .Name .Button {
  margin-block-end: 20px;
}

.FormContainer .Email {
  inline-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormContainer .Email p {
  margin-block-start: 20px;
}

.FormContainer .Email p span {
  font-weight: 900;
}

.FormContainer .Email .Button {
  margin-block-end: 20px;
}

.FormContainer .Password {
  inline-size: 100%;
  block-size: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormContainer .Password .Button {
  margin: 40px 0;
}

.FormContainer .Delete {
  inline-size: 100%;
  block-size: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.FormContainer .Delete .Button {
  margin: 40px 0;
}

hr {
  inline-size: 100%;
  block-size: 1px;
}

.NameDialog span {
  font-size: 17px;
  color: blue;
}

.NameDialog .NewName {
  inline-size: 100%;
}

.EmailDialog span {
  font-size: 17px;
  color: blue;
}

.EmailDialog .NewEmail {
  inline-size: 100%;
}

.PasswordDialog span {
  font-size: 17px;
  color: blue;
}

.PasswordDialog .NewPassword {
  inline-size: 100%;
}

.AnimatorFormContainer {
  animation-duration: 700ms;
}
</style>

<style></style>
