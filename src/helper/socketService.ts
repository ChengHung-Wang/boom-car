import { io } from "socket.io-client"
import { useSocketStore } from "@/stores/socket";
import type { Socket } from "socket.io-client";
import type { DataStruct } from "@/services/socket-server/struct";
import * as router from "./socketRouter"
import socketSender from "@/helper/socketSender";

interface eventLog {
    req: DataStruct,
    res?: DataStruct,
    needResult: false
}

export default class SocketService {
    public socket: null | Socket = null;
    public taskList: Map<string, eventLog> = new Map();

    init(autoConnect: boolean = false): void {
        const socketStore = useSocketStore();
        this.socket = io(socketStore.socketServerUrl, {
            autoConnect: autoConnect
        });
        this.socket.on("connection", this.onConnected);
        this.socket.on("sync", this.onSync);
        this.socket.on("result", this.onResult);
    }

    start(): void {
        this.socket?.open();
    }

    test(): void {
        if (this.socket === null || !this.socket.connected) return;
        setInterval(() => {
            this.send(<DataStruct>{
                data: {
                    command: "car-straight",
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: 220.4,
                    group_id: 1
                }
            })
        }, 1000)
    }

    onConnected() {
        console.log('socket connected');
    }

    send(data: DataStruct, needRes: boolean = false): void {
        if (this.socket === null || !this.socket.connected) return;
        data.type = "command";
        data.hash = this.getHash();
        this.socket.emit("command", data)
        this.taskList.set(data.hash, <eventLog>{
            req: data,
            needResult: needRes
        })
    }

    onSync(data: DataStruct) {
        router.sync(data);
    }

    onResult(data: DataStruct): void {
        console.log('result', data);
    }

    private getHash(length: number = 8) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        do {
            result = '';
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
        } while (this.taskList.get(result))
        return result;
    }
}