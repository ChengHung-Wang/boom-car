<script setup lang="ts">

import {ref} from "vue";
import i18n from '@/services/i18n'
import {useGameStore} from "@/stores/game";
import {racer} from "@/services/racer";
import router from "@/router";
import * as GameService from "@/services/racer";

const { t } = i18n.global

type Track = {
  trackName : string,
  level : string
}

const gameStore = useGameStore();

function start() {
  gameStore.gameStarted = true
  gameStore.gameMode = 1;
  GameService.racer.race.setAI();
  GameService.racer.startGame(gameStore.trackNumber);

  if (gameStore.mobile) {
    GameService.racer.player.setAccelerate(true);
  }
  router.push("");
}

</script>

<template>
  <div class="container" style="top: 100px;">
    <div class="row">
      <div class="col-12">
          <p class="description">場景選擇</p>
          <!--   TODO:接收場景選擇，傳送選項到 "../GameView.vue"  startGame([代號])       -->
          <el-radio-group style="width: 100%" v-model="gameStore.trackNumber" size="large">
            <el-radio-button style="width: 33%" label=0 > {{ t("Desktop.SinglePlayer.easy_theme") }} </el-radio-button>
            <el-radio-button style="width: 33%" label=1 > {{ t("Desktop.SinglePlayer.medium_theme") }} </el-radio-button>
            <el-radio-button style="width: 33%" label=2 > {{ t("Desktop.SinglePlayer.hard_theme") }} </el-radio-button>
          </el-radio-group>
          <!--   TODO:接收電腦數量，傳送    -->
        </div>
        <div class="col-12" style="margin-top: 36px">
          <p class="description">電腦數量</p>
          <el-slider class="slider" v-model="gameStore.computerAmount" :min="0" :max="14" />
         <el-button class="el-btn-custom" @click="start()">進入遊戲</el-button>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .slider {
      width: 100%;
  }
</style>