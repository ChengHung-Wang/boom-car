<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import {ref} from "vue";
  import LanguageSelector from '@/components/LanguageSelector.vue'
  import {ArrowLeft} from "@element-plus/icons-vue";

  const props: any = defineProps(['title'])
  const size = ref(24)
  const color = ref("#C4C4C4")

  const router = useRouter();

  const previousPage = computed(() => {
    const lastPath = router.options.history.state.back;
    return lastPath ? lastPath : '/';
  });

</script>

<template>
  <div class="container game-nav">
    <div class="row">
      <div class="col-12 fbc">
        <div @click="router.back()">
          <img src="@/assets/icon/return-icon.svg" alt="">
        </div>
        <span class="title">{{ props.title }}</span>
<!--        <el-icon size="24px">-->
<!--          <Setting/>-->
<!--        </el-icon>-->
          <LanguageSelector />
      </div>
    </div>
  </div>

</template>

<style scoped>
.game-nav {
  position: fixed;;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 50px;
  color: #D9D9D9;
  margin-top: 15px;
  z-index: 2;
}
.game-nav .title {
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #D9D9D9;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.game-nav .icon {
  width: 24px;
  height: 24px;
}
</style>