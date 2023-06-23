<script setup lang="ts">
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n();

</script>

<template>
  <button class="lang" v-if="locale == 'tw'" @click="locale = 'en'">
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4167 7.33334L18.0833 16.5H16.2875L15.2867 14H11.8783L10.8792 16.5H9.08416L12.75 7.33334H14.4167ZM7.33332 0.666672V2.33334H12.3333V4.00001H10.6933C10.0505 5.93507 9.02455 7.72085 7.67666 9.25084C8.27774 9.78718 8.92972 10.2636 9.62332 10.6733L8.99749 12.2383C8.10209 11.7305 7.26465 11.1267 6.49999 10.4375C5.01131 11.7848 3.24836 12.7935 1.33249 13.3942L0.885823 11.7867C2.52735 11.2633 4.04001 10.3995 5.32499 9.25167C4.3739 8.17495 3.58171 6.96773 2.97249 5.66667H4.83916C5.30362 6.52405 5.86054 7.32801 6.49999 8.06417C7.54174 6.86342 8.36274 5.48776 8.92499 4.00084L0.666656 4.00001V2.33334H5.66666V0.666672H7.33332ZM13.5833 9.7375L12.5442 12.3333H14.6208L13.5833 9.7375Z" fill="#C4C4C4"/>
    </svg>
    <span class="text">zh-tw</span>
  </button>
  <button class="lang" v-if="locale == 'en'" @click="locale = 'tw'">
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4167 7.33334L18.0833 16.5H16.2875L15.2867 14H11.8783L10.8792 16.5H9.08416L12.75 7.33334H14.4167ZM7.33332 0.666672V2.33334H12.3333V4.00001H10.6933C10.0505 5.93507 9.02455 7.72085 7.67666 9.25084C8.27774 9.78718 8.92972 10.2636 9.62332 10.6733L8.99749 12.2383C8.10209 11.7305 7.26465 11.1267 6.49999 10.4375C5.01131 11.7848 3.24836 12.7935 1.33249 13.3942L0.885823 11.7867C2.52735 11.2633 4.04001 10.3995 5.32499 9.25167C4.3739 8.17495 3.58171 6.96773 2.97249 5.66667H4.83916C5.30362 6.52405 5.86054 7.32801 6.49999 8.06417C7.54174 6.86342 8.36274 5.48776 8.92499 4.00084L0.666656 4.00001V2.33334H5.66666V0.666672H7.33332ZM13.5833 9.7375L12.5442 12.3333H14.6208L13.5833 9.7375Z" fill="#C4C4C4"/>
    </svg>
    <span class="text">en-us</span>
  </button>
</template>

<style scoped>
  .lang {
    border: 1px solid #C4C4C4;
    border-radius: 18px;
    padding: 0 12px;
    //position: fixed;
    //left: 50%;
    //bottom: 30px;
    //transform: translateX(-50%);
    background: none;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
  }
  .lang .text {
    font-style: normal;
    font-weight: 500;
    font-size: 0.7em;
    text-align: center;
    padding-left: 8px;
    color: #FFFFFF;
    line-height: 26px;
  }
  button> * {
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    pointer-events: none;
  }
</style>