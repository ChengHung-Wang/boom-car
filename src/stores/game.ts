import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const lapTime: Ref<number> = ref(0)
    const lapCount: Ref<number> = ref(0)
    const lapTotal: Ref<number> = ref(0)

    const rank: Ref<number> = ref(0);
    const speed: Ref<number> = ref(0);
    const turboAmount: Ref<number> = ref(0)
    const mapCanvas: Ref<undefined|HTMLCanvasElement> = ref();
    const clientAmount: Ref<number> = ref(0);

    return { lapTime, lapCount, lapTotal, rank, speed, turboAmount, mapCanvas, clientAmount }
})
