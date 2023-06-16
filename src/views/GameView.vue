<script setup lang="ts">
import * as GameService from "@/services/racer.js"
import { onMounted, Ref, ref, watch } from "vue";
import { racer } from "@/services/racer.js";
import { useGameStore } from "@/stores/game";
import { useI18n } from "vue-i18n";
import NicknameInput from "@/components/NicknameInput.vue";
import Dashboard from "@/components/Dashboard.vue";
import MiniMap from "@/components/MiniMap.vue";
import CameraSetting from "@/components/CameraSetting.vue";
import TurboBox from "@/components/TurboBox.vue";

const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const gameStore = useGameStore();

const gameStarted = ref(false);
const { t, locale } = useI18n();

function startGame(trackNumber: number): void {
    gameStarted.value = true;
    GameService.racer.startGame(trackNumber);
}

function openInNewTab(url) {
  window.open(url, '_blank', 'noreferrer');
}

onMounted(() => {
    if (gameCanvas.value != undefined) {
        gameCanvas.value.width = document.documentElement.clientWidth;
        gameCanvas.value.height = document.documentElement.clientHeight;
        GameService.racer.canvas.value = gameCanvas.value;
        GameService.racer.context.value = (GameService.racer.canvas.value).getContext('2d');
        GameService.init();

        gameStore.camera.y = racer.camera.yOffset;
        gameStore.camera.z = racer.camera.zOffset;
    }
});

watch(
    gameStore.camera, () => {
        if (gameStarted.value) {
            racer.camera.adjust(gameStore.camera.y, gameStore.camera.z);
        }
    }, { deep: true })

</script>
<template>
  <div id="game">
      <canvas ref="gameCanvas"></canvas>
      <div class="container" v-if="!gameStarted">
        <nav class="focus-display">
          <select v-model="locale">
            <option>tw</option>
            <option>en</option>
          </select>
        </nav>
        <div class="row">
            <div class="col-12 fsc h-100vh">
                <div class="h-60vh fcc f-wrap">
                  <img src="../assets/icon/boom-car-icon.svg" alt="" style="align-self:flex-start">
                  <div style="width: 100%">
                    <NicknameInput/>
                  </div>
                  <el-button class="el-btn-custom "
                             size="large"
                             @click="$router.push('/setup/menu')">
                    <span class="color-text-white"> {{ t("Desktop.StartPage.enter_event") }}</span>
                  </el-button>
                  <el-button
                      class="github-icon"
                      @click="openInNewTab('https://github.com/ChengHung-Wang/boom-car')">
                    <img src="../assets/icon/github-icon.svg" alt="">
                    <a href=""></a>
                  </el-button>
                </div>
              <div>
                <el-button @click="startGame(0)">
                  start
                </el-button>
              </div>
            </div>
          </div>
      </div>

      <div class="" v-if="gameStarted">
          <Dashboard/>
<!--          <MiniMap/>-->
          <CameraSetting/>
<!--          <TurboBox/>-->
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
      backdrop-filter: saturate(180%);
      //background: rgba(0, 0, 0, 0.3);
      padding: 15px;
      height: 60%;
      display: flex;
      align-items: center;
      justify-content: center;

  }
  .fcc {
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .f-wrap {
    flex-wrap: wrap;
  }
  .fsc {
      display: flex;
      align-items: center;
      justify-content: start;
  }
  .h-100vh {
      height: 100vh;
  }

  .h-60vh {
    height: 60vh;
  }
  .focus-display {
    position: fixed;
    inset: 0;
    color: rgb(128, 128, 128);
    font-size: 24px;
  }
</style>