import type { Socket } from "socket.io";
import * as Sender from "./sender";
import type { DataStruct, event, member } from "@/services/socket-server/struct";
import { service } from "./main";
import moment from 'moment-timezone';

export default class CommandHandlerTemp {
    private readonly socket: Socket;
    private readonly data: DataStruct;

    constructor(socket: Socket, data: DataStruct) {
        this.socket = socket;
        this.data = data;
    }

    public setGameStart = async() => {
        let clients =  <member[]>(await service.getClients()).filter(e => {
            return e?.permission != "admin";
        });
        service.io.socketsJoin("debug");
        (new Sender.Sync()).send(this.socket, <DataStruct>{
            type: "sync",
            data: {
                command: "game-start",
                members: <member[]>(clients.map((item: member, key: number) => {
                    item.rank = key + 1;
                    delete item.permission;
                    delete item.groupId;
                    delete item.eventName;
                    return item;
                }))
            }
        });
    }
}
