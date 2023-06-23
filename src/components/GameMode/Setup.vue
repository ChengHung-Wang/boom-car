<script setup lang="ts">
  import i18n from '@/services/i18n'
  import {useGameStore} from "@/stores/game";
  import NicknameInput from "@/components/NicknameInput.vue";
  import {backgroundMusic} from "@/services/audio";
  import router from "@/router";

  const { t } = i18n.global
  const gameStore = useGameStore()

  function openInNewTab(url) {
    window.open(url, '_blank', 'noreferrer');
  }
</script>

<template>
  <div class="container">
    <div class="row fcc" style="height: 100vh;">
      <div class="col-sm-12 fcc">
        <img class="w-75" style="margin-bottom: 120px;" src="/src/assets/icon/boom-car-icon.png" alt="">
        <NicknameInput/>
        <el-button class="el-btn-custom mb-5 click"
                   size="large"
                   @click="router.push('/menu'); backgroundMusic(true, true);"
        >
          <span class="color-text-white"> {{ t("Desktop.StartPage.enter_event") }}</span>
        </el-button>
        <el-button
            class="github-icon"
            @click="openInNewTab('https://github.com/ChengHung-Wang/boom-car')">
          <img src="/src/assets/icon/github-icon.svg" alt="">
          <a href=""></a>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .github-icon {
    width: 48px;
    height: 48px;
    background: #333333;
    border: none;
    backdrop-filter: blur(8px);
    border-radius: 8px;
    padding: 0;
    margin-left: 0 !important;
  }
</style>