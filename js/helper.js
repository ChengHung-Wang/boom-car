$("#gameCanvas").attr("width", document.documentElement.clientWidth);
$("#gameCanvas").attr("height", document.documentElement.clientHeight);

const { createApp } = Vue
const appOption = {
    data() {
        return {
            joyStick: null,
            gameStarted: false
        }
    },
    created() {

    },
    methods: {
        startGame(trackNumber) {
            this.gameStarted = true;
            startGame(trackNumber);
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
