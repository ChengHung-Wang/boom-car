<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {useGameStore} from "@/stores/game";
import * as GameService from "@/services/racer.js"
import {racer} from "@/services/racer.js";
import {TitleScreen} from "@/services/titleScreen";
import {Race} from "@/services/race";
import {Track} from "@/services/track";

const {t} = useI18n();
const gameStore = useGameStore()

function gameOver() {
  gameStore.gameOver = false;
  gameStore.gameStarted = false;
  GameService.end();
}
</script>

<template>
  <div class="game-over-background"></div>
  <div class="container">
    <div class="row">
      <div class="col-12 game-over">
        <div class="w-100 fcc">
          <img class="medal" v-if="gameStore.rank=1" src="src/assets/picture/gold-medal.png" alt="">
          <img class="medal" v-if="gameStore.rank > 1 && gameStore.rank <= 3" src="src/assets/picture/silver-medal.png" alt="">
          <img class="medal" v-if="gameStore.rank>3" src="src/assets/picture/bronze-medal.png" alt="">
        </div>
        <div class="fcc flex-wrap mt-">
          <span class="rankDescribe w-100 text-center"> {{ t("Desktop.Ranking.ranking")}}  </span>
          <div class="fcc">
            <span class="rank"> {{ gameStore.rank }}  </span>
            <span class="rank" style="margin-left: 6px;" v-if="gameStore.rank == 1">st</span>
            <span class="rank" style="margin-left: 6px;" v-if="gameStore.rank == 2">nd</span>
            <span class="rank" style="margin-left: 6px;" v-if="gameStore.rank == 3">rd</span>
            <span class="rank" style="margin-left: 6px;" v-if="gameStore.rank > 3">th</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <hr class="list-hr">
      </div>
      <div class="col-6">
        <p class="list-text m-l-12"> {{ t("Desktop.Ranking.duration") }} </p>
        </div>
      <div class="col-6 text-end">
        <p class="list-text m-r-12"> {{ gameStore.lapTime }} </p>
      </div>
      <div class="col-12">
        <hr class="list-hr">
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p class="list-text m-l-12"> {{ t("Desktop.Ranking.ranking") }} </p>
      </div>
      <div class="col-6 text-end">
        <span class="list-text"> {{ gameStore.rank }} </span>
        <span class="list-text"> / </span>
        <span class="list-text m-r-12"> {{ GameService.racer.race.carCount }} </span>
      </div>
      <div class="col-12">
        <hr class="list-hr">
      </div>
    </div>

    <el-button class="el-btn-custom "
               size="large"
               @click="$router.push('/menu'); gameOver();"
               style="margin-top: 15vh;"
    ><span class="color-text-white"> {{ t("Desktop.Ranking.return") }} </span>
    </el-button>
      </div>
</template>

<style scoped>
  .game-over {
    margin-top: 110px;
  }

  .game-over-background {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
    border-radius: 8px;
    z-index: 0;
  }

  .game-over .medal {
    width: 160px;
    height: 140px;
    animation-name:moveIn;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-timing-function:ease-in-out;
  }

  @keyframes moveIn{
    0%{
      opacity: 0;
      transform: translateX(100%) translateY(-20%);
    }
    50%{
      transform: translateX(0);
    }
  }

  .game-over .rankDescribe {
    font-style: normal;
    font-weight: 700;
    font-size: 1.2em;
    line-height: 22px;
    color: #C4C4C4;
  }

  .game-over .rank {
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 43px;
    color: #FFFFFF;
  }

  .list-text {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    color: #C4C4C4;

    margin-bottom: 0;
  }

  .m-r-12 {
    margin-right:  12px;
  }

  .m-l-12 {
    margin-left: 12px;
  }

  .list-hr {
    color: #C4C4C4;
  }
</style>