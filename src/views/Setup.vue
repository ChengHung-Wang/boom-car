<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
  import i18n from '@/services/i18n'

  const { t } = i18n.global
  enum Title {
    Menu = 'Desktop.SelectMode.select_mode',
    Single = 'Desktop.SinglePlayer.single_player',
    Connection = 'Desktop.MultiPlayer.multi_player',
    Match = 'Desktop.MultiPlayer.multi_player',
  }


</script>

<template>
  <div class="frame">
    <Navbar :title="t(Title[$route.name])" />
    <RouterView />
  </div>
</template>

<style scoped>
  .frame {
    position: absolute;
    height: calc(100vh - 80px);
    width: 100%;
    bottom: 0;
    overflow-y: auto;
  }
</style>