import * as SocketStruct from "@/services/socket-server/struct";
// @ts-ignore
import { Socket, Server } from "socket.io";
import { service } from "@/services/socket-server/main";

export class Result implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        data.type = "result";
        socket.emit("result", data);
    }
}

export class Sync implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        socket.broadcast.emit("sync", data);
    }

    sendGroup(socket: Socket|Server, data: SocketStruct.DataStruct, groupNumber: string): void {
        socket.to(groupNumber).emit("sync", data);
    }

    sendToAllClients(data: SocketStruct.DataStruct): void
    {
        service.io.emit("sync", data);
    }
}

export class Error implements SocketStruct.Methods {
    send(socket: Socket, data: SocketStruct.DataStruct): void {
        data.type = "error";
        socket.emit("error", data);
    }

    permissionDeny(socket: Socket): void
    {
        socket.emit("error", <SocketStruct.DataStruct>{
            type: "error",
            data: {
                reasonKey: "ERR_PERMISSION_DENY"
            }
        })
    }

    sendReason(socket: Socket, reason: string): void {
        socket.emit("error", <SocketStruct.DataStruct>{
            type: "error",
            data: {
                reasonKey: reason
            }
        })
    }
}
