$("#gameCanvas").attr("width", document.documentElement.clientWidth);
$("#gameCanvas").attr("height", document.documentElement.clientHeight);

const { createApp } = Vue
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
        this.camera.y = camera.yOffset;
        this.camera.z = camera.zOffset;
    },
    methods: {
        startGame(trackNumber) {
            this.gameStarted = true;
            startGame(trackNumber);
        }
    },
    watch: {
        camera: {
            handler() {
                camera.adjust(this.camera.y, this.camera.z);
            },
            deep: true
        }
    }
}

const app = createApp(appOption)
app.use(ElementPlus);
app.mount("#app");

let arrowRightDown = new KeyboardEvent('keydown', { keyCode: KEYRIGHT });
let arrowLeftDown = new KeyboardEvent('keydown', { keyCode: KEYLEFT });
let arrowUpDown = new KeyboardEvent('keydown', { keyCode: KEYUP });
let arrowDownDown = new KeyboardEvent('keydown', { keyCode: KEYDOWN  });
let arrowRightUp = new KeyboardEvent('keyup', { keyCode: KEYRIGHT });
let arrowLeftUp = new KeyboardEvent('keyup', { keyCode: KEYLEFT });
let arrowUpUp = new KeyboardEvent('keyup', { keyCode: KEYUP });
let arrowDownUp = new KeyboardEvent('keyup', { keyCode: KEYDOWN  });
let RightDown = false;
let LeftDown = false;
let UpDown = false;
let DownDown = false;
let e;
new JoyStick('joyDiv', {
    internalFillColor: "#ffffff",
    internalStrokeColor: "#aaaaaa",
    externalStrokeColor: "#ffffff"
}, function(stickData) {
    //console.log("callback:", stickData.cardinalDirection);
    if(stickData.cardinalDirection[0] == 'N'){
        if(UpDown == false){
            UpDown = true;
            e = arrowUpDown;
            if(racing) {
                race.keyDown(e);
            } else {
                titleScreen.keyDown(e);
            }
        }
    }
    else{
        if(UpDown == true){
            UpDown = false;
            e = arrowUpUp;
            if(racing) {
                race.keyUp(e);
            } else {
                titleScreen.keyUp(e);
            }
        }
    }
    if(stickData.cardinalDirection[0] == 'S'){
        if(DownDown == false){
            DownDown = true;
            e = arrowDownDown;
            if(racing) {
                race.keyDown(e);
            } else {
                titleScreen.keyDown(e);
            }
        }
    }
    else{
        if(DownDown == true){
            DownDown = false;
            e = arrowDownUp;
            if(racing) {
                race.keyUp(e);
            } else {
                titleScreen.keyUp(e);
            }
        }
    }
    if(stickData.cardinalDirection[0] == 'E' || stickData.cardinalDirection[1] == 'E'){
        if(RightDown == false){
            RightDown = true;
            e = arrowRightDown;
            if(racing) {
                race.keyDown(e);
            } else {
                titleScreen.keyDown(e);
            }
        }
    }
    else{
        if(RightDown == true){
            RightDown = false;
            e = arrowRightUp;
            if(racing) {
                race.keyUp(e);
            } else {
                titleScreen.keyUp(e);
            }
        }
    }
    if(stickData.cardinalDirection[0] == 'W' || stickData.cardinalDirection[1] == 'W'){
        if(LeftDown == false){
            LeftDown = true;
            e = arrowLeftDown;
            if(racing) {
                race.keyDown(e);
            } else {
                titleScreen.keyDown(e);
            }
        }
    }
    else{
        if(LeftDown == true){
            LeftDown = false;
            e = arrowLeftUp;
            if(racing) {
                race.keyUp(e);
            } else {
                titleScreen.keyUp(e);
            }
        }
    }
})
