import { Socket } from "socket.io";
export interface userInfo {
    id: string;
    nickname?: string;
}
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
        group_id?: string,
        auth?: string,
        others?: any,
        memberList?:any,
        nickname?:string,
        jointGroup?:string,
        Information?:userInfo,
    }
}

export interface Methods {
    send(socket: Socket, data: DataStruct): void
}