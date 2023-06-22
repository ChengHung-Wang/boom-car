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
  <RouterView />
</template>

<style scoped>

</style>
