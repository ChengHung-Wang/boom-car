<script setup lang="ts">
import * as GameService from "@/services/racer.js"
import { onMounted, Ref, ref } from "vue";

const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();

onMounted(() => {
    if (gameCanvas.value != undefined) {
        GameService.canvas.value = gameCanvas.value;
        GameService.context.value = GameService.canvas.value.getContext('2d');

        console.log(GameService.canvas.value)
    }
});
</script>
<template>
  <div id="game">
      <canvas ref="gameCanvas"></canvas>
  </div>
</template>