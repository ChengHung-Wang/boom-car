import { Socket } from "socket.io";

export interface DataStruct {
    type: "commend" | "sync" | "media" | "result" | "error",
    hash?: string,
    data?: {
        commend?: string,
        position?: {
            x: number,
            y: number
        },
        speed?: number,
        player_id: string,
        group_id?: number
        auth?: string
    }
}

export interface Methods {
    send(socket: Socket, data: DataStruct): void
}