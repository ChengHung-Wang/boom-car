import type { DataStruct } from "@/services/socket-server/struct";
import * as helper from "@/helper/helper"
import type { Car } from "@/services/car.js";
import { useSocketStore } from "@/stores/socket";

export default class SocketSender {
    command(data: DataStruct) : void {
        helper.socket.send(data);
    }

    setNickname() : void {
        console.log("send setNickname")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "set-nickname",
                nickname: (useSocketStore()).nickname
            }
        })
    }

    joinEvent() : void {
        console.log("send joinEvent")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "join-event",
                code: (useSocketStore()).socketServerUrl
            }
        })
    }

    gameEnd() : void {
        console.log("send gameEnd")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "game-end",
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rank: 1
            }
        })
    }

    carRanking() : void {
        console.log("send carRanking")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-ranking",
                rank: 1
            }
        })
    }

    carStraight(car: Car) : void {
        console.log("send carStraight")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-straight",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carStraightCancel(car: Car) : void {
        console.log("send carStraightCancel")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-straight-cancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carLeft(car: Car) : void {
        console.log("send carLeft")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-left",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carLeftCancel(car: Car) : void {
        console.log("send carLeftCancel")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-left-cancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carRight(car: Car) : void {
        console.log("send carRight")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-right",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carRightCancel(car: Car) : void {
        console.log("send carRightCancel")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-right-cancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carTurbo(car: Car) : void {
        console.log("send carTurbo")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-turbo",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carTurboCancel(car: Car) : void {
        console.log("send carTurboCancel")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-turbo-cancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carCollision(car: Car) : void {
        console.log("send carCollision")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-collision",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }

    carCollisionCancel(car: Car) : void {
        console.log("send carCollisionCancel")
        this.command(<DataStruct>{
            type: "command",
            data: {
                command: "car-collision-cancel",
                position: {
                    x: car.x,
                    y: car.y,
                    z: car.z
                },
                speed: car.speed
            }
        })
    }
}