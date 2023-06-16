import Setup from '@/views/Setup.vue'
const setupRouterConfig = [
    {
        path: "menu",
        name: "Menu",
        component: () => import("@/views/GameMode/GameMenu.vue")
    },
    {
        path: "single", // url: /setup/single/
        name: "Single",
        component: () => import("@/views/GameMode/SinglePlayer/SinglePlayerMode.vue"),
    },
    {
        path: "multiplayer/connection",
        name: "Connection",
        component: () => import("@/views/GameMode/Multiplayer/BuildConnections.vue"),
    },
    {
        path: "multiplayer/match",
        name: "Match",
        component: () => import("@/views/GameMode/Multiplayer/MatchMaking.vue")
    }
]
export default setupRouterConfig;
