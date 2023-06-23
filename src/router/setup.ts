import router from "@/router/index";
import {useGameStore} from "@/stores/game";
import type { RouteLocationNormalized } from "vue-router";

const setupRouterConfig = [
    {
        path: "",
        name: "Setup",
        component: () => import("@/components/GameMode/Setup.vue")
    },
    {
        path: "menu",
        name: "Desktop.SelectMode.select_mode",
        component: () => import("@/components/GameMode/GameMenu.vue")
    },
    {
        path: "single", // url: /setup/single/
        name: "Desktop.SinglePlayer.single_player",
        component: () => import("@/components/GameMode/SinglePlayer/SinglePlayerMode.vue"),
    },
    {
        path: "multiplayer/conn",
        name: "Desktop.MultiPlayer.multi_player_conn",
        component: () => import("@/components/GameMode/Multiplayer/BuildConnections.vue"),
    },
    {
        path: "multiplayer/match",
        name: "Desktop.MultiPlayer.multi_player_match",
        component: () => import("@/components/GameMode/Multiplayer/MatchMaking.vue"),
        beforeEnter: (to : RouteLocationNormalized) => {
            to.path = '/multiplayer/conn'
        },
    },
    {
        path: "gameover",
        name: "Desktop.Ranking.game_over",
        component: () => import("@/components/GameMode/GameOver.vue")
    }
]
export default setupRouterConfig;
