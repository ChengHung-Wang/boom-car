import type { DataStruct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";
import { ref } from "vue";
import type { Ref } from "vue";

export let playerIndex: Ref<number> = ref(1);

export default class socketSync {
    static setNickname(data: DataStruct): void {
    }

    static joinEvent(data: DataStruct): void {
    }

    static gameStart(data: DataStruct): void {
    }

    static gameRanking(data: DataStruct): void {
    }

    static gameRise(data: DataStruct): void {
    }

    static carStraight(data: DataStruct): void {
        console.log("receive carStraight");
        (racer.cars.value)[playerIndex.value].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carStraightCancel(data: DataStruct): void {
        console.log("receive carStraightCancel");
        (racer.cars.value)[playerIndex.value].setAccelerate(false);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carLeft(data: DataStruct): void {
        console.log("receive carLeft");
        (racer.cars.value)[playerIndex.value].setTurnLeft(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carLeftCancel(data: DataStruct): void {
        console.log("receive carLeftCancel");
        (racer.cars.value)[playerIndex.value].setTurnLeft(false);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carRight(data: DataStruct): void {
        console.log("receive carRight");
        (racer.cars.value)[playerIndex.value].setTurnRight(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carRightCancel(data: DataStruct): void {
        console.log("receive carRightCancel");
        (racer.cars.value)[playerIndex.value].setTurnRight(false);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carTurbo(data: DataStruct): void {
        console.log("receive carTurbo");
        (racer.cars.value)[playerIndex.value].setTurbo(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carTurboCancel(data: DataStruct): void {
        console.log("receive carTurboCancel");
        (racer.cars.value)[playerIndex.value].setTurbo(false);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carCollision(data: DataStruct): void {

    }

    static carCollisionCancel(data: DataStruct): void {

    }

    static statusUpdate(data: DataStruct, playerIndex: Ref<number>): void{
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }
}