import { constants } from "./constants.js";
import { racer } from "./racer.js";

const { createApp } = Vue;
const appOption = {
    data() {
        return {
            joyStick: null,
            gameStarted: false,
            camera: {
                x: 0,
                y: 0,
                z: 0
            }
        }
    },
    created() {
        this.camera.y = racer.camera.yOffset;
        this.camera.z = racer.camera.zOffset;
    },
    methods: {
        startGame(trackNumber) {
            this.gameStarted = true;
            racer.startGame(trackNumber);
        }
    },
    watch: {
        camera: {
            handler() {
                racer.camera.adjust(this.camera.y, this.camera.z);
            },
            deep: true
        }
    }
}

const app = createApp(appOption);
app.use(ElementPlus);
app.mount("#app");

const arrowRightDown = new KeyboardEvent('keydown', { keyCode: constants.KEYRIGHT });
const arrowLeftDown = new KeyboardEvent('keydown', { keyCode: constants.KEYLEFT });
const arrowUpDown = new KeyboardEvent('keydown', { keyCode: constants.KEYUP });
const arrowDownDown = new KeyboardEvent('keydown', { keyCode: constants.KEYDOWN });
const arrowRightUp = new KeyboardEvent('keyup', { keyCode: constants.KEYRIGHT });
const arrowLeftUp = new KeyboardEvent('keyup', { keyCode: constants.KEYLEFT });
const arrowUpUp = new KeyboardEvent('keyup', { keyCode: constants.KEYUP });
const arrowDownUp = new KeyboardEvent('keyup', { keyCode: constants.KEYDOWN });
let RightDown = false;
let LeftDown = false;
let UpDown = false;
let DownDown = false;
let e;
new JoyStick('joyDiv', {
    internalFillColor: "#ffffff",
    internalStrokeColor: "#aaaaaa",
    externalStrokeColor: "#ffffff"
}, function (stickData) {
    console.log("callback:", stickData.cardinalDirection);
    if (stickData.cardinalDirection[0] == 'N') {
        if (UpDown == false) {
            UpDown = true;
            e = arrowUpDown;
            if (racer.racing) {
                racer.race.keyDown(e);
            } else {
                racer.titleScreen.keyDown(e);
            }
        }
    }
    else {
        if (UpDown == true) {
            UpDown = false;
            e = arrowUpUp;
            if (racer.racing) {
                racer.race.keyUp(e);
            } else {
                racer.titleScreen.keyUp(e);
            }
        }
    }
    if (stickData.cardinalDirection[0] == 'S') {
        if (DownDown == false) {
            DownDown = true;
            e = arrowDownDown;
            if (racer.racing) {
                racer.race.keyDown(e);
            } else {
                racer.titleScreen.keyDown(e);
            }
        }
    }
    else {
        if (DownDown == true) {
            DownDown = false;
            e = arrowDownUp;
            if (racer.racing) {
                racer.race.keyUp(e);
            } else {
                racer.titleScreen.keyUp(e);
            }
        }
    }
    if (stickData.cardinalDirection[0] == 'E' || stickData.cardinalDirection[1] == 'E') {
        if (RightDown == false) {
            RightDown = true;
            e = arrowRightDown;
            if (racer.racing) {
                racer.race.keyDown(e);
            } else {
                racer.titleScreen.keyDown(e);
            }
        }
    }
    else {
        if (RightDown == true) {
            RightDown = false;
            e = arrowRightUp;
            if (racer.racing) {
                racer.race.keyUp(e);
            } else {
                racer.titleScreen.keyUp(e);
            }
        }
    }
    if (stickData.cardinalDirection[0] == 'W' || stickData.cardinalDirection[1] == 'W') {
        if (LeftDown == false) {
            LeftDown = true;
            e = arrowLeftDown;
            if (racer.racing) {
                racer.race.keyDown(e);
            } else {
                racer.titleScreen.keyDown(e);
            }
        }
    }
    else {
        if (LeftDown == true) {
            LeftDown = false;
            e = arrowLeftUp;
            if (racer.racing) {
                racer.race.keyUp(e);
            } else {
                racer.titleScreen.keyUp(e);
            }
        }
    }
})