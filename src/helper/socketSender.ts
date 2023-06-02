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
                command: "car-straight",
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
                command: "car-straight-cancel",
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
                command: "car-left",
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
                command: "car-left-cancel",
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
                command: "car-right",
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
                command: "car-right-cancel",
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
                command: "car-turbo",
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
                command: "car-turbo-cancel",
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