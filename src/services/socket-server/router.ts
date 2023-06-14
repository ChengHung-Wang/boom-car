// @ts-ignore
import type { Socket } from "socket.io";
import CommandHandler from "@/services/socket-server/commandHandler";
import type { DataStruct } from "@/services/socket-server/struct";

export class CommandRouter {
    private service: CommandHandler;

    constructor(socket: Socket, data: DataStruct) {
        this.service = new CommandHandler();
        const target = this.register().get(<string>(data.data?.command));
        if (target) {
            target(socket, data);
        }
    }

    register(): (Map<string, (socket: Socket, data: DataStruct) => void>) {
        const functionMap = new Map<string, (socket: Socket, data: DataStruct) => void>();
        functionMap.set("join-event", this.service.joinEvent); //設置暱稱
        functionMap.set("set-nickname", this.service.setNickname); //設置暱稱
        functionMap.set("game-start", this.service.setNickname); //設置暱稱
        functionMap.set("game-ranking", this.service.setNickname); //設置暱稱
        functionMap.set("game-rise", this.service.GetMember); //獲取該組成員
        functionMap.set("game-end", this.service.GetMember); //獲取該組成員

        // car-*
        functionMap.set("car-straight", this.service.carStraight); // 前進
        functionMap.set("car-straight-cancel", this.service.carStraightCancel); // 取消前進
        functionMap.set("car-right", this.service.carRight); // 車輛右轉
        functionMap.set("car-right-cancel", this.service.carRightCancel);//車輛右轉取消
        functionMap.set("car-left", this.service.carLeft);//向左
        functionMap.set("car-left-cancel", this.service.carLeftCancel);//向左取消
        functionMap.set("car-turbo", this.service.carTurbo);//開啟渦輪
        functionMap.set("car-turbo-cancel", this.service.carTurboCancel);//開啟渦輪取消
        return functionMap;
    }
}
