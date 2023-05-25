import { raceAudioTone, raceAudioEngineSpeed } from "./audio.js";
import { Car } from "./car.js";
import { utilPercentRemaining } from "./util.js";
import { racer } from "./racer.js";
import { speak } from "./speech.js";
import { Track } from "./track.js";
import { mathRand } from "./mathFunctions.js";
import { utilIncrease } from "./util.js";
import { cntx } from "./canvasFunctions"
import { constants } from "./constants.js";
import * as render from "./render.js";

// TODO: let it become module type to solve camera undefined.
// controls the race
export let PlayerIndex = 0;

const numbers = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"];

export const STATE_PRERACE = 0;
export const STATE_COUNTDOWN = 1;
export const STATE_RACING = 4;
export const STATE_RACEOVER = 5;

export class Race {
  constructor() {
    this.track = null;

    this.state = 0;
    this.countdownNumber = 3;
    this.lastTime = 0;

    this.carCount = 4; // 10;

    this.trackNumber = 0;

    this.zIsDown = false;
    this.xIsDown = false;

    this.raceNumber = 3;
  }

  static COUNTDOWN_INTERVAL = 800;

  start(trackNumber) {
    raceAudioEngineSpeed(0);
    // trackNumber = parseInt(prompt("Select Track 0 to 3: (>= 4 will back to 0)."));
    if (trackNumber >= 4) {
      trackNumber = 0;
    }

    this.raceNumber = trackNumber;

    switch (trackNumber) {
      case 0:
        racer.track.buildTrack1();
        break;
      case 1:
        racer.track.buildTrack2();
        break;
      case 2:
        racer.track.buildTrack3();
        break;
      case 3:
        racer.track.buildTrack4();
        break;
    }

    this.resetCars();
    racer.player = racer.cars[PlayerIndex];
    racer.player.initSlipstreamLines();
    this.state = STATE_PRERACE;
    this.countdownNumber = 4;
    this.lastTime = racer.getTimestamp();
  }

  raceOver() {
    this.state = STATE_RACEOVER;
  }

  keyDown(e) {
    if (this.state !== STATE_RACEOVER) {
      switch (e.keyCode) {
        case 90: // z
          this.zIsDown = true;
          racer.player.setDrift(true);
          break;
        case 88: // x
          this.xIsDown = true;
          racer.player.setTurbo(true);
          break;
        case constants.KEYUP:
          racer.player.setAccelerate(true);
          // console.log(racer.player);
          break;
        case constants.KEYDOWN:
          racer.player.setBrake(true);
          break;
        case constants.KEYLEFT:
          racer.player.setTurnLeft(true);
          break;
        case constants.KEYRIGHT:
          racer.player.setTurnRight(true);
          break;
      }
    }
  }

  keyUp(e) {
    if (this.state != STATE_RACEOVER) {
      switch (e.keyCode) {
        case 90: // z
          this.zIsDown = false;
          racer.player.setDrift(false);
          break;
        case 88:
          this.xIsDown = false;
          racer.player.setTurbo(false);
          break;
        case constants.KEYUP:
          racer.player.setAccelerate(false);
          break;
        case constants.KEYDOWN:
          racer.player.setBrake(false);
          break;
        case constants.KEYLEFT:
          racer.player.setTurnLeft(false);
          break;
        case constants.KEYRIGHT:
          racer.player.setTurnRight(false);
          break;
      }
    } else {
      if (e.keyCode == 90) {
        if (!this.zIsDown) {
          // retry race

          this.start(this.raceNumber);
        }
        this.zIsDown = false;
      }

      if (e.keyCode == 88) {
        if (!this.xIsDown) {
          // next race
          if (racer.cars[PlayerIndex].finishPosition == "1st") {
            this.start(this.raceNumber + 1);
          }
        }
        this.xIsDown = false;
      }
    }
  }

