<script setup lang="ts">
  const props: any = defineProps(['title'])
</script>

<template>
  <nav>
    <p>icon1</p>
    <p>{{ props.title }}</p>
    <p>icon2</p>
  </nav>
</template>

<style scoped>

</style>