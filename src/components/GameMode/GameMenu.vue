<script setup lang="ts">
import Card from "@/components/Card.vue";
import i18n from '@/services/i18n'

const image = [
    new URL("@/assets/picture/single-card-image.png", import.meta.url),
    new URL("@/assets/picture/multiplayer-card-image.png", import.meta.url)
]

const { t } = i18n.global
</script>

<template>
    <div class="row" style="top: 100px;">
      <div class="col-sm-12">
        <router-link to="/single" tag="button">
          <Card class="click" :title="t('Desktop.SelectMode.single_player')" :description="t('Desktop.SelectMode.single_player_annotation')" :img="image[0]"></Card>
        </router-link>
      </div>
      <div class="col-sm-12">
        <router-link to="/multiplayer/conn" tag="button">
          <Card class="click" :title="t('Desktop.SelectMode.multi_player')" :description="t('Desktop.SelectMode.multi_player_annotation')" :img="image[1]"></Card>
        </router-link>
      </div>
    </div>
</template>

<style scoped>

</style>