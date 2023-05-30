// kinect

const socket = new WebSocket('ws://localhost:8765');
let kinect_mode = false;
let interval_forward;
let interval_left;
let interval_right;
let interval_x;

socket.onopen = function () {
    console.log('Connected to server');
};

socket.onmessage = function (event) {
    const message = event.data;
    console.log('Received message from server: ' + message);

    if (message === "kinect_mode") {
        kinect_mode = true;
        //clearInterval(interval_forward);
        //clearInterval(interval_left);
        //clearInterval(interval_right);
        //clearInterval(interval_x);
        interval_forward = setInterval(simulateForwardKey, 100);
    } else if (kinect_mode) {
        if (message === "left_start") {
            clearInterval(interval_left);
            interval_left = setInterval(simulateLeftKey, 100);
        } else if (message === "left_stop") {
            clearInterval(interval_left);
            simulateLeftKeyRelease();
        } else if (message === "right_start") {
            clearInterval(interval_right);
            interval_right = setInterval(simulateRightKey, 100);
        } else if (message === "right_stop") {
            clearInterval(interval_right);
            simulateRightKeyRelease();
        } else if (message === "turbo_start") {
            clearInterval(interval_x);
            interval_x = setInterval(simulateXKey, 100);
        } else if (message === "turbo_stop") {
            clearInterval(interval_x);
            simulateXKeyRelease();
        } else if (message === "continue") {
            clearInterval(interval_left);
            clearInterval(interval_right);
            // simulateLeftKeyRelease();
            // simulateRightKeyRelease();
        }
    }
};

socket.onclose = function () {
    console.log('Connection closed');
};

function simulateForwardKey() {
    var event = new KeyboardEvent('keydown', { keyCode: 38 });
    document.dispatchEvent(event);
}

function simulateForwardKeyRelease() {
    var event = new KeyboardEvent('keyup', { keyCode: 38 });
    document.dispatchEvent(event);
}

function simulateLeftKey() {
    var event = new KeyboardEvent('keydown', { keyCode: 37 });
    document.dispatchEvent(event);
}

function simulateLeftKeyRelease() {
    var event = new KeyboardEvent('keyup', { keyCode: 37 });
    document.dispatchEvent(event);
}

function simulateRightKey() {
    var event = new KeyboardEvent('keydown', { keyCode: 39 });
    document.dispatchEvent(event);
}

function simulateRightKeyRelease() {
    var event = new KeyboardEvent('keyup', { keyCode: 39 });
    document.dispatchEvent(event);
}

function simulateXKey() {
    var event = new KeyboardEvent('keydown', { keyCode: 88 });
    document.dispatchEvent(event);
}

function simulateXKeyRelease() {
    var event = new KeyboardEvent('keyup', { keyCode: 88 });
    document.dispatchEvent(event);
}
