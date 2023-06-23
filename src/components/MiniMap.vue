<script setup lang="ts">
import type { Ref } from "vue";
import { onMounted, ref } from "vue"
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();
const mapCanvas: Ref<HTMLCanvasElement | undefined> = ref();

const width = 350;
const height = 330;

onMounted(() => {
  if (mapCanvas.value)  {
    (<HTMLCanvasElement>(mapCanvas.value)).width = width;
    (<HTMLCanvasElement>(mapCanvas.value)).height = height;
    gameStore.mapCanvas = <HTMLCanvasElement>mapCanvas.value;
  }
})

</script>

<template>
  <div class="mini-map">
    <canvas ref="mapCanvas" id="map" v-bind:style="{'width': width + 'px', 'height': height + 'px'}"></canvas>
    <div class="fcc">
      <span class="text"> {{ gameStore.lapCount}} </span>
      <span class="text"> / </span>
      <span class="text"> {{ gameStore.lapTotal }} </span>
    </div>
  </div>
</template>

<style scoped>
.mini-map {
  left: 0;
  top: 30px;
  position: relative;
  //background: rgba(0, 0, 0, 0.5);
  //backdrop-filter: blur(2px);
  //border-radius: 0 8px 8px 0;
  z-index: 1;
  height: 125px;
  width: 210px;
}

.mini-map .text {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 120px;
  align-items: center;
  color: #D9D9D9;
}

#map {
    position: fixed;
    left: 12px;
    /*background-color: black;*/
    width: 200px;
    height: 120px;
    z-index: 9;
}
</style>