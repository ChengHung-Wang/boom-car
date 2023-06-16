import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { helper } from "@/services/racer";
import type SocketService from "@/helper/socketService";
import type { member } from "@/services/socket-server/struct";

export const useSocketStore = defineStore('socket', () => {
    const socketServerUrl: Ref<string> = ref(import.meta.env.VITE_SOCKET_URL + ':' + import.meta.env.VITE_SOCKET_PORT);
    const service: SocketService = helper.socket;
    const eventCode: Ref<string> = ref("pipeline-of-richer-pay");
    const members: Ref<member[]> = ref([]);
    const nickname: Ref<string> = ref("");
    return {
        socketServerUrl,
        eventCode,
        service,
        members,
        nickname
    }
})
