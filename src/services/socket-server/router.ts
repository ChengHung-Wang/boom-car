import type { Socket } from "socket.io";
import CommendHandler from "@/services/socket-server/commendHandler";
import type { DataStruct } from "@/services/socket-server/struct";

export class CommendRouter {
    private service: CommendHandler;

    constructor(socket: Socket, data: DataStruct) {
        this.service = new CommendHandler();
        const target = this.register(socket, data).get(<string>(data.data?.commend));
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
