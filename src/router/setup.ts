import Setup from '@/components/GameMode/Setup.vue'
const setupRouterConfig = [
    {
        path: "menu",
        name: "Menu",
        component: () => import("@/components/GameMode/GameMenu.vue")
    },
    {
        path: "single", // url: /setup/single/
        name: "Single",
        component: () => import("@/components/GameMode/SinglePlayer/SinglePlayerMode.vue"),
    },
    {
        path: "multiplayer/connection",
        name: "Connection",
        component: () => import("@/components/GameMode/Multiplayer/BuildConnections.vue"),
    },
    {
        path: "multiplayer/match",
        name: "Match",
        component: () => import("@/components/GameMode/Multiplayer/MatchMaking.vue")
    }
]
export default setupRouterConfig;
