<script setup lang="ts">
import {onMounted, Ref, ref, watch} from "vue";
import {useGameStore} from "@/stores/game";
import {racer} from "@/services/racer";
const gameStore = useGameStore();

console.log(gameStore.turboAmount)
</script>

<template>
  <div class="turbo-background">
    <div class="flex">
      <div class="flex">
        <img src="src/assets/icon/Power-icon.svg" alt="">
      </div>
      <div class="bar">
        <span class="progress" :style="{'height':`${gameStore.turboAmount}%`}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.turbo-background {
  position: absolute;
  height: 145px;
  width: 59px;
  right: 0;
  top: 83px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px 0px 0px 8px;
}

.flex{
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.bar{
  height: 96px;
  width: 40px;
  border-radius: 8px;
  margin:5px auto;
  overflow: hidden;
  position: relative;
  border: 2px solid #D9D9D9;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
}

.bar .progress {
  position: absolute;
  height: 100%;
  width: 100%;
  display: block;
  border-radius: 6px;
  -o-transition: height 2s ease-out;
  transition: height 2s ease-out;
  border: 2px solid rgba(0, 0, 0);
}
</style>