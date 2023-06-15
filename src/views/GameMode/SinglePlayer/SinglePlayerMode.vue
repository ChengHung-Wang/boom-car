<script setup lang="ts">

import {ref} from "vue";
import i18n from '@/lang/index'
const { t } = i18n.global
type Track = {
  trackName : string,
  level : string
}

let trackNumber = ref(0)
let trackName : string[] = [TrackName.track1, TrackName.track1, TrackName.track1]

let computerAmount : number = 0
</script>

<template>
    <p>單機模式</p>
    <div>
        <p>場景選擇</p>
        <!--   TODO:接收場景選擇，傳送選項到 "../GameView.vue"  startGame([代號])       -->
        <button @click="trackNumber = 0"> {{ trackName[0] }} </button>
        <button @click="trackNumber = 1"> {{ trackName[1] }} </button>
        <button @click="trackNumber = 2"> {{ trackName[2] }} </button>
        <p>現在選擇的是：{{ trackName[trackNumber] }}</p>
        <p>難度：簡單</p>

        <!--   TODO:接收電腦數量，傳送    -->
        <p>電腦數量</p>
        <input v-model.lazy="computerAmount" type="range" min="0" max="49">
        <p>現在選擇的電腦數量：{{ computerAmount }}</p>
    </div>
</template>

<style scoped>

</style>