<script setup lang="ts">
import i18n from '@/services/i18n'
import {useGameStore} from "@/stores/game";
import {useSocketStore} from "@/stores/socket";

const socketStore = useSocketStore();
const { t } = i18n.global

const gameStore = useGameStore()
</script>

<template>
    <el-input class="el-input-custom w-100"
      v-model="socketStore.nickname"
      maxlength="10"
      size="large"
      type="text"
      :placeholder="t('Desktop.StartPage.enter_nickname')"
    >
      <template #prepend > {{ t("Desktop.StartPage.nickname") }} </template>
    </el-input>
    <span class="limit-text w-100 text-start mb-4" > {{ t("Desktop.StartPage.nickname_limit")}}  </span>
</template>

<style scoped>

  .limit-text {
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 23px;
    text-align: center;
    letter-spacing: 0.5px;
    color: rgba(150, 90, 90);
  }
</style>
