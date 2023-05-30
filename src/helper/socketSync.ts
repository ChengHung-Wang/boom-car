import type { DataStruct } from "@/services/socket-server/struct";
import { racer } from "@/services/racer";

export default class socketSync
{
    carStraight(data: DataStruct): void
    {
        // select which car
        // do action
        racer.player.setAccelerate(true);
    }

    carStraightCancel(data: DataStruct): void
    {
        // racer.player.setAccelerate(false);
    }
}