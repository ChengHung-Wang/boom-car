import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const lapTime: Ref<number> = ref(0)
    const lapCount: Ref<number> = ref(0)
    const lapTotal: Ref<number> = ref(0)

    const rank: Ref<number> = ref(0);
    const speed: Ref<number> = ref(0);
    const turboAmount: Ref<number> = ref(0)
    const mapCanvas: Ref<undefined | HTMLCanvasElement> = ref();
    const clientAmount: Ref<number> = ref(0);
    const engineReady: Ref<boolean> = ref(false)
    const gameStarted: Ref<boolean> = ref(false);
    const playerIndex: Ref<number> = ref(0);
    const playerMap: Ref<Map<string, number>> = ref(new Map<string, number>());

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
        playerMap
    }
})
