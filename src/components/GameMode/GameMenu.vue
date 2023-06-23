<script setup lang="ts">
import Card from "@/components/Card.vue";
import i18n from '@/services/i18n'

const { t } = i18n.global
</script>

<template>
    <div class="row" style="top: 100px;">
      <div class="col-sm-12">
        <router-link to="/single" tag="button">
          <Card :title="t('Desktop.SelectMode.single_player')" :description="t('Desktop.SelectMode.single_player_annotation')" img="../src/assets/picture/single-card-image.png"></Card>
        </router-link>
      </div>
      <div class="col-sm-12">
        <router-link to="/multiplayer/conn" tag="button">
          <Card :title="t('Desktop.SelectMode.multi_player')" :description="t('Desktop.SelectMode.multi_player_annotation')" img="../src/assets/picture/multiplayer-card-image.png"></Card>
        </router-link>
      </div>
    </div>
</template>

<style scoped>

</style>