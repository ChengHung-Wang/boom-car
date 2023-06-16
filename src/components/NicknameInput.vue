<script setup lang="ts">
import i18n from '@/services/i18n'
import {useGameStore} from "@/stores/game";
import {useSocketStore} from "@/stores/socket";

const socketStore = useSocketStore();
const { t } = i18n.global

const gameStore = useGameStore()
</script>

<template>
    <el-input class="el-input-custom"
      v-model="socketStore.nickname"
      maxlength="10"
      :placeholder="t('Desktop.StartPage.enter_nickname')"
      size="large"
      type="text"
    >
      <template #prepend > {{ t("Desktop.StartPage.nickname") }} </template>
    </el-input>
    <span class="limit-text" > {{ t("Desktop.StartPage.nickname_limit")}}  </span>
</template>

<style scoped>

  .limit-text {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 23px;
    text-align: center;
    letter-spacing: 0.5px;
    color: #737373;
  }
</style>
