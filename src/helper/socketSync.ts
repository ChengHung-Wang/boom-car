import type { DataStruct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync {
    static carStraight(data: DataStruct): void {
        // let playerIndex: number = 1;
        console.log(playerIndex.value);
        racer.cars[playerIndex.value].setAccelerate(true);
       //  this.carStateUpdate(data, playerIndex.value);
    }

    static carStraightCancel(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setAccelerate(false);
        // this.carStateUpdate(data, playerIndex.value);
    }

    static carLeft(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurnLeft(true);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carLeftCancel(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurnLeft(false);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carRight(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurnRight(true);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carRightCancel(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurnRight(false);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carTurbo(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurbo(true);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carTurboCancel(data: DataStruct): void {
        // let playerIndex: number = 1;
        racer.cars[playerIndex.value].setTurbo(false);
        this.carStateUpdate(data, playerIndex.value);
    }

    static carUnderSpeed(data: DataStruct): void {

    }

    static carUnderSpeedCancel(data: DataStruct): void {

    }

    static overLap(data: DataStruct): void {

    }

    static setNickname(data: DataStruct): void {

    }

    static getMembers(data: DataStruct): void {

    }

    static joinGroup(data: DataStruct): void {

    }

    static getConfig(data: DataStruct): void {

    }

    static setCarStyle(data: DataStruct): void {

    }

    static carStateUpdate(data: DataStruct, playerIndex: number): void {
        racer.cars[playerIndex].x = data.data?.position?.x;
        racer.cars[playerIndex].y = data.data?.position?.y;
        racer.cars[playerIndex].z = data.data?.position?.z;
        racer.cars[playerIndex].speed = data.data?.speed;
    }
}