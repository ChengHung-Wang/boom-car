import * as SocketStruct from "@/services/socket-server/struct";
import { Socket } from "socket.io";

export class Result implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        socket.emit("result", data);
    }
}

export class Sync implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        socket.broadcast.emit("sync", data);
    }
}