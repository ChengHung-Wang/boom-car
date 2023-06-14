import { Socket } from "socket.io";
export interface userInfo {
    id: string;
    nickname?: string;
}
export interface DataStruct {
    type: "command" | "sync" | "result" | "error",
    hash?: string,
    data?: {
        command?: string,
        code?: string, // 活動代碼
        reason_key?: string,
        position?: {
            x: number,
            y: number,
            z: number
        },
        speed?: number,
        player_id: string,
        group_id?: string,
        members?: Array<{
            nickname: string,
            player_id: string,
            rank: number,
            rise?: boolean
        }>,
        nickname?: string, // 暱稱
        rank?: number, // for: game-end
    }
}

export interface Methods {
    send(socket: Socket, data: DataStruct): void
}