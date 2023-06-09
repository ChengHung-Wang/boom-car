import type { DataStruct } from "@/services/socket-server/struct";
import socketSync from "./socketSync";

export function sync(data: DataStruct): void {
    const list: Map<string,(data: DataStruct) => void> = new Map();

    list.set("car-straight", (new socketSync()).carStraight);
    list.set("car-straight-cancel", (new socketSync()).carStraightCancel);
    list.set("car-left", (new socketSync()).carLeft);
    list.set("car-left-cancel", (new socketSync()).carLeftCancel);
    list.set("car-right", (new socketSync()).carRight);
    list.set("car-right-cancel", (new socketSync()).carRightCancel);
    list.set("car-turbo", (new socketSync()).carTurbo);
    list.set("car-turbo-cancel", (new socketSync()).carTurboCancel);
    list.set("car-underspeed", (new socketSync()).carUnderSpeed);
    list.set("car-underspeed-cancel", (new socketSync()).carUnderSpeedCancel);

    const target = list.get(<string>data.data?.command);
    if (target) {
        target(data)
    }
}

export function result(): void {

}
