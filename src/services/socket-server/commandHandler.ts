import SocketService from "@/services/socket-server/service";
import type { Socket } from "socket.io";
import * as Sender from "./sender";
import type { DataStruct } from "@/services/socket-server/struct";

export default class CommandHandler {
    public carStraight(socket: Socket, data: DataStruct, cancel: boolean = false): void {
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carStraightCancel(socket: Socket, data: DataStruct): void {
        this.carStraight(socket, data, true);
    }
}