import type { DataStruct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync
{
    carStraight(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setAccelerate(true);
    }

    carStraightCancel(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setAccelerate(false);
    }

    carLeft(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurnLeft(true);
    }

    carLeftCancel(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurnLeft(false);
    }

    carRight(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurnRight(true);
    }

    carRightCancel(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurnRight(false);
    }

    carTurbo(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurbo(true);
    }

    carTurboCancel(data: DataStruct): void
    {
        let playerIndex: number = 0;
        racer.cars[playerIndex].setTurbo(false);
    }

    carUnderSpeed(data: DataStruct): void
    {

    }

    carUnderSpeedCancel(data: DataStruct): void
    {

    }
}