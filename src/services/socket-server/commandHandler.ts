import type { Socket } from "socket.io";
import * as Sender from "./sender";
import type { DataStruct, event, member } from "@/services/socket-server/struct";
import { service } from "./main";
import moment from 'moment-timezone';

export default class CommandHandler {
    private readonly socket: Socket;
    private readonly data: DataStruct;

    public constructor(socket: Socket, data: DataStruct) {
        this.socket = socket;
        this.data = data;
    }

    public async joinEvent(): Promise<void> {
        const event = service.getEvent(this.socket, <string>this.data.data?.code);
        // check event exist
        if (! event) {
            return;
        }

        // check event started
        if (! moment().tz("Asia/Taipei").isAfter(event.startAt)) {
            (new Sender.Error()).send(this.socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_EVENT_HAVE_NOT_START_YET"
                }
            })
            this.socket.disconnect(true);
            return;
        }

        // check user amount
        const readyUserAmount: number = (await service.getClients()).filter(item => {
            return item?.nickname != "" && item?.permission != "admin";
        }).length;
        if (readyUserAmount >= event.maxCompetitor) {
            (new Sender.Error()).send(this.socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_OVER_CLIENT_AMOUNT"
                }
            })
            this.socket.disconnect(true);
            return;
        }

        // TODO: 由於 Demo 只會同時有一場活動，有需要分活動的需求請自行撰寫後面的程序。
    }

    public async setNickname(): Promise<void> {
        const nickname: string = <string>this.data.data?.nickname;
        // check nickname is valid
        if (nickname.trim() == "") {
            return (new Sender.Error()).send(this.socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_NICKNAME_NOT_VALID"
                }
            });
        }

        // check duplicate nickname
        if (service.membersMap.has(nickname)) {
            (new Sender.Error()).send(this.socket, {
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
        // TODO: 由於 Demo 只會同時有一場活動，有需要分活動的需求請自行撰寫後面的程序。
        (new Sender.Sync()).sendToAllClients(<DataStruct>{
            type: "sync",
            data: {
                members:  (await service.getClients()).filter(item => {
                    return item && item?.nickname != "" && item?.permission != "admin";
                })
            }
        })
    }

    public setGameStart(): void {
        // check permission
        if (! service.isAdmin(<string>this.socket.id))
            return (new Sender.Error()).permissionDeny(this.socket);

        const thisEvent: event | undefined = service.getEvent(this.socket, <string>this.data.data?.code);
        // check event exists
        if (thisEvent == undefined)
            return;

        if (thisEvent.hasStart) {
            return (new Sender.Error()).sendReason(this.socket, "ERR_GAME_HAS_STARTED");
        }

        service.setGameStart(thisEvent.name);
    }

    public setGameRise(): void
    {
        // check permission
        if (! service.isAdmin(<string>this.socket.id))
            return (new Sender.Error()).permissionDeny(this.socket);

        const thisEvent: event | undefined = service.getEvent(this.socket, <string>this.data.data?.code);
        // check event exists
        if (thisEvent == undefined)
            return;
    }

    public async userEndGame(): Promise<void>
    {
        const rank = this.data.data?.rank;
        if (rank === undefined) return;
        service.membersMap.set(<string>this.socket.id, <member>{
            ...service.membersMap.get(<string>this.socket.id),
            rankLock: true,
            rank: rank
        });
        const thisUser = <member>service.membersMap.get(<string>this.socket.id);
        let endUsers: member[] = [...service.membersMap.values()].filter(item => {
            return item.permission != "admin" && item.groupId == thisUser.groupId && item.roundEnd
        });
        if (endUsers.length == (await service.io.in(<string>thisUser.groupId).fetchSockets()).length) {
            // all finish of same group member
            (new Sender.Sync()).sendGroup(this.socket,{
                type: "sync",
                data: {
                    command: "game-ranking",
                    members: endUsers.map(item => {
                        delete item.groupId;
                        delete item.eventName;
                        delete item.roundEnd;
                        delete item.permission;
                        // TODO: solve below hard code problem
                        item.rise = <number>item.rank >= parseInt(String(endUsers.length / 2))
                        return item;
                    })
                }
            }, <string>thisUser?.groupId);
        }
    }

    public getUsers(): void
    {
        // TODO: 取得整個用戶清單
    }

    public carEvent(): void
    {
        delete this.data.hash;
        (new Sender.Sync()).send(this.socket, this.data);
    }
}
