import type { DataStruct } from "@/services/socket-server/struct";
import socketSync from "./socketSync";

export function sync(data: DataStruct): void {
    const list: Map<string,(data: DataStruct) => void> = new Map();

    list.set("car-straight", socketSync.carStraight);
    list.set("car-straight-cancel", socketSync.carStraightCancel);
    list.set("car-left", socketSync.carLeft);
    list.set("car-left-cancel", socketSync.carLeftCancel);
    list.set("car-right", socketSync.carRight);
    list.set("car-right-cancel", socketSync.carRightCancel);
    list.set("car-turbo", socketSync.carTurbo);
    list.set("car-turbo-cancel", socketSync.carTurboCancel);
    list.set("car-underspeed", socketSync.carUnderSpeed);
    list.set("car-underspeed-cancel", socketSync.carUnderSpeedCancel);
    list.set("over-lap", socketSync.overLap);
    list.set("set-nickname", socketSync.setNickname);
    list.set("get-members", socketSync.getMembers);
    list.set("join-group", socketSync.joinGroup);
    list.set("get-config", socketSync.getConfig);
    list.set("set-car-style", socketSync.setCarStyle);

    const target = list.get(<string>data.data?.command);
    if (target) {
        target(data)
    }
}

export function result(): void {

}