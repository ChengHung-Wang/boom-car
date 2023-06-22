<script setup lang="ts">
// Library
import {onMounted, Ref, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import device from "current-device";
import {RouterView} from "vue-router";

// Service
import * as GameService from "@/services/racer.js"
import {racer} from "@/services/racer.js";
import {useGameStore} from "@/stores/game";
import {constants} from "@/services/constants";

// Components
import NicknameInput from "@/components/NicknameInput.vue";
import Setup from "@/components/GameMode/Setup.vue";
import Navbar from "@/components/Navbar.vue";
import Dashboard from "@/components/Dashboard.vue";
import MiniMap from "@/components/MiniMap.vue";
import CameraSetting from "@/components/CameraSetting.vue";
import TurboBox from "@/components/TurboBox.vue";


const gameCanvas: Ref<HTMLCanvasElement | undefined> = ref();
const gameStore = useGameStore();

const {t, locale} = useI18n();

gameStore.mobile = device.mobile();

function startGame(trackNumber: number): void {
  gameStore.gameStarted = true;
  GameService.racer.startGame(trackNumber);
  if (gameStore.mobile) {
    GameService.racer.player.setAccelerate(true);
  }
}


function openInNewTab(url) {
  window.open(url, '_blank', 'noreferrer');
}

onMounted(() => {
  if (gameCanvas.value != undefined) {
    gameCanvas.value.width = document.documentElement.clientWidth;
    gameCanvas.value.height = document.documentElement.clientHeight;
    GameService.racer.canvas.value = gameCanvas.value;
    GameService.racer.context.value = (GameService.racer.canvas.value).getContext('2d');
    GameService.init();
    gameStore.camera.y = racer.camera.yOffset;
    gameStore.camera.z = racer.camera.zOffset;
  }
});

watch(
    gameStore.camera, () => {
      if (gameStore.gameStarted) {
        racer.camera.adjust(gameStore.camera.y, gameStore.camera.z);
      }
    }, {deep: true})

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
})

function left(touch: boolean) {
  if (touch) {
    GameService.racer.player.setTurnLeft(true);
  } else {
    GameService.racer.player.setTurnLeft(false);
  }
}

function turbo(touch : boolean) {
  if (touch) {
    GameService.racer.player.setTurbo(true);
  } else {
    GameService.racer.player.setTurbo(false);
  }
}
function right(touch : boolean) {
  if (touch) {
    GameService.racer.player.setTurnRight(true);
  } else {
    GameService.racer.player.setTurnRight(false);
  }
}

const Title = ['',
  'Desktop.SelectMode.select_mode',
  'Desktop.SinglePlayer.single_player',
  'Desktop.MultiPlayer.multi_player',
  'Desktop.MultiPlayer.multi_player'
]

