<script setup lang="ts">
import {useGameStore} from "../stores/game";
</script>

<template>
  <div class="countdown-background"></div>
  <div class="countdown">
    <p class="race-text w-100">The race</p>
    <p class="start-text w-100">starts in</p>
    <p class="number-text w-100"> {{ (useGameStore()).countdownNumber }} </p>
  </div>
</template>

<style scoped>
.countdown-background {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .7);
  backdrop-filter: saturate(180%) blur(2px);
  border-radius: 8px;
  z-index: 10;
}

.countdown {
  position: absolute;
  font-style: normal;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #FFFFFF;
  z-index: 12;
  height: 100vh;

  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}

.countdown .race-text {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align:center
}

.countdown .start-text {
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  text-align:center
}

.countdown .number-text {
  font-style: normal;
  font-weight: 900;
  font-size: 130px;
  line-height: 156px;
  text-align:center
}
</style>