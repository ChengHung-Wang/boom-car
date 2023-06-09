import type { Socket } from "socket.io";
import * as Sender from "./sender";
import type { DataStruct } from "@/services/socket-server/struct";
import * as variables from "./main"
import { FindMemberGroup, memberList } from "./main";
import type { userInfo } from "@/services/socket-server/struct";

export default class CommandHandler {
    public joinGroup(socket: Socket, data: DataStruct): void {
        socket.join(<string>data.data?.jointGroup);
        FindMemberGroup.set(<string>data.data?.player_id, <string>data.data?.jointGroup);
        let tempgrouplist: Array<userInfo> | undefined = memberList.get(<string>data.data?.jointGroup);//獲取要加入的group的成員名單
        if (tempgrouplist) {
            tempgrouplist.push(<userInfo>data.data?.Information);//加入新成員
        }
        (new Sender.Result()).send(socket, <DataStruct>{
            type: 'result',
            hash: data.hash,
            data: {
                player_id: socket.id,
                others: variables.memberList,
            }
        });
        memberList.set(<string>data.data?.jointGroup, <Array<userInfo>>tempgrouplist);
    }

    public SetNickname(socket: Socket, data: DataStruct): void {
        delete data.hash;
        let tempgrouplist: Array<userInfo> | undefined = memberList.get(<string>data.data?.group_id);
        if (tempgrouplist) {
            //遍歷組找到成員 更改暱稱
            tempgrouplist.forEach(item => {
                if (item.id == data.data?.player_id) {
                    item.nickname = data.data?.nickname;
                }
            });
        }

        (new Sender.Result()).send(socket, <DataStruct>{
            type: "result",
            hash: data.hash,
            data: {
                player_id: socket.id,
                memberList: variables.memberList,
            }
        });

    }

    public GetMember(socket: Socket, data: DataStruct): void {
        delete data.hash;
        let groupNumber = FindMemberGroup.get(<string>data.data?.player_id);
        let thisMemberList: Array<userInfo> | undefined;
        if (groupNumber) {
            thisMemberList = memberList.get(<string>groupNumber);
        }
        (new Sender.Result()).send(socket, <DataStruct>{
            type: "result",
            hash: data.hash,
            data: {
                player_id: <string>data.data?.player_id,
                group_id: groupNumber,
                others: thisMemberList,
            }
        });
    }

    public carStraight(socket: Socket, data: DataStruct, cancel: boolean = false): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.player_id);
        delete data.hash;
        (new Sender.Sync()).sendGroup(socket, data, <string>groupNumber);
    }

    public carStraightCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data, true);
    }

    public carRight(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.player_id);
        delete data.hash;
        (new Sender.Sync()).sendGroup(socket, data, <string>groupNumber);
    }

    public carRightCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data, true);
    }

    public carLeft(socket: Socket, data: DataStruct): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.player_id);
        delete data.hash;
        (new Sender.Sync()).sendGroup(socket, data, <string>groupNumber);
    }

    public carLeftCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data, true);
    }

    public carTurbo(socket: Socket, data: DataStruct, cancel: boolean = false): void {
        let groupNumber: string | undefined = FindMemberGroup.get(<string>data.data?.player_id);
        delete data.hash;
        (new Sender.Sync()).sendGroup(socket, data, <string>groupNumber);
    }

    public carTurboCancel(socket: Socket, data: DataStruct): void {
        delete data.hash;
        this.carStraight(socket, data, true);
    }
}