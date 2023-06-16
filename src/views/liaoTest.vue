<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { useSocketStore } from "@/stores/socket";
import { helper } from "@/services/racer";
import SocketSender from "@/helper/socketSender";

import * as GameService from "@/services/racer.js"
import { onMounted, Ref, ref, watch } from "vue";
import { racer } from "@/services/racer.js";
import { controlIndex } from "@/helper/socketSync";

const gameStore = useGameStore();
const socketStore = useSocketStore();

const connectJoin = () => {
  helper.socket.init();
  helper.socket.start();
  (new SocketSender()).joinEvent();
}

const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const mapCanvas: Ref<HTMLCanvasElement | undefined> = ref();

const camera = ref({
  x: 0,
  y: 0,
  z: 0
})

function startGame(trackNumber: number): void {
  gameStore.gameStarted = true;
  GameService.racer.startGame(trackNumber);
}

onMounted(() => {
  if (gameCanvas.value != undefined && mapCanvas.value != undefined) {
    gameCanvas.value.width = document.documentElement.clientWidth;
    gameCanvas.value.height = document.documentElement.clientHeight;
    GameService.racer.canvas.value = gameCanvas.value;
    GameService.racer.context.value = (GameService.racer.canvas.value).getContext('2d');
    gameStore.mapCanvas = <HTMLCanvasElement>mapCanvas.value;
    GameService.init();
    gameStore.engineReady = true;

    camera.value.y = racer.camera.yOffset;
    camera.value.z = racer.camera.zOffset;
  }
});

watch(
    camera, () => {
      if (gameStore.gameStarted) {
        racer.camera.adjust(camera.value.y, camera.value.z);
      }
    }, { deep: true })
</script>

<template>
  <div id="game">
    <div style="position: absolute">
      <br><br><br>
      <input type="text" v-model="socketStore.socketServerUrl" placeholder="server address">
      <input type="text" v-model="socketStore.eventCode" placeholder="event code">
      <input type="button" value="connect" @click="connectJoin">
      <br><br>
      <input type="text" v-model="socketStore.nickname" placeholder="nickname">
      <input type="button" value="set nickname" @click="(new SocketSender()).setNickname()">
      <p>{{ gameStore.clientAmount }}</p>
      <p>{{ socketStore.members }}</p>
    </div>
    <canvas ref="gameCanvas"></canvas>
    <canvas ref="mapCanvas" id="map"></canvas>
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
            <select v-model="controlIndex">
              <option value="0">player index: 0</option>
              <option value="1">player index: 1</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div style="width: 500px;" class="container text-light title-card" v-if="gameStarted">
      <div class="focus-display">
        <p>名次 {{ gameStore.rank }}</p>
        <p>速度 {{ gameStore.speed }}</p>

        <p>圈數 [{{ gameStore.lapCount }}/現在圈數]</p>
        <p>經過時間 {{ gameStore.lapTime }}</p>

        <p>turbo {{ gameStore.turboAmount }}</p>
      </div>
      <div class="row">
        <div class="col-3">
          <h5>Camera Y</h5>
          <el-slider v-model="camera.y" :min="300" :max="10000" />
        </div>
        <div class="col-3">
          <h5>Camera Z</h5>
          <el-slider v-model="camera.z" :min="300" :max="10000" />
        </div>
        <div class="col-6" v-if="racer.cars.value.length >= 0">
          <p v-for="(data, index) in racer.cars.value" :key="index">
            index: {{ index }}<br>
            x: {{ data.x }}<br>
            y: {{ data.y }}<br>
            z: {{ data.z }}
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>