<script setup lang="ts">

</script>

<template>
    <p>選擇模式</p>
    <div>
        <button @click="$router.push({ name: 'setup.single' })">
          單機模式
        </button>
        <button @click="$router.push({ name: 'setup.multiplayer' })">
          多人競賽
        </button>
    </div>
</template>

<style scoped>

</style>