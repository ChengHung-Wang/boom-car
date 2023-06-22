<script setup lang="ts">
import {useGameStore} from "@/stores/game";
const gameStore = useGameStore();
import * as GameService from "@/services/racer.js"
import {ref, Ref} from "vue";

function createCanvasMap(width, height) {
  const canvas = document.getElementById('map');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  return { c: canvas, x: ctx };
}


console.log(gameStore.mapCanvas)
</script>

<template>
  <div class="mini-map">
    <canvas ref="mapCanvas" id="map"></canvas>
  </div>
</template>

<style scoped>
.mini-map {
  left: 0;
  top: 2vh;
  height: 120px;
  width: 210px;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  border-radius: 0 8px 8px 0;
  z-index: 1;
}
</style>