  resetCars() {
    //    resetCars();
    racer.cars = [];
    let car, segment, z, sprite;
    for (let n = 0; n < this.carCount; n++) {
      z = racer.track.getLength() - (this.carCount - n) * Track.segmentLength * 13;

      segment = racer.track.findSegment(z);

      const trackLeft = segment.p1.world.x;
      const trackRight = segment.p2.world.x;
      //      let trackWidth = trackRight - trackLeft;

      //      sprite = SPRITES.CAR_STRAIGHT;

      car = new Car();
      car.PlayerIndex = PlayerIndex;

      let x = 0;
      if (n % 2) {
        x = trackLeft / 2;
      } else {
        x = trackRight / 2 - car.width;
      }

      car.index = n;
      //      car.offset = offset;
      car.x = x;
      car.z = z;
      car.sprite = sprite;
      car.speed = 0; //speed;
      car.percent = utilPercentRemaining(car.z, Track.segmentLength);

      // player speeds are set in car.js
      if (car.index !== 0) {
        const maxSpeed = 23000; //23000;
        if (car.index < 8 && car.index > 3) {
          car.maxSpeed =
            maxSpeed * 0.905 -
            (mathRand() * (this.carCount - n - 1) * maxSpeed) / 55;
        } else if (car.index > 12) {
          car.maxSpeed =
            maxSpeed * 0.905 - ((this.carCount - n - 1) * maxSpeed) / 65;
        } else {
          car.maxSpeed =
            maxSpeed * 0.905 - ((this.carCount - n - 1) * maxSpeed) / 45;
        }
        car.accel = maxSpeed / 2;

        if (car.index < 4) {
          car.takeCornerOnInside = false;
        } else if (car.index < 8) {
          car.takeCornerOnInside = mathRand() > 0.4;
          car.slowOnCorners = mathRand() > 0.6;
        }
      }
      segment.cars.push(car);
      racer.cars.push(car);
    }
  }

  updatePrerace(dt) {
    const time = racer.getTimestamp();
    if (time - this.lastTime > Race.COUNTDOWN_INTERVAL) {
      this.lastTime = racer.getTimestamp();
      this.countdownNumber--;
      if (this.countdownNumber == 3) {
        speak("RACE");
      }
      if (this.countdownNumber == 2) {
        speak(numbers[this.raceNumber]);
      }
      if (this.countdownNumber <= 0) {
        this.state = STATE_COUNTDOWN;
        this.countdownNumber = 3;
        raceAudioTone(220, 1 / 4);
        //        speak(this.countdownNumber);
      }
    }
    racer.camera.update(dt);
  }

  updateCountdown(dt) {
    const time = racer.getTimestamp();
    if (time - this.lastTime > Race.COUNTDOWN_INTERVAL) {
      this.lastTime = racer.getTimestamp();
      this.countdownNumber--;
      if (this.countdownNumber <= 0) {
        raceAudioTone(440, 1 / 2);
        this.state = STATE_RACING;
      } else {
        raceAudioTone(220, 1 / 4);
        //        speak(this.countdownNumber);
      }
    }
    racer.camera.update(dt);
  }

