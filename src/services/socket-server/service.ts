import { Server, Socket } from "socket.io";
import * as Sender from "./sender";
import * as SocketStruct from "@/services/socket-server/struct";
import { CommendRouter } from "@/services/socket-server/router";
import { createServer } from "http";
import express from 'express';
import cors from 'cors';

export default class SocketService {
    protected io: Server;
    protected groups = [];
    protected service = {
        result: new Sender.Result(),
        sync: new Sender.Sync()
    };

    constructor(port: number = 3000) {
        const httpServer = createServer();
        const app = express();
        app.use(cors());
        const server = createServer(app);

        this.io = new Server(server, {
            // @ts-ignore
            allowEIO3: true,
            cors: {
                origin: '*',
            }
        });
        this.io.on('connection', (socket: Socket) => {
            console.log(socket);
            this.registerMember(socket);
            socket.on("commend", (data) => {
                new CommendRouter(socket, <SocketStruct.DataStruct>data)
            });

        });

        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }

    public registerMember(socket: Socket, send: boolean = true): SocketStruct.DataStruct {
        const result: SocketStruct.DataStruct = {
            type: "result",
            data: {
                player_id: socket.id,
                auth: socket.handshake.auth['sec-websocket-key']
            }
        };
        if (send) this.service.result.send(socket, result);
        return result;
    }
}
