<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
  import i18n from '@/services/i18n'
  import {useGameStore} from "@/stores/game";
  import SinglePlayerMode from "@/components/GameMode/SinglePlayer/SinglePlayerMode.vue";
  import GameMenu from "@/components/GameMode/GameMenu.vue";
  import {RouterView} from "vue-router";

  const { t } = i18n.global
  // enum Title {
  //   Menu = 'Desktop.SelectMode.select_mode',
  //   Single = 'Desktop.SinglePlayer.single_player',
  //   Connection = 'Desktop.MultiPlayer.multi_player',
  //   Match = 'Desktop.MultiPlayer.multi_player',
  // }
  const Title = ['',
    'Desktop.SelectMode.select_mode',
    'Desktop.SinglePlayer.single_player',
    'Desktop.MultiPlayer.multi_player',
    'Desktop.MultiPlayer.multi_player'
  ]

  const gameStore = useGameStore()


</script>

<template>
  <div class="frame">
    <Navbar :title="t(Title[gameStore.modeSelect])" />
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