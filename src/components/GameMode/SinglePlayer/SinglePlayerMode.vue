<script setup lang="ts">

import {Ref, ref} from "vue";
import i18n from '@/services/i18n'
import {useGameStore} from "@/stores/game";
import {racer} from "@/services/racer";
import router from "@/router";
import * as GameService from "@/services/racer";
import Card from "@/components/Card.vue";
import {backgroundMusic} from "@/services/audio";

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

  backgroundMusic(true);
}

const trackFiledList = ref([
  {
    name: "Desktop.SinglePlayer.easy_theme",
    level: "Desktop.SinglePlayer.easy",
    img: new URL('/src/assets/picture/track1-image.png', import.meta.url),

  },
  {},
  {
    name: "Desktop.SinglePlayer.medium_theme",
    level: "Desktop.SinglePlayer.medium",
    img: new URL('/src/assets/picture/track2-image.png', import.meta.url),
    onload: false
  },
  {
    name: "Desktop.SinglePlayer.hard_theme",
    level: "Desktop.SinglePlayer.hard",
    img: new URL('/src/assets/picture/track3-image.png', import.meta.url),
    onload: false
  },
])

</script>

<template>
  <div class="row" style="top: 100px;">
    <div class="col-12">
      <p class="description">{{ t("Desktop.SinglePlayer.space_select") }}</p>
      <el-radio-group style="width: 100%" v-model="gameStore.trackNumber" size="large">
        <el-radio-button style="width: 33%" :label="0"> {{ t("Desktop.SinglePlayer.easy_theme") }} </el-radio-button>
        <el-radio-button style="width: 33%" :label="2" > {{ t("Desktop.SinglePlayer.medium_theme") }} </el-radio-button>
        <el-radio-button style="width: 33%" :label="3" > {{ t("Desktop.SinglePlayer.hard_theme") }} </el-radio-button>
      </el-radio-group>
    </div>
    <div class="col-12" style="margin-top: 24px">
      <Card
          :title="t(trackFiledList[gameStore.trackNumber].name)"
          :description="t(trackFiledList[gameStore.trackNumber].level)"
          :img="trackFiledList[gameStore.trackNumber].img">
      </Card>
    </div>
    <div class="col-12">
      <p class="description">{{ t("Desktop.SinglePlayer.computer_amount") }}</p>
      <el-slider class="slider" v-model="gameStore.computerAmount" :min="0" :max="14" />

     <el-button class="el-btn-custom click" style="margin-top: 60px"  @click="$router.push('/'); start()">進入遊戲</el-button>
    </div>
  </div>
</template>

<style scoped>
  .slider {
      width: 100%;
  }
  .description {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
  }
</style>