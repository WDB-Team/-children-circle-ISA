<template>
  <div class="q-pa-md FormContainer">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        class="UserName"
        filled
        color="grey-10"
        v-model="name"
        label="Escribe tu Nombre *"
        hint="Nombre de Usuario"
        lazy-rules="ondemand"
        :rules="[
          (val) => (val && val.length > 0) || 'Por favor llena este campo',
        ]"
      />

      <q-input
        class="Password"
        filled
        color="grey-10"
        type="password"
        v-model="password"
        label="Escribe tu Contraseña *"
        hint="Contraseña de acceso"
        lazy-rules="ondemand"
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const password = ref(null);
    const accept = ref(false);

    return {
      name,
      password,
      accept,

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

<style>
.FormContainer {
  inline-size: 80%;
  margin: 0 auto;
}

.UserName {
  margin-block-end: 40px;
}
.Password {
  margin-block-end: 40px;
}

.q-field--filled .q-field__control {
  background-color: #0000724d;
}
</style>
