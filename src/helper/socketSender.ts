import type { DataStruct } from "@/services/socket-server/struct";
import * as helper from "@/helper/helper"
import type { Car } from "@/services/car.js";
export class socketSender {
    command(data: DataStruct) : void {
        helper.socket.send(data);
    }

    carStraight(car: Car) : void {
        console.log("send car-straight")
        this.command(<DataStruct>{
            data: {
                command: "carStraight",
                position: {
                    x: car.x,
                    y: car.y
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carStraightCancel(car: Car) : void {
        console.log("send car-straight-cancel")
        this.command(<DataStruct>{
            data: {
                command: "carStraightCancel",
                position: {
                    x: car.x,
                    y: car.y
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carLeft() : void {

    }

    carLeftCancel() : void {

    }

    carRight() : void {

    }

    carRightCancel() : void {

    }

    carTurbo() : void {

    }

    carTurboCancel() : void {

    }
}