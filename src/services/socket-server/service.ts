import { Server, Socket } from "socket.io";
import cors from 'cors';
import * as Sender from "./sender";
import * as SocketStruct from "@/services/socket-server/struct";
import { CommandRouter } from "@/services/socket-server/router";
import { createServer } from "http";
import express from 'express';

import type { event, member } from "@/services/socket-server/struct";
import moment from "moment-timezone";

export default class SocketService {
    // socket.io object
    public io: Server;

    // sender service
    protected sender = {
        result: new Sender.Result(),
        sync: new Sender.Sync(),
        error: new Sender.Error()
    };

    // 活動列表
    public events: Map<string, event> = new Map();

    // player_id -> member
    public membersMap: Map<string, member> = new Map();

    public intervalEvent: ReturnType<typeof setInterval>;

    // ----------------
    // TODO: solve hard code problem
    public readonly forceEventName: string = "pipeline-of-richer-pay";
    public roundStartAt: moment.Moment = moment().tz("Asia/Taipei");
    public startedRound: boolean = false;
    private adminSecret = "Skills17";
    // ----------------

    constructor(port: number = 3000) {
        const app = express();
        app.use(cors());
        const server = createServer(app);

        this.io = new Server(server, {
            // @ts-ignore
            allowEIO3: true,
            cors: {
                origin: '*',
            }
        });

        // socket server-side event handle
        this.io.on('connection', async (socket: Socket) => {
            await this.registerMember(socket);

            socket.on("command", async (data: SocketStruct.DataStruct) => {
                new CommandRouter(socket, data);
            });

            socket.on("disconnect", () => {
                this.membersMap.delete(socket.id);
            })
        });

        // max run-time check
        this.intervalEvent = setInterval(() => {
            if (! this.startedRound) return;
            const startAt = this.roundStartAt;
            const endAt = moment().tz("Asia/Taipei");
            if (moment.duration(endAt.diff(startAt)).milliseconds() >= this.getNowRound().maxRunTime) {
                this.setForceFinish();
            }
        }, 50);

        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }

    public async registerMember(socket: Socket): Promise<void> {
        const allClients = await this.getClients();
        this.membersMap.set(socket.id, {
            playerId: socket.id,
            permission: "user",
            nickname: ""
        });
        this.sender.sync.sendToAllClients(<SocketStruct.DataStruct>{
            type: "sync",
            data: {
                clientAmount: allClients.length
            }
        });
    }

    public isAdmin(playerId: string): boolean
    {
        const thisUser: member|undefined = this.membersMap.get(playerId);
        return thisUser != undefined && thisUser?.permission == "admin";
    }

    public getEvent(socket: Socket, serial: string): event|undefined {
        const thisEvent: event|undefined = this.events.get(serial);
        // check event exist
        if (! thisEvent) {
            (new Sender.Error()).send(socket, {
                type: "error",
                data: {
                    reasonKey: "ERR_EVENT_NOT_FOUND"
                }
            })
            socket.disconnect(true);
        }
        return thisEvent;
    }

    public async getClients(roomName: Array<string> = []): Promise<(member | undefined)[]> {
        const data = await (roomName.length == 0 ? this.io.fetchSockets() : this.io.in(roomName).fetchSockets());
        return ((data).map(socketID => {
            return this.membersMap.get(socketID.id);
        }))
    }

    public setGameStart(serial: string): void
    {
        // start the timer
        let thisEvent: event = <event>this.events.get(this.forceEventName);
        thisEvent.hasStart = true;
        this.events.set(this.forceEventName, thisEvent);

        // random
        const groupNames: string[] = [this.getHash(), this.getHash(), this.getHash(), this.getHash()];
        const randomMembers: member[] = this.shuffle(<any>this.membersMap.values());
        // TODO: solve hard code problem
        // grouping
        const groupAmount = 4;
        let indexNow = 0;
        while (randomMembers.length > 0) {
            let e: SocketStruct.member = randomMembers[indexNow];
            e.groupId = groupNames[indexNow % groupAmount];
            this.membersMap.set(e.playerId, e);
            indexNow ++;
        }
        // join group
        groupNames.forEach(name => {
            const members: member[] = randomMembers.filter(e => {
                return e.groupId == name;
            }).map((e: member, index: number) => {
                e.rank = index;
                e.groupId = name;
                e.eventName = this.forceEventName;
                e.roundEnd = false;
                // update to global array
                this.membersMap.set(e.playerId, e);
                return e;
            });
            this.io.in(<string[]>members.map(e => {
                return e.playerId;
            })).socketsJoin(name);
            // sync group
            this.sender.sync.sendGroup(this.io, <SocketStruct.DataStruct>{
                type: "sync",
                data: {
                    command: "game-start",
                    members: members
                }
            }, name);
        })
        // start this round
        this.roundStartAt = moment().tz("Asia/Taipei");
    }

    public setGameRise(serial: string): void {
        // TODO: 切換到下一個 round，重新分配組別。

    }

    public setForceFinish() {
        // TODO: 強制結束

    }

    private shuffle(array: any[]): any[] {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    public setAsAdmin(socket: Socket, password: string): void {
        if (password != this.adminSecret) {
            this.sender.error.permissionDeny(socket);
        } else {
            this.membersMap.set(socket.id, <member>{
                ...this.membersMap.get(socket.id),
                permission: "admin"
            })
        }
    }

    public getNowRound(): SocketStruct.round {
        let result: SocketStruct.round | undefined = undefined;
        let thisEvent: SocketStruct.event =  (<event>this.events.get(this.forceEventName));
        thisEvent.rounds.forEach(e => {
            if (!e.hasFinish && result == undefined) {
                result = e;
            }
        })
        return result ? result : thisEvent.rounds[thisEvent.rounds.length - 1];
    }

    private getHash(length: number = 8): string {
        let result = '';
        let counter = 0;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}
