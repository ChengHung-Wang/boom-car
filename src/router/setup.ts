import Setup from '@/views/Setup.vue'
const setupRouterConfig = [
    {
        path: "menu",
        name: "GameMenu",
        component: () => import("@/views/GameMode/GameMenu.vue")
    },
    {
        path: "single", // url: /setup/single/
        name: "setup.single",
        component: () => import("@/views/GameMode/SinglePlayer/SinglePlayerMode.vue"),
    },
    {
        path: "multiplayer/connection",
        name: "setup.multiplayer",
        component: () => import("@/views/GameMode/Multiplayer/BuildConnections.vue"),
    },
    {
        path: "multiplayer/match",
        name: "setup.match",
        component: () => import("@/views/GameMode/Multiplayer/MatchMaking.vue")
    }
]
export default setupRouterConfig;
