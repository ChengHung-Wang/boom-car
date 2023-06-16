<script setup lang="ts">
import Card from "@/components/Card.vue";
import i18n from '@/services/i18n'

const { t } = i18n.global
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <router-link to="/setup/single" tag="button">
          <Card :title="t('Desktop.SelectMode.single_player')" :description="t('Desktop.SelectMode.single_player_annotation')" img="../src/assets/picture/single-card-image.png"></Card>
        </router-link>
        <router-link to="/setup/multiplayer/connection" tag="button">
          <Card :title="t('Desktop.SelectMode.multi_player')" :description="t('Desktop.SelectMode.multi_player_annotation')" img="../src/assets/picture/multiplayer-card-image.png"></Card>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>