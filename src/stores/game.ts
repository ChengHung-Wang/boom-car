import { ref, computed, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const lapTime = ref(0)
    const lapCount = ref(0)
    const lapTotal = ref(0)

    const rank = ref(0)
    const speed = ref(0)
    const turboAmount = ref(0)
    const mapCanvas: Ref<HTMLCanvasElement> = ref();

    return { lapTime, lapCount, lapTotal, rank, speed, turboAmount, mapCanvas }
})
