<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    :duration="{ enter: 700, leave: 300 }"
  >
    <div
      v-show="AnimatorGroup1"
      class="q-pa-md row flex-center CarouselContainer AnimatorCarousel"
    >
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="indigo-10"
        navigation
        padding
        arrows
        height="500px"
        class="Carousel"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <div class="Decorator3"></div>
          <div class="q-mt-md text-center Content">
            <p>
              Cuidamos a sus pequeños desde la punta del pie hasta la coronilla
              de su cabeza, no hay lugar donde estén más seguros que con
              nosotros, nuestra enfermería está disponible en todo momento para
              cuidar su salud y bienestar.
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <div class="Decorator"></div>

          <div class="q-mt-md text-center Content">
            <p>
              Les enseñamos a encaminarse en el mundo, tanto como a aprender a
              realizar hermosas manualidades, el horario del día está balanceado
              para que el pequeño se encuentre a gusto y aproveche el tiempo al
              máximo.
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <div class="Decorator2"></div>

          <div class="q-mt-md text-center Content">
            <p>
              Diversión saludable es el concepto que abrazamos, un ambiente sano
              de juegos en donde interactúa con otros pequeños en armonía donde
              aprende a hacer amigos y mucho más.
            </p>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <div class="Decorator1"></div>
          <div class="q-mt-md text-center Content">
            <p>
              Un entorno saludable para su crecimiento, el pequeño tiene acceso
              a un sistema de alimentación sana y a tiempos de descansos, que
              puede ser mejor que un ambiente que acoge y abraza al niño.
            </p>
          </div>
          <q-btn
            class="q-my-lg"
            label="Comenzar"
            @click="toMain"
            icon-right="escalator_warning"
            color="indigo-10"
            size="12px"
            outline
          ></q-btn>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import { debounce } from "quasar";

export default {
  data() {
    return {
      AnimatorGroup1: true,
    };
  },
  methods: {
    toMain() {
      this.AnimatorGroup1 = false;

      debounce(this.debounceMain, 1000)();
    },
    debounceMain() {
      this.$router.push("/app");
    },
  },
  setup() {
    return {
      slide: ref("style"),
    };
  },
};
</script>

<style scoped>
.Carousel {
  inline-size: 100vw;
  background-color: rgba(0, 0, 0, 0);
}

.Decorator {
  inline-size: 100%;
  block-size: 200px;
  background-image: url("./../assets/Manualidades.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.Decorator1 {
  inline-size: 100%;
  block-size: 200px;
  background-image: url("./../assets/AmbienteSaludable.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.Decorator2 {
  inline-size: 100%;
  block-size: 200px;
  background-image: url("./../assets/Juegos.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.Decorator3 {
  inline-size: 100%;
  block-size: 200px;
  background-image: url("./../assets/Cuidado.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.Carousel .Content {
  margin-block-start: 30px;
  font-size: 15px;
  font-weight: 600;
  color: rgb(56, 56, 56);
}

.AnimatorCarousel {
  animation-duration: 700ms;
}
</style>
