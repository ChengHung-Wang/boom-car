import { createRouter, createWebHashHistory } from 'vue-router'
import Setup from '@/components/GameMode/Setup.vue'

import setupRouterConfig from './setup'
import liaoTest from "@/views/liaoTest.vue";
import GameView from "@/views/GameView.vue";
import {useSocketStore} from "@/stores/socket";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: GameView,
      children: [
        ...setupRouterConfig
      ]
    },
    {
      path: "/liao",
      component: liaoTest
    }
  ]
})

router.beforeEach((to, from, next) => {
    // 登入頁（首頁）不用驗證
    if (to.fullPath === '') return;

    if (to.name != "Setup" && (useSocketStore()).nickname == "") {
      next("/");
    }
    next()
});

export default router
