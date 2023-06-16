<script setup lang="ts">

</script>

<template>
  <div class="mini-map">
<!--    <div class="back">-->
    I am mini map
<!--    </div>-->
  </div>
</template>

<style scoped>
.mini-map {
  left: 0;
  top: 2vh;
  height: 120px;
  width: 210px;
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  border-radius: 0 8px 8px 0;
  z-index: 1;
}
</style>