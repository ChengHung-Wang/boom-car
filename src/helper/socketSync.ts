import type { DataStruct, member } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";
import type { Ref } from "vue";
import { ref } from "vue";
import { useSocketStore } from "@/stores/socket";
import { useGameStore } from "@/stores/game";

export let controlIndex: Ref<number> = ref(1);

export default class socketSync {
    static setNickname(data: DataStruct): void {
        (useSocketStore()).members = data.data?.members?.length ? data.data?.members : [];
    }

    static alertClientAmount(data: DataStruct): void {
        (useGameStore()).clientAmount = data.data?.clientAmount ? data.data.clientAmount : 0;
    }

    static gameStart(data: DataStruct): void {
        if (!(useGameStore()).engineReady)
            return

        // @ts-ignore
        racer.race.carCount = data.data?.members.length;
        const socketId: string = ((useSocketStore()).service.socket?.id) as string;
        const members: member[] | undefined = data.data?.members;
        let rank: number = 0;
        if (members)
            for (let item of members)
                if (item.playerId == socketId)
                    rank = item.rank as number;
        console.log(socketId, rank, data);
        (useGameStore()).playerMap.set(socketId, rank - 1);
        (useGameStore()).playerIndex = ((useGameStore()).playerMap.get(socketId)) as number;
        racer.startGame(0);
    }

    static gameRanking(data: DataStruct): void {
    }

    static gameRise(data: DataStruct): void {
    }

    static carStraight(data: DataStruct): void {
        console.log("receive carStraight");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carStraightCancel(data: DataStruct): void {
        console.log("receive carStraightCancel");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carLeft(data: DataStruct): void {
        console.log("receive carLeft");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carLeftCancel(data: DataStruct): void {
        console.log("receive carLeftCancel");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carRight(data: DataStruct): void {
        console.log("receive carRight");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carRightCancel(data: DataStruct): void {
        console.log("receive carRightCancel");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carTurbo(data: DataStruct): void {
        console.log("receive carTurbo");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carTurboCancel(data: DataStruct): void {
        console.log("receive carTurboCancel");
        const playerIndex: number = ((useGameStore()).playerMap.get((data.data?.playerId) as string) as number);
        // @ts-ignore
        (racer.cars.value)[playerIndex].setAccelerate(true);
        socketSync.statusUpdate(data, playerIndex);
    }

    static carCollision(data: DataStruct): void {

    }

    static carCollisionCancel(data: DataStruct): void {

    }

    static statusUpdate(data: DataStruct, playerIndex: number): void{
        // @ts-ignore
        (racer.cars.value)[playerIndex].x = data.data?.position?.x;
        // @ts-ignore
        (racer.cars.value)[playerIndex].y = data.data?.position?.y;
        // @ts-ignore
        (racer.cars.value)[playerIndex].z = data.data?.position?.z;
        // @ts-ignore
        (racer.cars.value)[playerIndex].speed = data.data?.speed;
    }
}