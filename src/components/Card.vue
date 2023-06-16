<script setup lang="ts">
const props = defineProps(['title', 'description', 'img'])

console.log(props)
</script>

<template>
  <div class="menu-card" v-bind:style="{backgroundImage: 'url(' + props.img + ')'}">
    <div class="content">
      <div class="title">{{ props.title }}</div>
      <div class="description">{{ props.description }}</div>
    </div>
  </div>
</template>

<style scoped>

  .menu-card {
    width: 100%;
    height: 240px;
    border-radius: 20px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    border: 0.5px solid #606266;
    margin-bottom: 32px;
    background-color: rgb(0, 0, 0, 0%);
  }
  .menu-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(359.56deg, #000000 36.72%, rgba(54, 54, 54, 0) 99.6%);
    opacity: 0.6;
  }
  .menu-card .title {
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 43px;
    text-align: center;
    margin-bottom: 5px;
  }
  .menu-card .description {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #C4C4C4;
  }
  .menu-card .content {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    color: #ffffff;
    z-index: 99999;
    width: 100%;
    margin-bottom: 30px;
  }
</style>