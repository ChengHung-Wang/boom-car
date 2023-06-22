<script setup lang="ts">
import i18n from '@/services/i18n'
import { ref } from "vue"
import { useSocketStore } from "@/stores/socket";

const { t } = i18n.global

const room_code = ref(0)
const socketStore = useSocketStore();
function checkRoomCode(room_code) {

}
</script>

<template>
  <div class="container" style="top: 100px;">
    <div class="row">
      <div class="col-12 conn">
        <div class="">
          <span class="description">使用此功能必須有 boom car 服務器，如果您不知道服務器位置，
            可以參考
            <a href="https://github.com/ChengHung-Wang/boom-car" > 此連結 </a>
            來自行架設一個服務器。
          </span>
<!--            <el-input class="el-input-custom input" type="text" :placeholder="t('Desktop.MultiPlayer.prompt')">-->
<!--              <template #prepend> {{ t("Desktop.MultiPlayer.server_address") }} </template>-->
<!--            </el-input>-->
            <!--  TODO:與 sever 比對伺服器位址，回傳成功或失敗  -->
            <!--  TODO:增加比對伺服器位址時 Loading 效果，如果成功找到伺服器位址，彈出以下房間代碼選項  -->
            <el-input class="el-input-custom input" type="text" v-model="socketStore.eventCode" :placeholder="t('Desktop.MultiPlayer.prompt')">
              <template #prepend> {{ t("Desktop.MultiPlayer.room_code") }} </template>
            </el-input>
        </div>

        <div class="button">
          <el-button class="el-btn-custom" @click="$router.push('./match')">進入遊戲</el-button>
          <!--  TODO:與 sever 比對房間代碼是否正確，回傳成功或失敗  -->
          <!--  TODO:增加比對房間代碼時 Loading 效果，如果成功找到房間代碼，跳轉畫面  -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .conn {
    height: 60vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }


  .conn .input {
    margin-top: 36px;
  }

  .conn .button {
    align-self: flex-end;
    width: 100%;
  }


</style>
