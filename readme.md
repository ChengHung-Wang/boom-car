# 花錢的凱子一條龍

Deadline: 2023-06-16(報告日期) <br />
最晚六月前進入第三階段

## 會議記錄
[2023-05-12 14:20:00 Start](https://hackmd.io/@cJ6It8dzQM-AxvJdVHHRpA/H1ymmUo4h/edit)

## 重要的連結
[Figma 連結](https://www.figma.com/file/0P4luMPq5JdujS5ZBNrnTK/On-the-ROAD?type=design&node-id=1%3A5&t=V1EH8cNrADojEI5P-1)

### 理想情況
Demo時可以跟全班的同學一起玩，我們提供一個網址，他們可以透過他們筆電或手機的瀏覽器直接開啟，並且跟大家能夠reel-time的一起玩遊戲。

### 新鮮的肝
1. 王正宏 B11015020
2. 楊芷安 B11015033
3. 林信佑 B11015034
4. 吳丰荏 B11015051
5. 許誠恩 B11030031
6. 廖宣瑜 B11032001
7. 簡呈翰 B11032007
8. 李哲宇 B11033035

### Tips:
1. 到最後不用把 Code 交出去 (by 助教)
2. 會有向全班 Demo 的機會
3. 可以用第三方模型(tensoflow)，但是輸入來源要為 Kinect

### 分工 - 第一階段(2023-05-05)
#### 所有人：都給我把[這個專案](https://github.com/pmndrs/racing-game)在你的電腦 run 起來
<details>
<summary>Run 起來的方法</summary>

1. 下載 [專案](https://github.com/pmndrs/racing-game) 到你的電腦，如果下載下來是.zip壓縮包則需要解壓縮。
2. 進到專案資料夾
    - Windows 用戶：Windows鍵敲一下，鍵入：cmd，敲一下回車，後面操作跟macOS差不多
    - macOS 用戶: Command (or Cmd) ⌘ + Space 懟下去，鍵入：
      ![](https://i.imgur.com/kBbE1SG.png)，敲一下回車，在彈出來的程式裡面輸入`node -v`，敲一下回車，如果提示找不到對應指令等等之類的訊息，請到 [nodejs](https://nodejs.org/zh-cn/download/) 官網載來安裝，請下載長期維護版，裝完後，重新開啟終端機（Terminal）輸入一樣輸入`node -v` 看看有沒有出來東西，沒有出來請趕快到群組求救。

      接下來，請在終端機中輸入`cd ` ，注意，cd 後面要空一格，然後將專案資料夾拖到終端機裡面（不用將專案資料夾打開），回車敲一下以切換到對應目錄

      輸入 `npm install` 可能會需要很長的時間，不要以為它卡住了
      數入 `npm run dev`，過一陣子應該能看到一個網址，長：http://localhost:3000，到瀏覽器打開這個網址
      enjoy~~
    - 其他系統: 能不用上面兩個系統，你一定知道要怎麼辦到

注意，npm run dev打完之後不可以把終端機關掉，否則Server會停止。
如果以後要再次開啟專案的話，只要將終端機切換到對應的資料夾下輸入 `npm run dev` 即可

</details>

#### 美工與畫面組
- 成員：楊芷安、許誠恩
- 工具：blender & Figma
- 現階段工作摘要：
    - @zhian66 教 Dooooooooooria 使用 Figma
    - 簡單的來說，就是觀察現有專案，列出需要更改的點就好。
    - 需要顧慮到手機版與電腦版的需求，與不同平台間的操作便利性
    - 創意發想，外觀上的改造
    - 遊戲名稱與 Logo(請在星期二之前處理好)
    - 用戶引導教學設計
    - 手機版虛擬控制手柄
- figma連結：https://www.figma.com/file/0P4luMPq5JdujS5ZBNrnTK/On-the-ROAD?type=design&node-id=1%3A5&t=Tf1brdp6UGi0aNv2-1

#### Kinect 控制套件
- 成員：李哲宇
- 注意事項：Loading 太重的話，你可以從Coding 組那邊拉人過來
- 現階段工作摘要：
    - 確認 Kinect 偵測能力
    - 評估 tensorflow 必要性
    - 制定輸出信號與對應動作(什麼樣的動作對應到遊戲的什麼操作)

#### Coding
- 成員: 王正宏, 林信佑, 吳丰荏, 廖宣瑜, 簡承翰
- 推薦 IDE: [Jetbrain WebStorm](https://www.jetbrains.com/webstorm/)，可以以學生的身份免費使用完整的 Jetbrain Apps
- 能力範圍：基礎程式邏輯, html, css, JavaScript, TypeScript, ReactJS, Three.js, React Three Fiber, React Spring
- 現階段工作摘要：
    - 研究 Code, 弄清楚架構
    - 想想看？怎麼Debug? 如何知道那個變數裡面裝了啥？
    - 設標籤`<n>...</n>` 或 `<n />`, n為標籤的名稱，你知道怎麼研究這個標籤的意思嗎？要怎麼判斷要上網查還是看他寫的code？
    - 碰撞偵測原理了解
    - 優化現有專案架構，先把一些 hard coding 的問題改掉，像這種，我會建議移到 .env file
      ![](https://i.imgur.com/ZveVI1R.png)
      /src/data.ts

### 工作排程
#### 第一階段 - 研究與可行性評估(1 week)：
- Kinect 交互確認
- 確認新功能與移除的功能
- Code 架構了解
- Logo, 遊戲名稱確認

第二階段 - 創意發想與實現(2 week)：
- Github 專案建立與權限設定
- 實現美術組的設計
- WebSocket 與 用戶系統

第三階段 - 用戶體驗改善、部署
- 部署(Cloud Service, Domain, SSL)
- 用戶體驗改善

### 工具

- [codrops 一個很讚的網站，你點進去看就知道了](https://tympanus.net/codrops/category/tutorials/)
    - [附上一個裡面的 demo](https://tympanus.net/codrops/2022/04/25/case-study-windland-an-immersive-three-js-experience/)
- [three.js](https://threejs.org)
    - Three.js 是一套基於 WebGL 開發出的 Javascript 函式庫，它提供了比 WebGL 更簡單的 Javascript API，讓開發者能夠輕易在瀏覽器做 3D 繪圖
- [Kinect 與網頁串接](http://blog.mackerron.com/2012/02/03/depthcam-webkinect/)
- [Kinect-js github](https://github.com/v-kiniv/kinect-js)


<!-- ## 共筆

### 安裝環境

- Mac 打開 terminal
- Windows 打開 cmd


打上 `node -v`

如果有顯示錯誤，要到 [node.js 官網](https://nodejs.org/en)下載


### 打開賽車專案

[專案連結](https://github.com/pmndrs/racing-game)

```shell!
git clone https://github.com/pmndrs/racing-game.git

cd racing-game
npm install
npm run dev
```

打開跳出的網址（http://localhost:3000/）
開始玩車車

---

之後要再打開一次的話，直接進入資料夾，
`npm run dev`

---


public 放媒體檔案(材質、音樂)
src 放程式相關檔案

 -->
