<script setup lang="ts">
import { useGameStore } from "@/stores/game";
import { useSocketStore } from "@/stores/socket";
import { helper } from "@/services/racer";
import SocketSender from "@/helper/socketSender";
const gameStore = useGameStore();
const socketStore = useSocketStore();

const connectJoin = () => {
  helper.socket.init();
  helper.socket.start();
  (new SocketSender()).joinEvent();
}
</script>

<template>
  <div>
    <br><br><br>
    <input type="text" v-model="socketStore.socketServerUrl" placeholder="server address">
    <input type="text" v-model="socketStore.eventCode" placeholder="event code">
    <input type="button" value="connect" @click="connectJoin">
    <br><br>
    <input type="text" v-model="socketStore.nickname" placeholder="nickname">
    <input type="button" value="set nickname" @click="(new SocketSender()).setNickname()">
    <p>{{ gameStore.clientAmount }}</p>
    <p>{{ socketStore.members }}</p>
  </div>
</template>

<style scoped>

</style>