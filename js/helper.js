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
new JoyStick('joyDiv', {
    internalFillColor: "#ffffff",
    internalStrokeColor: "#aaaaaa",
    externalStrokeColor: "#ffffff"
})
