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

    sendGroup(socket: Socket, data: SocketStruct.DataStruct, groupNumber: string): void {
        socket.to(groupNumber).emit("sync", data);
    }
}

export class Error implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        socket.emit("error", data);
    }
}