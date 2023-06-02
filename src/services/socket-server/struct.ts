import { Socket } from "socket.io";

export interface DataStruct {
    type: "command" | "sync" | "media" | "result" | "error",
    hash?: string,
    data?: {
        command?: string,
        position?: {
            x: number,
            y: number,
            z: number
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