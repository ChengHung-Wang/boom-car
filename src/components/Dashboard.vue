<script setup lang="ts">
import {useGameStore} from "@/stores/game";
import {ref} from "vue";
const gameStore = useGameStore();

const percentage = ref(100);
</script>

<template>
  <div class="dashboard">
    <div class="circle">
      <div class="ranking fcc">
        <div>
          <div class="title">{{ gameStore.rank }}</div>
          <span v-if="gameStore.rank == 1">st</span>
          <span v-if="gameStore.rank == 2">nd</span>
          <span v-if="gameStore.rank == 3">rd</span>
          <span v-if="gameStore.rank > 3">th</span>
        </div>
      </div>
      <el-progress :stroke-width="8" :width="87" :color="'#7A43EF'" type="circle" :percentage="parseInt(percentage)" />
    </div>
    <div class="speed-and-time fcc">
      <div>
        <div class="fsc text-white mb-2">
          <el-icon><Odometer /></el-icon>
          <span>{{ gameStore.speed }} km/h</span>
        </div>
        <div class="fsc text-white">
          <el-icon><Timer /></el-icon>
          <span>{{ gameStore.lapTime }} s</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fcc {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.fsc {
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
}
.dashboard {
  width: 210px;
  height: 87px;
  position: relative;
}
.dashboard .speed-and-time {
  width: 160px;
  height: 73px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, .5);
  border-radius: 8px;
  backdrop-filter: saturate(180%) blur(30px);
  -webkit-backdrop-filter: saturate(180%) blur(30px);
  z-index: 1;
}
.dashboard .speed-and-time .el-icon>svg,
.dashboard .speed-and-time .el-icon {
  width: 22px;
  height: 22px;
  color: white;
}
.dashboard .speed-and-time .el-icon {
  margin-right: 6px;
  margin-left: 30px;
}

.dashboard .speed-and-time span {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #D9D9D9;
}

.circle {
  width: 87px;
  height: 87px;
  position: relative;
  z-index: 3;
}
.circle::after {
  content: url("data:image/svg+xml, %3Csvg%20viewBox=%220%200%201024%201024%22%20xmlns=%22http://www.w3.org/2000/svg%22%20data-v-ea893728=%22%22%3E%3Cpath%20fill=%22currentColor%22%20d=%22M529.408%20149.376a29.12%2029.12%200%200%201%2041.728%200%2030.592%2030.592%200%200%201%200%2042.688L259.264%20511.936l311.872%20319.936a30.592%2030.592%200%200%201-.512%2043.264%2029.12%2029.12%200%200%201-41.216-.512L197.76%20534.272a32%2032%200%200%201%200-44.672l331.648-340.224zm256%200a29.12%2029.12%200%200%201%2041.728%200%2030.592%2030.592%200%200%201%200%2042.688L515.264%20511.936l311.872%20319.936a30.592%2030.592%200%200%201-.512%2043.264%2029.12%2029.12%200%200%201-41.216-.512L453.76%20534.272a32%2032%200%200%201%200-44.672l331.648-340.224z%22%3E%3C/path%3E%3C/svg%3E");
  padding: 4px;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: #67CE67;
  transform: rotate(90deg);
}
.ranking {
  position: absolute;
  width: 73px;
  height: 73px;
  background-color: white;
  z-index: 1;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.ranking .title {
  font-style: normal;
  font-weight: 800;
  font-size: 36px;
  line-height: 30px;
  width: 100%;
  text-align: center;
}
.ranking span {
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  color: #2D2D2D;
  width: 100%;
  text-align: center;
  display: block;
}
</style>