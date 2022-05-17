<template>
  <q-layout view="hHh lpr lFf">
    <transition
      appear
      enter-active-class="animated slideInDown"
      leave-active-class="animated slideOutUp"
    >
      <q-header v-show="UIStore.Header" class="Header AnimatorHeader" elevated>
        <q-toolbar>
          <q-btn flat @click="drawerLeft = !drawerLeft" round icon="menu" />
          <q-toolbar-title class="Title">
            <q-icon class="q-mr-xs" size="80px" name="img:Logo.svg"></q-icon>
            <span class="q-mr-md">Alegría</span>
          </q-toolbar-title>
          <q-btn flat round icon="o_account_circle" size="18px" dense>
            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              anchor="bottom left"
            >
              <q-list class="Menu" separator>
                <q-item @click="toConfig" clickable v-ripple v-close-popup>
                  <q-item-section avatar
                    ><q-icon name="settings"></q-icon>
                  </q-item-section>
                  <q-item-section>Configuración </q-item-section>
                </q-item>
                <q-item @click="toInnit" clickable v-ripple v-close-popup>
                  <q-item-section avatar
                    ><q-icon name="logout"></q-icon>
                  </q-item-section>
                  <q-item-section> Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>
    </transition>

    <q-drawer
      v-model="drawerLeft"
      show-if-above
      :width="250"
      :breakpoint="700"
      elevated
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <q-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="menu"
          />
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUIStore } from "src/stores/ui-store";
import { ref } from "vue";
import { debounce } from "quasar";
export default {
  data() {
    return {
      AnimatorGroup1: true,
      UIStore: useUIStore(),
    };
  },
  methods: {
    toInnit() {
      this.AnimatorGroup1 = false;
      this.UIStore.ToggleHeader();
      this.UIStore.ToggleMainNotChild();
      debounce(this.debounceInnit, 400)();
    },
    toConfig() {
      this.AnimatorGroup1 = false;

      debounce(this.debounceMain, 1000)();
    },
    debounceInnit() {
      this.$router.push("/");
    },
    debounceConfig() {
      this.$router.push("/app/config");
    },
  },

  setup() {
    return {
      drawerLeft: ref(false),
    };
  },
};
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

.Menu {
  background-color: rgb(255, 255, 179);
  color: #000072;
  font-size: 16px;
  font-weight: 500;
}

.AnimatorHeader {
  animation-duration: 1s;
}
</style>
