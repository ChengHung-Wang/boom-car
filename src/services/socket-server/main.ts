import socketService from './service';
import type { event, member } from "@/services/socket-server/struct";
import moment from 'moment-timezone';

const port = 3000; // 可以根據需要更改伺服器埠號

export const service = new socketService(port);

// prepare default data
service.events.set("pipeline-of-richer-pay", {
    code: "pipeline-of-richer-pay",
    name: "花錢的凱子一條龍",
    rounds: [
        {
            maxRunTime: 1000 * 60 * 2,
            track: "track1",
            risePercent: 50
        }
    ],
    maxCompetitor: 60,
    startAt: moment("2023-06-06", "YYYY-MM-DD").tz("Asia/Taipei")
});

// TODO: remove it
export let memberList: Map<string, Array<member>> = new Map();

// TODO: remove it
export let FindMemberGroup: Map<string, string> = new Map();
