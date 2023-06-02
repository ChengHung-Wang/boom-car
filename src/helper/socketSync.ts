import type { DataStruct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync {
    static carStraight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(true);
    }

    static carStraightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(false);
    }

    static carLeft(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(true);
    }

    static carLeftCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(false);
    }

    static carRight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(true);
    }

    static carRightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(false);
    }

    static carTurbo(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(true);
    }

    static carTurboCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(false);
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
}