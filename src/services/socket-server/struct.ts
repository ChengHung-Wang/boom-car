// @ts-ignore
import { Socket } from "socket.io";
import moment from 'moment-timezone';

export interface member {
    eventName?: string,
    nickname: string,
    permission?: "user" | "admin",
    playerId: string,
    groupId?: string,
    rank?: number,
    roundEnd?: boolean,
    rise?: boolean
}

export interface round {
    risePercent: number,
    track: string,
    maxRunTime: number,
    hasFinish: boolean
}

export interface event {
    code: string;
    maxCompetitor: number;
    name: string;
    rounds: Array<round>;
    startAt: moment.Moment;
    hasStart: boolean;
}

export interface DataStruct {
    type: "command" | "sync" | "result" | "error",
    hash?: string,
    data?: {
        command?: string,
        code?: string, // 活動代碼
        password?: string, // 管理者密碼
        reasonKey?: string,
        clientAmount?: number, // 當前人數
        position?: {
            x: number,
            y: number,
            z: number
        },
        speed?: number,
        lap?: number,
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
