import type { DataStruct } from "@/services/socket-server/struct";
import { Struct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync {
    carStraight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(true);
        this.carStateUpdate(data, playerIndex);
    }

    carStraightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setAccelerate(false);
        this.carStateUpdate(data, playerIndex);
    }

    carLeft(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(true);
        this.carStateUpdate(data, playerIndex);
    }

    carLeftCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnLeft(false);
        this.carStateUpdate(data, playerIndex);
    }

    carRight(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(true);
        this.carStateUpdate(data, playerIndex);
    }

    carRightCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurnRight(false);
        this.carStateUpdate(data, playerIndex);
    }

    carTurbo(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(true);
        this.carStateUpdate(data, playerIndex);
    }

    carTurboCancel(data: DataStruct): void {
        let playerIndex: number = 1;
        racer.cars[playerIndex].setTurbo(false);
        this.carStateUpdate(data, playerIndex);
    }

    carUnderSpeed(data: DataStruct): void {

    }

    carUnderSpeedCancel(data: DataStruct): void {

    }

    carStateUpdate(data: Struct, playerIndex: number){
        racer.cars[playerIndex].x = data.data.position.x;
        racer.cars[playerIndex].y = data.data.position.y;
        racer.cars[playerIndex].z = data.data.position.z;
        racer.cars[playerIndex].speed = data.data.speed;

    }
}