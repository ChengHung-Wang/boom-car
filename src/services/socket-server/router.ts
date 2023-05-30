import type { Socket } from "socket.io";
import CommandHandler from "@/services/socket-server/commandHandler";
import type { DataStruct } from "@/services/socket-server/struct";

export class CommandRouter {
    private service: CommandHandler;

    constructor(socket: Socket, data: DataStruct) {
        console.log(data);
        this.service = new CommandHandler();
        const target = this.register(socket, data).get(<string>(data.data?.command));
        if (target) {
            target(socket, data);
        }
    }

    register(socket: Socket, data: DataStruct): (Map<string, (socket: Socket, data: DataStruct) => void>) {
        const functionMap = new Map<string, (socket: Socket, data: DataStruct) => void>();
        functionMap.set("car-straight", this.service.carStraight); // 前進
        functionMap.set("car-straight-cancel", this.service.carStraightCancel); // 取消前進
        // TODO: 請造樣造句填充後面的 API
        return functionMap;
    }
}
