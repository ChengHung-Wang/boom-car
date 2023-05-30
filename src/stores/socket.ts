import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { helper } from "@/services/racer";
export const useSocketStore = defineStore('socket', () => {
    const socketServerUrl: Ref<string> = ref(import.meta.env.VITE_SOCKET_URL + ':' + import.meta.env.VITE_SOCKET_PORT);
    const service = helper.socket;
    return {
        socketServerUrl,
        service
    }
})
