import { Camera } from "./camera.js";
import { TitleScreen } from "./titleScreen.js";
import { raceAudioInit } from "./audio.js";
import { getTimestamp, dt, gdt, now } from "./racer.js";
import { last, race, track, racing } from "./racer.js";
import { canvas, context } from "./racer.js";
import { speak } from "./speech.js";
import { outlineOnly } from "./render.js";

export const camera = new Camera();

export const titleScreen = new TitleScreen(canvas, context);

export function startGame(trackNumber) {
    raceAudioInit();
    speak("Start");
    racing = true;
    camera.reset();
    race.start(trackNumber);
}

document.addEventListener("keydown", function (e) {
    if (racing) {
        race.keyDown(e);
    } else {
        titleScreen.keyDown(e);
    }
});

document.addEventListener("keyup", function (e) {
    if (racing) {
        race.keyUp(e);
    } else {
        titleScreen.keyUp(e);
    }
});

export function frame() {
    //  stats.begin();
    now = getTimestamp();
    dt = Math.min(1, (now - last) / 1000);
    gdt = gdt + dt;
    //
    if (!racing) {
        titleScreen.render(dt);
        gdt = 0;
    }
    else {
        outlineOnly = false;

        const step = 1 / 180;
        while (gdt > step) {
            gdt = gdt - step;
            race.update(step);
        }

        track.drawOverheadTrack();
        race.render();

        last = now;
    }
    requestAnimationFrame(frame);
    //  stats.end();
}
//
frame();
