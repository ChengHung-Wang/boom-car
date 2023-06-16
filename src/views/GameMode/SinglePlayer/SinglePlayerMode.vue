<script setup lang="ts">

import {ref} from "vue";
import i18n from '@/services/i18n'

const { t } = i18n.global

type Track = {
  trackName : string,
  level : string
}

let trackNumber = ref(0)
let computerAmount = ref(0)
</script>

<template>
    <p>單機模式</p>
    <div>
        <p>場景選擇</p>
        <!--   TODO:接收場景選擇，傳送選項到 "../GameView.vue"  startGame([代號])       -->
        <el-radio-group v-model="trackNumber" size="large">
          <el-radio-button label=0 > {{ t("Desktop.SinglePlayer.easy_theme") }} </el-radio-button>
          <el-radio-button label=1 > {{ t("Desktop.SinglePlayer.medium_theme") }} </el-radio-button>
          <el-radio-button label=2 > {{ t("Desktop.SinglePlayer.hard_theme") }} </el-radio-button>
        </el-radio-group>
        <!--   TODO:接收電腦數量，傳送    -->
        <p>電腦數量</p>
        <input v-model.lazy="computerAmount" type="range" min="0" max="14">
        <p>現在選擇的電腦數量：{{ computerAmount }}</p>
    </div>
</template>

<style scoped>

</style>