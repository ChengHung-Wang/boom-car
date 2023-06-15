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
        (racer.cars.value)[playerIndex.value].setAccelerate(true);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carStraightCancel(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setAccelerate(false);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carLeft(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurnLeft(true);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;    }

    static carLeftCancel(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurnLeft(false);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carRight(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurnRight(true);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carRightCancel(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurnRight(false);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carTurbo(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurbo(true);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carTurboCancel(data: DataStruct): void {
        (racer.cars.value)[playerIndex.value].setTurbo(false);
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }

    static carCollision(data: DataStruct): void {

    }

    static carCollisionCancel(data: DataStruct): void {

    }

    static statusUpdate(data: DataStruct, playerIndex){
        (racer.cars.value)[playerIndex.value].x = data.data?.position?.x;
        (racer.cars.value)[playerIndex.value].y = data.data?.position?.y;
        (racer.cars.value)[playerIndex.value].z = data.data?.position?.z;
        (racer.cars.value)[playerIndex.value].speed = data.data?.speed;
    }
}