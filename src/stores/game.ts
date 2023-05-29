import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const lapTime = ref(0)
    return { lapTime }
})
