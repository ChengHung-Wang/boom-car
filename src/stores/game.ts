import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const lapTime = ref(0)
    const lapCount = ref(0)
    const lapTotal = ref(0)

    const clientAmount: Ref<number> = ref(0);
    const engineReady: Ref<boolean> = ref(false)
    const gameStarted: Ref<boolean> = ref(false);
    const playerIndex: Ref<number> = ref(0);
    const playerMap: Ref<Map<string, number>> = ref(new Map<string, number>());
    const rank = ref(0)
    const speed = ref(0)
    const turboAmount = ref(0)
    const mapCanvas: Ref<HTMLCanvasElement> = ref();
    const camera = ref({
        x: 0,
        y: 0,
        z: 0
    });



    const mobile = ref(true);
    const nickname = ref("User");

    return {
        lapTime,
        lapCount,
        lapTotal,
        rank,
        speed,
        turboAmount,
        mapCanvas,
        clientAmount,
        engineReady,
        gameStarted,
        playerIndex,
        playerMap,
        camera,
        mobile,
        nickname
    }
})
