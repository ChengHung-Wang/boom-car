import { racer } from "./racer.js";
import {STATE_RACEOVER} from "@/services/race";
// import { constants } from "./constants.js";

const { createApp } = Vue;
const appOption = {
    data() {
        return {
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
// let RightDown = false;
// let LeftDown = false;
// let UpDown = false;
// let DownDown = false;

let e;

function PressStartGoingRight(){
    if(racer.player.turnRight === false){
        e = arrowRightDown;
        if(racer.race.state !== STATE_RACEOVER) {
            racer.player.keyDown(e);
            AccelerateSetting();
        } else {
            //titleScreen.keyDown(e);
        }
    }
}
function PressStopGoingRight(){
    if(racer.player.turnRight === true){
        e = arrowRightUp;
        if(racer.race.state !== STATE_RACEOVER) {
            racer.player.keyDown(e);
            AccelerateSetting();
        } else {
            //titleScreen.keyDown(e);
        }
    }
}
function PressStartGoingLeft(){
    if(racer.player.turnLeft === false){
        e = arrowLeftDown;
        if(racer.race.state !== STATE_RACEOVER) {
            racer.player.keyDown(e);
            AccelerateSetting();
        } else {
            //titleScreen.keyDown(e);
        }
    }
}
function PressStopGoingLeft(){
    if(racer.player.turnLeft === true){
        e = arrowLeftUp;
        if(racer.race.state !== STATE_RACEOVER) {
            racer.player.keyDown(e);
            AccelerateSetting();
        } else {
            //titleScreen.keyDown(e);
        }
    }
}
function AccelerateSetting(){
    racer.player.accelerate = true;
}