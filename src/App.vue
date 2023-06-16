<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted} from "vue";
import { helper } from "@/services/racer";
function start()
{
    helper.socket.init();
    helper.socket.start();
}
import device from "current-device";
import {useGameStore} from "@/stores/game";

onMounted(() => {
  (useGameStore()).mobile = !device.desktop();
})
</script>

<template>
  <header>
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

    <div class="wrapper">
<!--      <HelloWorld msg="You did it!" />-->
<!--      <img src="@/components/icons/boom-car-icon.svg" alt="">-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
