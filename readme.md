# boom car
台科大 多媒體導論期末專案
## 新鮮的肝
1. 王正宏 B11015020
2. 楊芷安 B11015033
3. 林信佑 B11015034 (2023/06 換到其他組別)
4. 吳丰荏 B11015051
5. 許誠恩 B11030031
6. 廖宣瑜 B11032001
7. 簡呈翰 B11032007
8. 李宇哲 B11033035

## 執行方法
### 第一次運行這個專案：
你必須先安裝 [nodejs](https://nodejs.org/zh-cn/download), 並且你電腦的命令列能夠吃到 `npm` 這個指令，推薦安裝穩定版即可。
```shell
npm run install
```

#### Run vite server in develop
```shell
npm run dev
```
#### Run socket server (Backend API)
```shell
npm run socket-server
```
#### Build to static web (Frontend part only)
```shell
npm run build
```
#### Kinect server
```shell
@TODO: 請 Kinect 負責人將資訊填入
```

## 重要連結
- [Figma 連結](https://www.figma.com/file/0P4luMPq5JdujS5ZBNrnTK/On-the-ROAD?type=design&node-id=1%3A5&t=V1EH8cNrADojEI5P-1)
- [Github 連結](https://github.com/ChengHung-Wang/boom-car)
- [Codepen 雛形Demo](https://codepen.io/chenghung-wang/full/gOBKvPW)

## 爆肝紀錄
- [2023-05-12 14:20:00](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/H1ymmUo4h/edit)
- [2023-05-19 13:30:00](https://hackmd.io/a_6VbG49QqqOhHKTgKv3qQ)
- [2023-05-19 工作詳細事項](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/SJBRWKLH3)
- [2023-05-30 工作詳細事項](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/rkiI5H7L2)
- [2023-06-06 工作詳細事項](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/rk48dBjL3)
- [2023-06-09 會議記錄 13:30:00](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/Hk-Hw4lvn)
- [2023-06-12 最後一周衝刺](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/HkiDKgzD2)

<details>
<summary>
Full TODO List (前方高能)
</summary>

註記：
1. 後方數字請參考上方新鮮的肝
2. <strong style="color: #dc3545;">做完後請發 PR 並找兩位組員當 Reviewer，請每次都找不一樣的，最後一位Reviewer 如果接受 PR，請合併並刪除 branch ，並請在下面的 TODO List 打勾</strong>

```
嚴禁躺分🙃
請有決心這東西可能每禮拜花掉你10小時以上的時間。
```

### UI/UX(2, 5)

`fullDrive`
Desktop Drive, ~~iPadOS~~, iOS Safari（螢幕方向為直）

`mobile`
~~iPadOS~~, iOS Safari，所有移動設備(除平板外)須包含橫、豎畫面設計。
- [x] figma 使用
- [x] figma 專案建置
- [ ] color & component & font library
- [ ] 所有按鈕、圖標、角標、開關、單、複選匡設計樣式總覽與對應名稱(僅能為英文小寫與`-`符號)
- [x] 彈出式視窗與交互方式設計 - `fullDrive`
- [ ] Prompt style - `fullDrive`
- [x] Succsss & Error(Danger) & Warning & Info 彈出式訊息提示視窗設計 - `fullDrive`
- [x] Game logo
- [x] Game name
- [x] 遊戲流程
- [x] 遊戲初始化畫面與流程(nickname, 遊戲模式選擇等等) - `fullDrive`
- [x] 遊戲大廳(包含各個prototype) - `fullDrive`
- [ ] 新手引導(包含各個prototype) - `fullDrive`
- [ ] 遊戲畫面 - `fullDrive`
   - [x] 氮氣加速按紐 - `mobile`
   - [ ] 設定菜單
   - [x] 網路品質狀態
   - [x] 小地圖視窗
   - [x] 現在名次
   - [x] 當前時速
   - [x] 遊戲時間
   - [ ] 生命值
   - [x] Turbo 剩餘量
   - [ ] Turbo 加速效果
   - [ ] 名次變化提示
   - [ ] 碰撞效果
- [x] 遊戲結束畫面 - `fullDrive`
- [x] 跑道選擇畫面 - `fullDrive`
- [x] 搖桿設計 - `mobile`
- [x] 氮氣加速控制按鈕 - `mobile`
- [ ] 帶有進度的 Loading 動畫樣式
- [x] 純 Loading 動畫樣式
- [ ] mobile, desktop 遊戲設定畫面 - `fullDrive`
- [ ] 新手引導跑道樣式(包含指引提示，須根據不同裝置設計對應畫面) - `fullDrive`
- [x] Carmara 設定精靈 - `fullDrive`
- [ ] 性能管理精靈(解析度與 refresh fps) - `fullDrive`
- [x] 車身樣式設計工具 - `fullDrive`


### Kinect suppport(8)
- [x] 動作定義
- [x] 聲音控制相關偵測
- [x] 臉部偵測與拍照
- [ ] 傳送照片到網頁端
- [ ] 控制信號定義
- [x] 左轉偵測
- [x] 右轉偵測
- [ ] 相機角度調整
- [x] WebSocket Server
- [x] 接入控制
- [ ] Turbo 偵測

### Coding
##### 註記：
| ⎋    | ⇤    | ⇌     | ⌘    |
|------|------|-------|------|
| 架構優化 | 底層程序 | 需配合美術 | 重要觀念 |

- [x] Github 專案建置 (1) - `⌘`
- [x] Debug tips (All) - `⌘`
- [x] Project exec (All) - `⌘`
- [x] Github 操作 (All) - `⌘`
- [x] html 與 css 知識(All) - `⌘`
- [x] Vue, Pinia 學習(All) - `⌘`
- [x] API(socket) 流程(All Coding 組，請參閱 06/09 會議記錄) - `⇤`
- [x] runningConfig 與 API 制定(All Coding 組) - `⇤`
- [x] .env 遷移 (1, 3) - `⇤`
- [x] 遷移至 Vue (1, 3, 6) - `⎋` `⇤`
- [x] Vue Component 規劃 (1, 3) - `⎋` `⇤`
- [x] 遊戲變數(參數)與 Pinia 變數映射(3) - `⎋` `⇤`
- [x] 玩家車輛選擇，並能夠控制對應車輛(指定跑道上哪輛車是玩家的)(4) - `⇤`
- [x] 動態調整指定車輛的速度、方向、位置 (4) - `⇤`
- [x] bug solve - 車輛重新繪製導致無法單獨控制的問題 (All)
- [x] 取得指定車輛或所有車輛狀態(4) - `⇤`
- [x] 用戶群組策略管理功能實現 (4) - `⇤`
- [x] 後端 API 開發 (1, 4) - `⇤`
- [x] 小地圖獨立渲染畫布 (4) - `⇤`
- [x] 將 base64 圖片渲染於車身後面 (4) - `⇤`
- [x] 文字顯示由 Canvas 畫布改為 標準 HTML 顯示 (2) - `⎋` `⇤` `⇌`
- [x] Vue3 & Pinia support (響應式 DOM 支持) (1, 2) - `⎋` `⇤`
- [x] Camera, Track, Race, Car 的 Prototype to OOP (6) - `⎋` `⇤`
- [x] 剩餘的Prototype to OOP(3) - `⎋` `⇤`
- [x] Camera, Track, Race, Car 的 `var` to `let` (6) - `⎋` `⇤`
- [x] `var` to `let` (3, 6) - `⎋` `⇤`
- [x] 遊戲引擎重構（轉換到 ES6 Module 形式），並解決 EsLint 報錯(3, 6) - `⎋`
- [x] Remove all the useless args, fn，但不要移除到組員寫的 function (3, 6) - `⌘` `⇤`
- [x] Camara 視角調整工具 (6) - `⇌` `⇤`
- [x] 移動端搖桿支持 (7) - `⇌` (joyStick Branch)
- [x] 移除搖桿與刪除對應套件，並合併分支 (7)
- [x] 新增function，執行後可以讓車只使用左右轉時也可以前進，再次執行後可以取消這樣的設定(toggle)，並且有一變數可以取得當前狀態 (7)
- [x] 車與車碰撞偵測 (7) - `⇤`
- [x] 車與建築物碰撞偵測 (7) - `⇤`
- [x] 超出跑道偵測 (7) - `⇤`
- [x] 跑完一圈 callback (7) - `⇤`
- [x] 到達終點 callback (7) - `⇤`
- [x] 玩家行駛方向改變 callback(7) - `⇤`
- [x] 玩家速度改變 callback(7) - `⇤`
- [x] 移動端、Kinect 端自動前進支援(7) - `⇤`
- [x] WebSocket 支持 (1, 4, 6, 7) - `⇤`
- [ ] 多人模式同步其他玩家狀態 (6, 7)
- [x] Canvas 實時自適應渲染 (1) - `⇤`
- [x] 後端 API 規劃 (1) - `⇤`
- [x] WebSocket 指令定義 (1) - `⇤`
- [x] WebSocket 廣播模組 (1, 2) - `⇤`
- [x] 多人模式雛形：兩台車可以正常前進與停下，並且同步對方的動作 (6, 7)
- [ ] 多人模式身份可識別化 (player_id, socket.id) (6, 7)
- [ ] 多人模式 x,y,z 軸同步更新 (6, 7)
- [ ] 遊戲大廳設計實現 (1, 2) - `⇤` `⇌`
- [ ] 遊戲主畫面設計實現 (1, 2) - `⇤` `⇌`
- [ ] 遊戲結束畫面設計實現 (1, 2) - `⇤` `⇌`
- [ ] 錯誤顯示 callback 與彈窗設計實現 (1, 2) - `⇤` `⇌`
- [x] v新手跑道設計 (2) - `⇌`
- [x] 可以切換視角到指定車輛 (4) - `⇤`
- [ ] 遊戲延遲檢測工具 - `⇤`
- [ ] 設備類型偵測 (1, 2) - `⇤`

### Networking & Deploy
- [x] Domain & SSL 證書
- [ ] Socket Server 部署
- [ ] Socket Load Balancer

### Misc
- [x] 起跑位置不同的公平性問題解決方案 (6)
- [x] 遊戲規則定案 (All)
- [x] 遊戲流程圖 (2)
- [ ] i18n 多語系支援 config(1, 7)
</details>

## boom-car Socket API Doc
event type: command | sync | result | error
注意：為了縮減資料傳輸量，請 client 端將非必要不要將自己的 player_id 加上去

| function name        | type    | sender               | broadcast  |
|----------------------|---------|----------------------|------------|
| set-nickname         | command | client -> server     | all user   |
| join-event           | command | client -> server     | all user   |
| game-start           | command | administer -> server | all user   |
| game-ranking         | sync    | server->client       | same group |
| game-rise            | sync    | server->client       | all user   |
| alert-client-amount  | sync    | server->client       | all user   |
| game-end             | command | client->server       | -          |
| get-users            | command | client->server       | -          |
| car-ranking          | command | client->server       | same group |
| car-straight         | command | client->server       | same group |
| car-straight-cancel  | command | client->server       | same group |
| car-left             | command | client->server       | same group |
| car-left-cancel      | command | client->server       | same group |
| car-right            | command | client->server       | same group |
| car-right-cancel     | command | client->server       | same group |
| car-turbo            | command | client->server       | same group |
| car-turbo-cancel     | command | client->server       | same group |
| car-collision        | command | client->server       | same group |
| car-collision-cancel | command | client->server       | same group |
| car-collision-cancel | command | client->server       | same group |
| -                    | error   | server->client       | one user   |

### error response template （目前都是由 Server 端產生的）
```json
{
    "type": "error",
    "data": {
        "reasonKey": "..."
    }
}
```

<details>
  <summary>join-event 加入活動</summary>

預設活動名稱：花錢的凱子一條龍<br>
代碼：pipeline-of-richer-pay

```json
{
    "type": "command",
    "data": {
        "command": "join-event",
        "data": {
          "code": "pipeline-of-richer-pay"
        }
    }
}
```

`error` 不存在的活動
```json
{
    "type": "error",
    "data": {
        "reasonKey": "ERR_EVENT_NOT_FOUND"
    }
}
```

`error` 活動尚未開始
```json
{
    "type": "error",
    "data": {
        "reasonKey": "ERR_EVENT_HAVE_NOT_START_YET"
    }
}
```

`error` 超過本次活動選手上線
```json
{
    "type": "error",
    "data": {
      "reasonKey": "ERR_OVER_CLIENT_AMOUNT"
    }
}
```
</details>

<details>
    <summary>set-nickname 設置暱稱</summary>

`command`
client send:
```json
{
    "type": "command",
    "data": {
        "command": "set-nickname",
        "data": {
            "nickname": "string"
        }
    }
}
```

`error`
重複的暱稱
```json
{
    "type": "error",
    "data": {
        "reasonKey": "ERR_DUPLICATED_NICKNAME"
    }
}
```

`error`
不合法的暱稱
```json
{
    "type": "error",
    "data": {
        "reasonKey": "ERR_NICKNAME_NOT_VALID"
    }
}
```
</details>

<details>
<summary>alert-client-amount 同步當前用戶數</summary>

```json
{
  "type": "sync",
  "data": {
    "command": "alert-client-amount",
    "data": {
      "clientAmount": 38
    }
  }
}
```
</details>

<details>
    <summary>game-start 遊戲開始</summary>

`command`
administer send
```json
{
    "type": "command",
    "data": {
        "command": "game-start"
    }
}
```

`error`
The game has started
```json
{
  "type": "error",
  "data": {
    "reasonKey": "ERR_GAME_HAS_STARTED"
  }
}
```

`error` 權限非法
```json
{
    "type": "error",
    "data": {
      "reasonKey": "ERR_PERMISSION_DENY"
    }
}
```

`sync`
server send to all client
註記： 服務端會根據現在的人數與場次直接分配四組，兩組，一組。members需要根據用戶所在的組別提供對應的組別名單。
rank 在這邊是指你是跑道上的第幾台車。
```json
{
    "type": "sync",
    "data": {
      "command": "game-start",
      "data": {
        "members":[
          {
            "nickname": "B11015020",
            "player_id": "blablablablabla",
            "rank": 0
          },
          {
            "nickname": "B11015033",
            "player_id": "ccccccccccccCat",
            "rank": 1
          }
        ]
      }
    }
}
```

</details>

<details>
<summary>game-ranking 遊戲排名</summary>
註記：遊戲排名會在該組最後一位發送 `game-end` 後自動向客戶端發送本場遊戲的排名

`sync`
server send to all client (group by userGroup)
註記： 服務端會根據現在的人數與場次直接分配四組，兩組，一組。members需要根據用戶所在的組別提供對應的組別名單。
```json
{
    "type": "sync",
    "data": {
      "command": "game-ranking",
      "data": {
        "members":[
          {
            "nickname": "B11015020",
            "player_id": "blablablablabla",
            "rank": 1,
            "rise": true
          },
          {
            "nickname": "B11015033",
            "player_id": "ccccccccccccCat",
            "rank": 1,
            "rise": false
          }
        ]
      }
    }
}
```
</details>

<details>
    <summary>game-rise 遊戲晉級</summary>

`command`
administer send
```json
{
    "type": "command",
    "data": {
        "command": "game-rise"
    }
}
```

`error`
Previous haven't finish
```json
{
  "type": "error",
  "data": {
    "reasonKey": "ERR_PREVIOUS_GAME_HAVE_NOT_END"
  }
}
```

`sync`
server send to all client
註記： 服務端會根據場次重新分組，並且移除未晉級的玩家連線，並將有晉級的玩家重新組隊。
rank 在這邊是指你是跑道上的第幾台車。
```json
{
    "type": "sync",
    "data": {
      "command": "game-rise",
      "data": {
        "members":[
          {
            "nickname": "B11015020",
            "player_id": "blablablablabla",
            "rank": 0
          },
          {
            "nickname": "B11015033",
            "player_id": "ccccccccccccCat",
            "rank": 1
          }
        ]
      }
    }
}
```

</details>

<details>
    <summary>game-end 某玩家跑完了兩圈（結束了這回合）</summary>

`command`
client send to server
rank 在這邊是指你在這回合中的第幾名
```json
{
    "type": "command",
    "data": {
      "command": "game-end",
      "position": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "rank": 1
    }
}
```

`sync`
server 廣播給同組的 client
```json
{
    "type": "sync",
    "data": {
      "command": "game-end",
      "player_id": ".......",
      "position": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "rank": 1
    }
}
```
</details>

<details>
  <summary>
    car-* (car-ranking, car-straight, car-left, car-left-cancel...)  
  </summary>

#### 此指令包含：
- car-ranking: 車輛變換名次時發出
  - car-straight: 車輛直走
  - car-straight-cancel：車輛取消直走
  - car-left: 車輛左轉
  - car-left-cancel: 車輛左轉取消
  - car-right: 車輛右轉
  - car-right-cancel: 車輛右轉取消
  - car-turbo: 車輛加速
  - car-turbo-cancel: 車輛加速取消
  - car-collision: 車輛碰撞
  - car-collision-cancel: 車輛碰撞取消

`command`
client send to server
</details>


----

#### 後端的，我都寫在這裡了，就求你先看完再開工，這些都是 Socket.io 內建的：
備註： `socket.id = player_id`

```typescript
let socketClients = [
   "ojIckSD2jqNzOqIrAGzL",
   "blablablablabla"
];

// 取得現在所有連線的使用者(回傳 socket)
const allClientsID = await io.fetchSockets();

// 取得在 "groupX" 範圍的使用者（你想把他理解成房間還是組別都一樣）
const allClientsIdWhoInGroupX = await io.in("groupX").fetchSockets();

// 將 groupX 範圍的使用者都加到 groupY 群組
io.in("groupX").socketsJoin("groupY");

// 將 groupX 範圍的使用者都加到 groupY 與 groupZ 群組
io.in("groupX").socketsJoin(["groupY", "groupZ"]);

// 將 socketClients 陣列中的使用者都加到 groupY 群組
io.in(socketClients).socketsJoin("groupY");

// 將 socketClients 陣列中的使用者從連線中移除
io.in(socketClients).disconnectSockets(true);
// 切斷所有用戶的連線
io.disconnectSockets();

// 廣播一則訊息給除了指定範圍的用戶
io.except("groupX").emit("foo", "bar");
io.except(["groupX", "groupY"]).emit("foo", "bar");

```

