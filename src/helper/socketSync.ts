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
        racer.cars[playerIndex.value].setAccelerate(true);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carStraightCancel(data: DataStruct): void {
        racer.cars[playerIndex.value].setAccelerate(false);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carLeft(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurnLeft(true);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carLeftCancel(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurnLeft(false);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carRight(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurnRight(true);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carRightCancel(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurnRight(false);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carTurbo(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurbo(true);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carTurboCancel(data: DataStruct): void {
        racer.cars[playerIndex.value].setTurbo(false);
        racer.cars[playerIndex.value].x = data.data?.position?.x;
        racer.cars[playerIndex.value].y = data.data?.position?.y;
        racer.cars[playerIndex.value].z = data.data?.position?.z;
    }

    static carCollision(data: DataStruct): void {

    }

    static carCollisionCancel(data: DataStruct): void {

    }
}