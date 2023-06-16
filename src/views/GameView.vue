<script setup lang="ts">
import * as GameService from "@/services/racer.js"
import {onMounted, Ref, ref, watch} from "vue";
import {racer} from "@/services/racer.js";
import {useGameStore} from "@/stores/game";
import {useI18n} from "vue-i18n";
import NicknameInput from "@/components/NicknameInput.vue";
import Dashboard from "@/components/Dashboard.vue";
import MiniMap from "@/components/MiniMap.vue";
import CameraSetting from "@/components/CameraSetting.vue";
import device from "current-device";
import TurboBox from "@/components/TurboBox.vue";
import {constants} from "@/services/constants";

const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const gameStore = useGameStore();

const gameStarted = ref(false);
const {t, locale} = useI18n();

gameStore.mobile = device.mobile();

function startGame(trackNumber: number): void {
  gameStarted.value = true;
  GameService.racer.startGame(trackNumber);
  GameService.racer.player.setAccelerate(true);

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
    }, {deep: true})


function left(touch: boolean) {
  if (touch) {
    GameService.racer.player.setTurnLeft(true);
  } else {
    GameService.racer.player.setTurnLeft(false);
  }
}

function right(touch : boolean) {
  if (touch) {
    GameService.racer.player.setTurnRight(true);
  } else {
    GameService.racer.player.setTurnRight(false);
  }
}

// const left_btn = document.querySelector('.left-btn');
// const right_btn = document.querySelector('.right-btn');
// left_btn.addEventListener('click', function (e) {
//   racer.race.keyDown(constants.KEYLEFT);
// }, false);
// right_btn.addEventListener('click', function (e) {
//   racer.race.keyDown(constants.KEYRIGHT);
// }, false);

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
      <div class="control-panel" v-if="gameStore.mobile">
        <button class="turbo-btn">

        </button>
        <button class="dir-btn" @touchstart="left(true)" @touchend="left(false)">
          <svg width="32" height="47" viewBox="0 0 32 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2727 0L0 23.2727L23.2727 46.5455L32 37.8182L17.4545 23.2727L32 8.72727L23.2727 0Z"
                  fill="#C7C7C7"/>
          </svg>
        </button>
        <button class="dir-btn" @touchstart="right(true)" @touchend="right(false)">
          <svg width="32" height="47" viewBox="0 0 32 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.72727 46.5455L32 23.2727L8.72727 1.52588e-05L0 8.72729L14.5455 23.2727L0 37.8182L8.72727 46.5455Z"
                fill="#C7C7C7"/>
          </svg>
        </button>
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
  backdrop-filter: saturate(180%);
//background: rgba(0, 0, 0, 0.3); padding: 15px;
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

.control-panel {
  position: fixed;
  bottom: 0;
  height: 30%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.dir-btn {
  height: 82px;
  width: 76px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  border-radius: 8px;
}
.dir-btn::after {
  border: 1px solid;
  border-image-source: linear-gradient(180deg, rgba(199, 199, 199, 0.9) 0%, rgba(199, 199, 199, 0.2) 100%);
}
.turbo-btn {

}
</style>