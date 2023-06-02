import type { DataStruct } from "@/services/socket-server/struct";
import * as helper from "@/helper/helper"
import type { Car } from "@/services/car.js";
export default class socketSender {
    command(data: DataStruct) : void {
        helper.socket.send(data);
    }

    carStraight(car: Car) : void {
        console.log("send carStraight")
        this.command(<DataStruct>{
            data: {
                command: "carStraight",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carStraightCancel(car: Car) : void {
        console.log("send carStraightCancel")
        this.command(<DataStruct>{
            data: {
                command: "carStraightCancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carLeft(car: Car) : void {
        console.log("send carLeft")
        this.command(<DataStruct>{
            data: {
                command: "carLeft",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carLeftCancel(car: Car) : void {
        console.log("send carLeftCancel")
        this.command(<DataStruct>{
            data: {
                command: "carLeftCancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carRight(car: Car) : void {
        console.log("send carRight")
        this.command(<DataStruct>{
            data: {
                command: "carRight",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carRightCancel(car: Car) : void {
        console.log("send carRightCancel")
        this.command(<DataStruct>{
            data: {
                command: "carRightCancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carTurbo(car: Car) : void {
        console.log("send carTurbo")
        this.command(<DataStruct>{
            data: {
                command: "carTurbo",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }

    carTurboCancel(car: Car) : void {
        console.log("send carTurboCancel")
        this.command(<DataStruct>{
            data: {
                command: "carTurboCancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed,
                group_id: 1
            }
        })
    }
}