import type { DataStruct } from "@/services/socket-server/struct";
import { Struct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync {
    static carStraight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(true);
        this.carStateUpdate(data, playerIndex);
    }

    static carStraightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(false);
        this.carStateUpdate(data, playerIndex);
    }

    static carLeft(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(true);
        this.carStateUpdate(data, playerIndex);
    }

    static carLeftCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(false);
        this.carStateUpdate(data, playerIndex);
    }

    static carRight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(true);
        this.carStateUpdate(data, playerIndex);
    }

    static carRightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(false);
        this.carStateUpdate(data, playerIndex);
    }

    static carTurbo(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(true);
        this.carStateUpdate(data, playerIndex);
    }

    static carTurboCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(false);
        this.carStateUpdate(data, playerIndex);
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

    carStateUpdate(data: Struct, playerIndex: number){
        racer.cars[playerIndex].x = data.data.position.x;
        racer.cars[playerIndex].y = data.data.position.y;
        racer.cars[playerIndex].z = data.data.position.z;
        racer.cars[playerIndex].speed = data.data.speed;

    }
}