</script>
<template>
  <div id="game">
    <canvas ref="gameCanvas"></canvas>
    <div class="container" v-if="(!gameStore.gameStarted) && (gameStore.viewSelect == 0)">
      <nav class="focus-display">
        <select v-model="locale">
          <option>tw</option>
          <option>en</option>
        </select>
      </nav>
      <div class="row">
        <div class="col-12 fsc h-100vh">
          <div class="h-60vh fcc f-wrap">
            <img src="../assets/icon/boom-car-icon.svg" alt="" style="align-self:flex-start">
            <div style="width: 100%">
              <NicknameInput/>
            </div>
            <el-button class="el-btn-custom "
                       size="large"
                      @click="$router.push('/menu'); gameStore.viewSelect = 1"
            >
              <span class="color-text-white"> {{ t("Desktop.StartPage.enter_event") }}</span>
            </el-button>
            <el-button
                class="github-icon"
                @click="openInNewTab('https://github.com/ChengHung-Wang/boom-car')">
              <img src="../assets/icon/github-icon.svg" alt="">
              <a href=""></a>
            </el-button>
          </div>
        </div>
      </div>
    </div>



    <div v-if="!gameStore.gameStarted && (gameStore.viewSelect > 0)">
      <div class="frame">
        <Navbar :title="t(Title[gameStore.viewSelect])" />
        <RouterView />
      </div>
    </div>



    <div class="" v-if="gameStore.gameStarted">
      <Dashboard/>
      <MiniMap/>
      <CameraSetting/>
      <TurboBox/>

      <div class="control-panel" v-if="gameStore.mobile">
        <button class="turbo-btn" @touchstart="turbo(true)" @touchend="turbo(false)">
          <svg width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="path-1-inside-1_885_8094" fill="white">
              <path d="M23.8051 9.90003C23.6933 9.6431 23.5118 9.42262 23.2812 9.26355C23.0505 9.10448 22.7799 9.01319 22.5001 9.00003H15.6301L17.5351 1.89003C17.5957 1.66754 17.6043 1.43406 17.5601 1.20773C17.5158 0.981395 17.42 0.768309 17.2801 0.585025C17.1403 0.403503 16.9609 0.256398 16.7555 0.154992C16.55 0.0535868 16.3241 0.000575849 16.0951 2.52284e-05H5.59506C5.25642 -0.0115746 4.92382 0.0918249 4.65144 0.293383C4.37907 0.494941 4.18296 0.782782 4.09506 1.11003L0.0750603 16.11C0.0143885 16.3325 0.0058329 16.566 0.0500585 16.7923C0.0942841 17.0187 0.190099 17.2317 0.33006 17.415C0.471338 17.5986 0.653199 17.7469 0.861392 17.8484C1.06958 17.9499 1.29845 18.0018 1.53006 18H7.33506L4.62006 28.11C4.53111 28.436 4.55484 28.7825 4.68741 29.0934C4.81999 29.4042 5.05364 29.6612 5.3505 29.8226C5.64736 29.9841 5.99004 30.0405 6.32302 29.9829C6.65599 29.9253 6.95974 29.7569 7.18506 29.505L23.5351 11.505C23.7297 11.2919 23.8588 11.027 23.9067 10.7423C23.9546 10.4576 23.9193 10.1652 23.8051 9.90003V9.90003ZM9.12006 22.92L10.7251 16.92C10.7857 16.6975 10.7943 16.4641 10.7501 16.2377C10.7058 16.0114 10.61 15.7983 10.4701 15.615C10.3303 15.4335 10.1509 15.2864 9.94546 15.185C9.74005 15.0836 9.51414 15.0306 9.28506 15.03H3.52506L6.73506 3.00003H14.1301L12.2251 10.11C12.1639 10.3366 12.1568 10.5744 12.2042 10.8042C12.2517 11.0341 12.3524 11.2496 12.4983 11.4334C12.6442 11.6172 12.8312 11.7643 13.0443 11.8627C13.2573 11.9611 13.4905 12.0081 13.7251 12H19.0801L9.12006 22.92Z"/>
            </mask>
            <path d="M23.8051 9.90003C23.6933 9.6431 23.5118 9.42262 23.2812 9.26355C23.0505 9.10448 22.7799 9.01319 22.5001 9.00003H15.6301L17.5351 1.89003C17.5957 1.66754 17.6043 1.43406 17.5601 1.20773C17.5158 0.981395 17.42 0.768309 17.2801 0.585025C17.1403 0.403503 16.9609 0.256398 16.7555 0.154992C16.55 0.0535868 16.3241 0.000575849 16.0951 2.52284e-05H5.59506C5.25642 -0.0115746 4.92382 0.0918249 4.65144 0.293383C4.37907 0.494941 4.18296 0.782782 4.09506 1.11003L0.0750603 16.11C0.0143885 16.3325 0.0058329 16.566 0.0500585 16.7923C0.0942841 17.0187 0.190099 17.2317 0.33006 17.415C0.471338 17.5986 0.653199 17.7469 0.861392 17.8484C1.06958 17.9499 1.29845 18.0018 1.53006 18H7.33506L4.62006 28.11C4.53111 28.436 4.55484 28.7825 4.68741 29.0934C4.81999 29.4042 5.05364 29.6612 5.3505 29.8226C5.64736 29.9841 5.99004 30.0405 6.32302 29.9829C6.65599 29.9253 6.95974 29.7569 7.18506 29.505L23.5351 11.505C23.7297 11.2919 23.8588 11.027 23.9067 10.7423C23.9546 10.4576 23.9193 10.1652 23.8051 9.90003V9.90003ZM9.12006 22.92L10.7251 16.92C10.7857 16.6975 10.7943 16.4641 10.7501 16.2377C10.7058 16.0114 10.61 15.7983 10.4701 15.615C10.3303 15.4335 10.1509 15.2864 9.94546 15.185C9.74005 15.0836 9.51414 15.0306 9.28506 15.03H3.52506L6.73506 3.00003H14.1301L12.2251 10.11C12.1639 10.3366 12.1568 10.5744 12.2042 10.8042C12.2517 11.0341 12.3524 11.2496 12.4983 11.4334C12.6442 11.6172 12.8312 11.7643 13.0443 11.8627C13.2573 11.9611 13.4905 12.0081 13.7251 12H19.0801L9.12006 22.92Z" fill="#D9D9D9"/>
            <path d="M22.5001 9.00003L23.0358 -2.38738L22.7681 -2.39997H22.5001V9.00003ZM15.6301 9.00003L4.61846 6.04966L0.773532 20.4H15.6301V9.00003ZM17.5351 1.89003L6.53667 -1.10921L6.53001 -1.08479L6.52346 -1.06034L17.5351 1.89003ZM17.2801 0.585025L26.3405 -6.33374L26.327 -6.35137L26.3135 -6.36894L17.2801 0.585025ZM16.0951 2.52284e-05L16.1225 -11.3999L16.1088 -11.4H16.0951V2.52284e-05ZM5.59506 2.52284e-05L5.2048 11.3933L5.39987 11.4H5.59506V2.52284e-05ZM4.09506 1.11003L-6.91468 -1.84729L-6.91635 -1.84103L4.09506 1.11003ZM0.0750603 16.11L11.0735 19.1093L11.08 19.0852L11.0865 19.0611L0.0750603 16.11ZM0.33006 17.415L-8.73033 24.3338L-8.71698 24.3513L-8.70357 24.3687L0.33006 17.415ZM1.53006 18V6.60003H1.48687L1.44369 6.60035L1.53006 18ZM7.33506 18L18.345 20.9567L22.2004 6.60003H7.33506V18ZM4.62006 28.11L15.618 31.1109L15.624 31.0888L15.63 31.0667L4.62006 28.11ZM7.18506 29.505L-1.25344 21.8401L-1.28234 21.8719L-1.311 21.9039L7.18506 29.505ZM23.5351 11.505L15.1172 3.81735L15.1069 3.82869L15.0966 3.84006L23.5351 11.505ZM9.12006 22.92L-1.89273 19.9741L17.5428 30.6023L9.12006 22.92ZM10.7251 16.92L-0.27333 13.9208L-0.280595 13.9474L-0.28773 13.9741L10.7251 16.92ZM10.4701 15.615L19.5304 8.69626L19.517 8.67863L19.5035 8.66106L10.4701 15.615ZM9.28506 15.03L9.31246 3.63006L9.29876 3.63003H9.28506V15.03ZM3.52506 15.03L-7.48956 12.091L-11.3157 26.43H3.52506V15.03ZM6.73506 3.00003V-8.39997H-2.02191L-4.27956 0.0609616L6.73506 3.00003ZM14.1301 3.00003L25.1417 5.95039L28.9866 -8.39997L14.1301 -8.39997V3.00003ZM12.2251 10.11L23.2312 13.0808L23.2339 13.0706L23.2367 13.0604L12.2251 10.11ZM13.7251 12V0.600026H13.5281L13.3312 0.606833L13.7251 12ZM19.0801 12L27.5028 19.6823L44.9075 0.600026H19.0801V12ZM34.2588 5.35262C33.2977 3.14308 31.7369 1.2469 29.7533 -0.121077L16.809 18.6482C15.2867 17.5983 14.0889 16.1431 13.3513 14.4474L34.2588 5.35262ZM29.7533 -0.121077C27.7697 -1.48906 25.4427 -2.27414 23.0358 -2.38738L21.9643 20.3874C20.1172 20.3005 18.3313 19.698 16.809 18.6482L29.7533 -0.121077ZM22.5001 -2.39997H15.6301V20.4H22.5001V-2.39997ZM26.6417 11.9504L28.5467 4.84039L6.52346 -1.06034L4.61846 6.04966L26.6417 11.9504ZM28.5334 4.88926C29.0552 2.9759 29.1288 0.967963 28.7485 -0.978514L6.37166 3.39397C6.07976 1.90015 6.13624 0.359179 6.53667 -1.10921L28.5334 4.88926ZM28.7485 -0.978514C28.3681 -2.92495 27.5441 -4.75749 26.3405 -6.33374L8.21967 7.50379C7.29593 6.29411 6.66355 4.88774 6.37166 3.39397L28.7485 -0.978514ZM26.3135 -6.36894C25.1117 -7.93003 23.5684 -9.19514 21.8019 -10.0672L11.709 10.3772C10.3533 9.70793 9.16892 8.73704 8.24666 7.53899L26.3135 -6.36894ZM21.8019 -10.0672C20.0353 -10.9393 18.0925 -11.3952 16.1225 -11.3999L16.0677 11.4C14.5558 11.3964 13.0648 11.0465 11.709 10.3772L21.8019 -10.0672ZM16.0951 -11.4H5.59506V11.4H16.0951V-11.4ZM5.98532 -11.3933C3.07299 -11.4931 0.212671 -10.6038 -2.12977 -8.87041L11.4327 9.45718C9.63497 10.7875 7.43984 11.4699 5.2048 11.3933L5.98532 -11.3933ZM-2.12977 -8.87041C-4.4722 -7.13701 -6.15873 -4.66157 -6.91467 -1.84729L15.1048 4.06734C14.5247 6.22714 13.2303 8.12689 11.4327 9.45718L-2.12977 -8.87041ZM-6.91635 -1.84103L-10.9364 13.159L11.0865 19.0611L15.1065 4.06108L-6.91635 -1.84103ZM-10.9233 13.1108C-11.4451 15.0242 -11.5187 17.0321 -11.1383 18.9786L11.2385 14.6061C11.5304 16.0999 11.4739 17.6408 11.0735 19.1093L-10.9233 13.1108ZM-11.1383 18.9786C-10.758 20.925 -9.93399 22.7575 -8.73033 24.3338L9.39045 10.4963C10.3142 11.7059 10.9466 13.1123 11.2385 14.6061L-11.1383 18.9786ZM-8.70357 24.3687C-7.48858 25.9471 -5.92457 27.2227 -4.13411 28.0956L5.8569 7.60119C7.23097 8.27105 8.43125 9.25001 9.36369 10.4614L-8.70357 24.3687ZM-4.13411 28.0956C-2.34367 28.9684 -0.375408 29.4148 1.61643 29.3997L1.44369 6.60035C2.97231 6.58877 4.48284 6.93134 5.8569 7.60119L-4.13411 28.0956ZM1.53006 29.4H7.33506V6.60003H1.53006V29.4ZM-3.67485 15.0434L-6.38985 25.1534L15.63 31.0667L18.345 20.9567L-3.67485 15.0434ZM-6.37788 25.1091C-7.14288 27.9128 -6.93878 30.8926 -5.79863 33.5658L15.1735 24.6209C16.0485 26.6724 16.2051 28.9593 15.618 31.1109L-6.37788 25.1091ZM-5.79863 33.5658C-4.65849 36.239 -2.64911 38.4488 -0.0961003 39.8373L10.7971 19.8079C12.7564 20.8735 14.2985 22.5694 15.1735 24.6209L-5.79863 33.5658ZM-0.0961003 39.8373C2.45692 41.2258 5.40397 41.7115 8.26754 41.2158L4.37849 18.75C6.57611 18.3695 8.83781 18.7423 10.7971 19.8079L-0.0961003 39.8373ZM8.26754 41.2158C11.1311 40.7201 13.7434 39.272 15.6811 37.1061L-1.311 21.9039C0.176093 20.2417 2.18087 19.1304 4.37849 18.75L8.26754 41.2158ZM15.6236 37.17L31.9736 19.17L15.0966 3.84006L-1.25344 21.8401L15.6236 37.17ZM31.9529 19.1927C33.6272 17.3594 34.7368 15.0818 35.1487 12.6335L12.6646 8.85114C12.9807 6.9722 13.8323 5.22433 15.1172 3.81735L31.9529 19.1927ZM35.1487 12.6335C35.5606 10.1852 35.2572 7.66996 34.2749 5.38971L13.3352 14.4103C12.5814 12.6604 12.3485 10.7301 12.6646 8.85114L35.1487 12.6335ZM20.1329 25.8659L21.7378 19.8659L-0.28773 13.9741L-1.89273 19.9741L20.1329 25.8659ZM21.7234 19.9193C22.2452 18.0059 22.3188 15.998 21.9385 14.0515L-0.43834 18.424C-0.730235 16.9302 -0.673756 15.3892 -0.27333 13.9208L21.7234 19.9193ZM21.9385 14.0515C21.5581 12.105 20.7341 10.2725 19.5304 8.69626L1.40967 22.5338C0.485943 21.3241 -0.146447 19.9178 -0.43834 18.424L21.9385 14.0515ZM19.5035 8.66106C18.3017 7.09999 16.7584 5.83487 14.9919 4.96277L4.89905 25.4072C3.54331 24.7379 2.3589 23.767 1.43666 22.569L19.5035 8.66106ZM14.9919 4.96277C13.2253 4.09067 11.2825 3.63479 9.31246 3.63006L9.25766 26.43C7.7458 26.4264 6.2548 26.0765 4.89905 25.4072L14.9919 4.96277ZM9.28506 3.63003H3.52506V26.43H9.28506V3.63003ZM14.5397 17.9691L17.7497 5.93909L-4.27956 0.0609616L-7.48956 12.091L14.5397 17.9691ZM6.73506 14.4H14.1301V-8.39997H6.73506V14.4ZM3.11846 0.0496587L1.21346 7.15966L23.2367 13.0604L25.1417 5.95039L3.11846 0.0496587ZM1.21896 7.13922C0.692969 9.08787 0.631588 11.1327 1.0397 13.1094L23.3687 8.4991C23.6819 10.016 23.6348 11.5853 23.2312 13.0808L1.21896 7.13922ZM1.0397 13.1094C1.44782 15.086 2.31407 16.9393 3.56881 18.5203L21.4278 4.34651C22.3907 5.55981 23.0555 6.98212 23.3687 8.4991L1.0397 13.1094ZM3.56881 18.5203C4.82353 20.1013 6.43172 21.3657 8.26408 22.2121L17.8244 1.51329C19.2307 2.1628 20.4649 3.13322 21.4278 4.34651L3.56881 18.5203ZM8.26408 22.2121C10.0964 23.0584 12.1018 23.463 14.119 23.3932L13.3312 0.606833C14.8792 0.553313 16.4182 0.863782 17.8244 1.51329L8.26408 22.2121ZM13.7251 23.4H19.0801V0.600026H13.7251V23.4ZM10.6573 4.31775L0.697318 15.2377L17.5428 30.6023L27.5028 19.6823L10.6573 4.31775Z" fill="#D9D9D9" mask="url(#path-1-inside-1_885_8094)"/>
          </svg>
        </button>
        <div class="fac" style="top:30vw">
          <button class="dir-btn" @touchstart="left(true)" @touchend="left(false)">
            <svg width="32" height="47" viewBox="0 0 32 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.2727 0L0 23.2727L23.2727 46.5455L32 37.8182L17.4545 23.2727L32 8.72727L23.2727 0Z"
                    fill="#C7C7C7"/>
            </svg>
          </button>
          <button class="dir-btn" @touchstart="right(true)" @touchend="right(false)">
            <svg width="32" height="47" viewBox="0 0 32 47" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M8.72727 46.5455L32 23.2727L8.72727 1.52588e-05L0 8.72729L14.5455 23.2727L0 37.8182L8.72727 46.5455Z"
                  fill="#C7C7C7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
canvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  inset: 0;
}

.title-card {
  backdrop-filter: saturate(180%);
//background: rgba(0, 0, 0, 0.3); padding: 15px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;

}

.fcc {
  display: flex;
  align-items: center;
  justify-content: center;
}

.f-wrap {
  flex-wrap: wrap;
}

.fsc {
  display: flex;
  align-items: center;
  justify-content: start;
}

.fac {
  display: flex;
  align-items: center;
  justify-content: space-around;
}


.h-100vh {
  height: 100vh;
}

.h-60vh {
  height: 60vh;
}

.focus-display {
  position: fixed;
  inset: 0;
  color: rgb(128, 128, 128);
  font-size: 24px;
}

.control-panel {
  position: fixed;
  bottom: 0;
  height: 40%;
  width: 100%;
}

.dir-btn {
  height: 82px;
  width: 76px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  border-radius: 8px;
}
.dir-btn::after {
  border: 1px solid;
  border-image-source: linear-gradient(180deg, rgba(199, 199, 199, 0.9) 0%, rgba(199, 199, 199, 0.2) 100%);
}
.turbo-btn {
  box-sizing: border-box;
  margin-right: 12px;
  position: absolute;
  right: 0;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.turbo-btn::after {
  border: 1px solid;
  border-image-source: linear-gradient(180deg, rgba(199, 199, 199, 0.9) 0%, rgba(199, 199, 199, 0.2) 100%);
}
</style>