<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar :title="$route.name" />
    <RouterView />
    <router-link :to="{ name: 'setup.single' }">click me</router-link>
  </div>
</template>

<style scoped>

</style>