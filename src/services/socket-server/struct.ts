// @ts-ignore
import { Socket } from "socket.io";
import moment from 'moment-timezone';

export interface member {
    nickname: string,
    playerId: string,
    rank?: number,
    rise?: boolean,
    eventName?: string,
    permission?: "user" | "admin"
}

export interface round {
    risePercent: number,
    track: string,
    maxRunTime: number
}

export interface event {
    code: string,
    maxCompetitor: number,
    name: string,
    rounds: Array<round>,
    startAt: moment.Moment
}

export interface DataStruct {
    type: "command" | "sync" | "result" | "error",
    hash?: string,
    data?: {
        command?: string,
        code?: string, // 活動代碼
        reasonKey?: string,
        clientAmount?: number, // 當前人數
        position?: {
            x: number,
            y: number,
            z: number
        },
        speed?: number,
        playerId?: string,
        groupId?: string,
        members?: Array<member>,
        nickname?: string, // 暱稱
        rank?: number, // for: game-end
    }
}

export interface Methods {
    send(socket: Socket, data: DataStruct): void
}
