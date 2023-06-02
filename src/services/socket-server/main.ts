import socketService from './service';
const port = 3000; // 可以根據需要更改伺服器埠號
new socketService(port);
import type {userInfo} from "@/services/socket-server/struct";



export const groupAmount = 4;
export const groupMaxMember = 15;
export let memberList: Map<string, Array<userInfo>> = new Map();
export let FindMemberGroup :Map<string ,string> = new Map();

memberList.set("A", []);
memberList.set("B", []);
