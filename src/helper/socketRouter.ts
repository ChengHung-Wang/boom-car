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

    const target = list.get(<string>data.data?.command);
    if (target) {
        target(data)
    }
}

export function result(): void {

}