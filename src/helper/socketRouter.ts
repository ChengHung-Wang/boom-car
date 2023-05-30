import type { DataStruct } from "@/services/socket-server/struct";
import socketSync from "./socketSync";

export function sync(data: DataStruct): void {
    const list: Map<string,(data: DataStruct) => void> = new Map();

    list.set("car-straight", (new socketSync()).carStraight);
    list.set("car-straight-cancel", (new socketSync()).carStraight);

    const target = list.get(<string>data.data?.command);
    if (target) {
        target(data)
    }

}

export function result(): void {

}