<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import {useGameStore} from "@/stores/game";
const gameStore = useGameStore();

const { t } = useI18n();

const settingOpen = ref(false);
</script>

<template>
  <div class="camera fcc" v-if="!settingOpen">
    <button class="camera-btn" @click="settingOpen = true">
      <img class="icon" src="@/assets/icon/camera-icon.png" alt="">
    </button>
  </div>
  <el-drawer class="camera-setting" v-model="settingOpen" title="I am the title" :with-header="false">
    <div class="fcc" style="width: 100%; height: 100%">
      <div class="col-4" style="width: 100%;">
        <span class="text"> {{ t("Desktop.GamingProcess.camera_height") }} </span>
        <el-slider class="slider" v-model="gameStore.camera.y" :min="300" :max="10000" />
      </div>
      <div class="col-4" style="width: 100%;">
        <span class="text"> {{ t("Desktop.GamingProcess.car_distance") }} </span>
        <el-slider class="slider" v-model="gameStore.camera.z" :min="300" :max="10000" />
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
  .camera {
    position: absolute;
    height: 42px;
    width: 59px;
    right: 0;
    top: 23px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 8px 0px 0px 8px;
  }
  .camera .icon {
    width: 28px;
    height: 28px;
  }
  .camera-btn {
    background: none !important;
    border: none !important;
  }

  .camera-setting {
    //position: absolute;
    //height: 200px;
    //width: 336px;
    right: 0;
    top: 23px;
    background: #252525;
    backdrop-filter: blur(10px) saturate(180%);
    -webkit-backdrop-filter: blur(10px) saturate(180%);
    border-radius: 8px 0px 0px 8px;
    z-index: 5;
  }
  .camera-setting .text {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;
  }
  .camera-setting .slider {
  }

</style>