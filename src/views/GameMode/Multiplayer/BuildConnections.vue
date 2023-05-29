<script setup lang="ts">

</script>

<template>
  <div>
    <p>使用此功能必須有 boom car 服務器，如果您不知道服務器位置，
      可以參考[此連結]來自行架設一個服務器。
    </p>
    <p>伺服器位址</p>
    <input type="text" placeholder="請輸入伺服器位址">

    <!--  TODO:與 sever 比對伺服器位址，回傳成功或失敗  -->
    <!--  TODO:增加比對伺服器位址時 Loading 效果，如果成功找到伺服器位址，彈出以下房間代碼選項  -->

    <p>房間代碼</p>
    <input type="text" placeholder="請輸入房間代碼">
    <button @click="$router.push({ name: 'setup.match' })">進入遊戲</button>
    <!--  TODO:與 sever 比對房間代碼是否正確，回傳成功或失敗  -->
    <!--  TODO:增加比對房間代碼時 Loading 效果，如果成功找到房間代碼，跳轉畫面  -->

  </div>
</template>

<style scoped>

</style>