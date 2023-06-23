<script setup lang="ts">
  import matchDisplay from "@/components/MatchDisplay.vue";
  import Card from "@/components/Card.vue";
  import {useGameStore} from "@/stores/game";

  const gameStore = useGameStore();
</script>

<template>
  <div class="row" style="top: 100px;">
    <div class="col-12">
      <span class="description">正在為您配對適合的對手中...</span>
      <br>
<!--        <span class="description">點擊右上角更換車子樣式讓別人更好的辨識你！</span>-->
      <matchDisplay />

      <Card :description="gameStore.nickname" img="/src/assets/picture/car-image.png"></Card>


      <!-- TODO:抓取玩家名單動態更新列表   -->
      <div class="flex-wrap player-list">
        <el-tag
            v-for="item in 10"
            :key="item"
            type="info"
            class="mx-1"
            effect="plain"
            round
        >
          {{ 'Tag ' + item }}
        </el-tag>
      </div>

      <router-link to="/">
          Start
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .player-list {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-content: start;
  }
  .el-tag--plain.el-tag--info {
    --el-tag-bg-color: #252525;
    --el-tag-border-color: #C7C9CC;
    --el-tag-hover-color: #909399;
  }
  .el-tag {
    padding: 5px 12px;
    margin-bottom: 10px;
    gap: 8px;
  }
</style>