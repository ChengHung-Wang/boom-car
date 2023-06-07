<script setup lang="ts">
import * as GameService from "@/services/racer.js"
import { onMounted, Ref, ref, watch } from "vue";
import { racer } from "@/services/racer.js";
import { useGameStore } from "@/stores/game";
import { playerIndex } from "@/helper/socketSync";

const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const gameStore = useGameStore();

const gameStarted = ref(false);
const camera = ref({
    x: 0,
    y: 0,
    z: 0
})

function startGame(trackNumber: number): void {
    gameStarted.value = true;
    GameService.racer.startGame(trackNumber);
}

onMounted(() => {
    if (gameCanvas.value != undefined) {
        gameCanvas.value.width = document.documentElement.clientWidth;
        gameCanvas.value.height = document.documentElement.clientHeight;
        GameService.racer.canvas.value = gameCanvas.value;
        GameService.racer.context.value = (GameService.racer.canvas.value).getContext('2d');
        GameService.init();

        camera.value.y = racer.camera.yOffset;
        camera.value.z = racer.camera.zOffset;
    }
});

watch(
    camera, () => {
        if (gameStarted.value) {
            racer.camera.adjust(camera.value.y, camera.value.z);
        }
    }, { deep: true })
</script>
<template>
  <div id="game">
      <canvas ref="gameCanvas"></canvas>
      <div class="container" v-if="!gameStarted">

          <div class="row">
              <div class="col-12 fsc text-light h-100vh">
                  <div class="title-card">
                      <h1>boom car</h1>
                      <p class="mb-2"><strong>難度</strong></p>
                      <el-button-group class="mb-3">
                          <el-button @click="startGame(0)" type="info">簡單</el-button>
                          <el-button @click="startGame(2)" type="info">中等</el-button>
                          <el-button @click="startGame(3)" type="info">困難</el-button>
                      </el-button-group>
                      <p>遊戲中按 X 可以啟動加速。</p>
                      <select v-model="playerIndex">
                        <option value="0">player index: 0</option>
                        <option value="1">player index: 1</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>

      <div class="container text-light title-card" v-if="gameStarted">
          <div class="focus-display">
            <p>名次 {{ gameStore.rank }}</p>
            <p>速度 {{ gameStore.speed }}</p>

            <p>圈數 [{{ gameStore.lapCount }}/現在圈數]</p>
            <p>經過時間 {{ gameStore.lapTime }}</p>

            <p>turbo {{ gameStore.turboAmount }}</p>
          </div>
          <div class="row">
              <div class="col-4">
                  <h5>Camera X</h5>
                  <el-slider v-model="camera.x" />
              </div>
              <div class="col-4">
                  <h5>Camera Y</h5>
                  <el-slider v-model="camera.y" :min="300" :max="10000" />
              </div>
              <div class="col-4">
                  <h5>Camera Z</h5>
                  <el-slider v-model="camera.z" :min="300" :max="10000" />
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>
  canvas {
      position: absolute;
      width: 100vw;
      height: 100vh;
      inset: 0;
  }
  .title-card {
      backdrop-filter: saturate(180%) blur(30px);
      -webkit-backdrop-filter: saturate(180%) blur(30px);
      background: rgba(0, 0, 0, 0.3);
      padding: 15px;
  }
  .fcc {
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .fsc {
      display: flex;
      align-items: center;
      justify-content: start;
  }
  .h-100vh {
      height: 100vh;
  }
  .focus-display {
    position: fixed;
    inset: 0;
    color: rgb(128, 128, 128);
    font-size: 24px;
  }
</style>