  updateRace(dt) {
    const playerSegment = racer.track.findSegment(racer.player.z);
    // const speedPercent = player.speedPercent; //player.speed / maxSpeed;
    // const dx = dt * 2 * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
    const startPosition = racer.camera.z;

    for (let i = 0; i < racer.cars.length; i++) {
      racer.cars[i].update(dt); //, playerSegment, racer.player.width);
    }
    //  updateCars(dt, playerSegment, racer.player.width);

    //    racer.player.update(dt);
    racer.camera.update(dt);

    render.bgLayerSpeed.bgLayer3Offset = utilIncrease(
      render.bgLayer3Offset,
      (render.bgLayer3Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
      Track.segmentLength,
      1
    );
    render.bgLayerSpeed.bgLayer2Offset = utilIncrease(
      render.bgLayer2Offset,
      (render.bgLayer2Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
      Track.segmentLength,
      1
    );
    render.bgLayerSpeed.bgLayer1Offset = utilIncrease(
      render.bgLayer1Offset,
      (render.bgLayer1Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
      Track.segmentLength,
      1
    );
  }

  updateRaceOver() { }

  update(dt) {
    switch (this.state) {
      case STATE_PRERACE:
        this.updatePrerace(dt);
        break;
      case STATE_COUNTDOWN:
        this.updateCountdown(dt);
        break;
      case STATE_RACEOVER:
      case STATE_RACING:
        this.updateRace(dt);
        break;
    }
  }

  render() {
    render.renderRender();
    if (this.state == STATE_PRERACE) {
      //      racer.context.font = "120px \"Courier New\", Courier, monospace";
      racer.context.font = "italic bold 350px " + constants.helvetica;

      if (this.countdownNumber < 4) {
        cntx.cntxFillStyle(constants.DARKGREY);
        cntx.cntxFillText("RACE", 14, 304);
        cntx.cntxFillStyle(constants.LIGHTGREY);
        cntx.cntxFillText("RACE", 10, 300);
      }

      if (this.countdownNumber < 3) {
        if (this.raceNumber == 0) {
          racer.context.font = "italic bold 440px " + constants.helvetica;
        } else if (this.raceNumber == 1) {
          racer.context.font = "italic bold 430px " + constants.helvetica;
        } else if (this.raceNumber == 2) {
          racer.context.font = "italic bold 290px " + constants.helvetica;
        } else if (this.raceNumber == 3) {
          racer.context.font = "italic bold 358px " + constants.helvetica;
        }

        cntx.cntxFillStyle(constants.DARKGREY);
        cntx.cntxFillText(numbers[this.raceNumber], 14, 674);
        cntx.cntxFillStyle(constants.LIGHTGREY);
        cntx.cntxFillText(numbers[this.raceNumber], 10, 670);
      }
    }

    if (this.state == STATE_COUNTDOWN) {
      racer.context.font = " 300px " + constants.helvetica;
      racer.context.fillStyle = "#111111";
      racer.context.fillText(this.countdownNumber, 449, 254);
      racer.context.fillStyle = constants.LIGHTGREY;
      racer.context.fillText(this.countdownNumber, 445, 250);
    }

    if (this.state == STATE_RACING) {
      cntx.cntxFillStyle(constants.LIGHTGREY);
      cntx.cntxStrokeStyle(constants.LIGHTGREY);
      racer.context.font = " 80px " + constants.helvetica;
      racer.context.fillText(racer.player.getPosition(), 10, 80);

      racer.context.font = " 40px " + constants.helvetica;
      racer.context.fillText("Lap " + racer.player.getLap() + " of 2", 10, 130);
      racer.context.fillText(
        "Lap Time: " + racer.player.getCurrentLapTime().toFixed(2),
        10,
        180
      );

      racer.context.font = " 80px " + constants.helvetica;

      const speed = (
        "000" + Math.round(racer.player.getSpeed() / 100).toString(10)
      ).substr(-3);
      racer.context.fillText(speed + "km/h", 695, 80);
      racer.context.font = " 40px " + constants.helvetica;

      racer.context.fillText("Turbo ", 670, 136);
      cntx.cntxBeginPath();
      racer.context.rect(796, 110, 208, 28);
      cntx.cntxStroke();
      cntx.cntxFillRect(800, 114, racer.player.turboAmount * 2, 20);

      if (racer.cars[PlayerIndex].newPositionTime > 0) {
        racer.context.font = " 160px " + constants.helvetica;
        cntx.cntxFillStyle(constants.LIGHTGREY);
        racer.context.fillText(racer.cars[PlayerIndex].getPosition(), 334, 184);
      }
    }

    if (this.state == STATE_RACEOVER) {
      racer.context.font = " 300px " + constants.helvetica;
      cntx.cntxFillStyle(constants.LIGHTGREY);
      racer.context.fillText(racer.cars[PlayerIndex].finishPosition, 300, 290); //cars[PlayerIndex].finishPosition, 494, 254);
      racer.context.font = " 40px " + constants.helvetica;
      let y = 380;
      if (racer.cars[PlayerIndex].finishPosition == "1st") {
        racer.context.fillText("x: Next Race", 397, y);
        y += 80;
      }
      racer.context.fillText("z: Retry", 445, y);
    }
  }
}

//改變車輛
function ChangeCar(carIndex) {
  racer.camera.WatchPlayer(carIndex);
  PlayerIndex = carIndex;
  racer.player = racer.cars[carIndex];
}

//改變車輛最大速度
function ChangeMaxSpeed(carIndex, Speed) {
  racer.cars[carIndex].maxSpeed = Speed;
}

function getCarSpeed(carIndex) {
  return racer.cars[carIndex].speed;
}