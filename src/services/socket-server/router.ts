// @ts-ignore
import type { Socket } from "socket.io";
import CommandHandler from "@/services/socket-server/commandHandler";
import type { DataStruct } from "@/services/socket-server/struct";

export class CommandRouter {
    private service: CommandHandler;

    constructor(socket: Socket, data: DataStruct) {
        this.service = new CommandHandler(socket, data);
        const target = this.register().get(<string>(data.data?.command));
        if (target) {
            (async () => {
                await target();
            })();
        }
    }

    register(): (Map<string, () => Promise<void>>) {
        const functionMap = new Map<string, () => Promise<void>>();
        functionMap.set("join-event", this.service.joinEvent); // 加入活動
        functionMap.set("set-nickname", this.service.setNickname); // 設置暱稱
        functionMap.set("set-admin", this.service.setAdmin); // 設置管理員權限
        functionMap.set("game-start", this.service.setGameStart); // 遊戲開始 (admin)
        functionMap.set("game-rise", this.service.setGameRise); // 遊戲晉級 (admin)
        functionMap.set("game-end", this.service.userEndGame); // 遊戲結束
        functionMap.set("get-user", this.service.getUsers); // 取得用戶清單

        // car-*
        functionMap.set("car-straight", this.service.carEvent); // 前進
        functionMap.set("car-straight-cancel", this.service.carEvent); // 取消前進
        functionMap.set("car-right", this.service.carEvent); // 車輛右轉
        functionMap.set("car-right-cancel", this.service.carEvent);// 車輛右轉取消
        functionMap.set("car-left", this.service.carEvent);//向左
        functionMap.set("car-left-cancel", this.service.carEvent);// 向左取消
        functionMap.set("car-turbo", this.service.carEvent);// 開啟渦輪
        functionMap.set("car-turbo-cancel", this.service.carEvent);// 開啟渦輪取消
        return functionMap;
    }
}
