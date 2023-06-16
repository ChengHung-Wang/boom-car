import { createRouter, createWebHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'
import Setup from '@/views/Setup.vue'

import setupRouterConfig from './setup'
import LiaoTest from "@/views/liaoTest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GameView
    },
    {
      path: "/setup",
      component: Setup,
      children: [
        ...setupRouterConfig
      ]
    },
    {
      path: "/liao",
      component: LiaoTest
    }
    // {
    //   path: "/teach",
    // }
  ]
})

export default router
