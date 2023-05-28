<script setup lang="ts">
  import matchDisplay from "@/components/MatchDisplay.vue";
</script>

<template>
  <main>
    <p>正在為您配對適合的對手中...</p>
    <p>點擊右上角更換車子樣式讓別人更好的辨識你！</p>
    <matchDisplay />

    <div>
      車子/名字畫面顯示
    </div>

    <!-- TODO:抓取玩家名單動態更新列表   -->
    <ul>
      <li>[玩家名稱1]</li>
      <li>[玩家名稱2]</li>
      <li>[玩家名稱3]</li>
      <li>[玩家名稱4]</li>
      <li>[玩家名稱5]</li>
    </ul>


  </main>

</template>

<style scoped>

</style>