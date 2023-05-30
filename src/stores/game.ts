import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    // settings
    const carCount = ref(0)
    const lapTotal = ref(0)
    const turboAmount = ref(0)



    // game info
    const lapTime = ref(0)
    const lapCount = ref(0)
    const rank = ref(0)
    const speed = ref(0)

    return { carCount, lapTotal, turboAmount, lapTime, lapCount, rank, speed }
})
