// @ts-ignore
import type { Socket } from "socket.io";
import * as Sender from "./sender";
import type { DataStruct, member } from "@/services/socket-server/struct";
import { FindMemberGroup } from "./main";
import { service } from "./main";
import moment from 'moment-timezone';

export default class CommandHandler {
    public async joinEvent(socket: Socket, data: DataStruct): Promise<void> {
        const event = service.events.get(<string>data.data?.code);
        // check event exist
        if (! event) {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_EVENT_NOT_FOUND"
                }
            })
            socket.disconnect(true);
            return;
        }
        // check event started
        if (! moment().tz("Asia/Taipei").isAfter(event.startAt)) {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_EVENT_HAVE_NOT_START_YET"
                }
            })
            socket.disconnect(true);
            return;
        }

        // check user amount
        const readyUserAmount: number = (await service.getClients()).filter(item => {
            return item?.nickname != "" && item?.permission != "admin";
        }).length;
        if (readyUserAmount >= event.maxCompetitor) {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_OVER_CLIENT_AMOUNT"
                }
            })
            socket.disconnect(true);
            return;
        }

        // TODO: 由於 Demo 只會同時有一場活動，有需要分活動的需求請自行撰寫後面的程序。
    }

    public async setNickname(socket: Socket, data: DataStruct): Promise<void> {
        const nickname: string = <string>data.data?.nickname;
        // check nickname is valid
        if (nickname.trim() == "") {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_NICKNAME_NOT_VALID"
                }
            })
            return;
        }

        // check duplicate nickname
        if (service.membersMap.has(nickname)) {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_DUPLICATED_NICKNAME"
                }
            })
            return;
        }

        service.membersMap.set(nickname, {
            ...<member>(service.membersMap.get(nickname)),
            nickname: nickname
        });

        // sync to all the user
        (new Sender.Sync()).sendToAllClients(<DataStruct>{
            type: "sync",
            data: {
                members:  (await service.getClients()).filter(item => {
                    return item && item?.nickname != "" && item?.permission != "admin";
                })
            }
        })
    }

    public GetMember(socket: Socket, data: DataStruct): void {
        // delete data.hash;
        // let groupNumber = FindMemberGroup.get(<string>data.data?.playerId);
        // let thisMemberList: Array<member> | undefined;
        // if (groupNumber) {
        //     thisMemberList = memberList.get(<string>groupNumber);
        // }
        // (new Sender.Result()).send(socket, <DataStruct>{
        //     type: "result",
        //     hash: data.hash,
        //     data: {
        //         player_id: <string>data.data?.playerId,
        //         group_id: groupNumber,
        //         others: thisMemberList,
        //     }
        // });
    }

    public carStraight(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carStraightCancel(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carRight(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carRightCancel(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carLeft(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carLeftCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data);
        (new Sender.Sync()).send(socket, data);
    }

    public carTurbo(socket: Socket, data: DataStruct, cancel: boolean = false): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.playerId);
        delete data.hash;
        (new Sender.Sync()).send(socket, data);
    }

    public carTurboCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data);
    }
}
