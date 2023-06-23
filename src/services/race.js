import { raceAudioTone, raceAudioEngineSpeed } from "./audio.js";
import { Car } from "./car.js";
import { utilPercentRemaining } from "./util.js";
import { racer } from "./racer.js";
import { speak } from "./speech.js";
import { Track } from "./track.js";
import { mathRand } from "./mathFunctions.js";
import { utilIncrease } from "./util.js";
import { cntx } from "./canvasFunctions.js";
import { constants } from "./constants.js";
import { DARKGREY, LIGHTGREY } from "./graphics.js";
import * as render from "./render.js";
import { useGameStore } from "@/stores/game";
import socketSender from "@/helper/socketSender.ts";

// TODO: let it become module type to solve camera undefined.
// controls the race
const numbers = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"];

export const STATE_PRERACE = 0;
export const STATE_COUNTDOWN = 1;
export const STATE_RACING = 4;
export const STATE_RACEOVER = 5;

export class Race {
  constructor() {
    this.gameStore = useGameStore();
    this.state = 0;
    this.countdownNumber = 3;
    this.lastTime = 0;

    this.carCount = 1; // Default: 10;
    this.AIAmount = this.gameStore.computerAmount;

    this.trackNumber = 0;

    // this.KeyzIsDown = false;
    // this.KeyxIsDown = false;
    // this.KeyUpIsDown = false;
    // this.KeyDownIsDown = false;
    // this.KeyLeftIsDown = false;
    // this.KeyRightIsDown = false;

    this.raceNumber = 3;

    this.socket_sender = new socketSender();

  }

  setAI() {
    this.carCount = 1 + this.gameStore.computerAmount;
    this.AIAmount = this.gameStore.computerAmount;
  }

  static COUNTDOWN_INTERVAL = 800;

  start(trackNumber) {
    raceAudioEngineSpeed(0);

    this.raceNumber = trackNumber;
    racer.track = new Track();

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
      default:
        racer.track.buildTrack1();
        break;
    }


    this.resetCars();
    racer.player = (racer.cars.value)[(useGameStore()).playerIndex];
    racer.player.initSlipstreamLines();
    this.state = STATE_PRERACE;
    this.countdownNumber = 4;
    this.lastTime = racer.getTimestamp();

  }

  raceOver() {
    this.state = STATE_RACEOVER;
    this.gameStore.gameOver = true;
  }

  keyDown(e) {
    if (this.state !== STATE_RACEOVER) {
      switch (e.keyCode) {
        case 90: // z
            this.KeyzIsDown = true;
            racer.player.setDrift(true);
          break;
        case 88: // x
          if(!racer.player.turboRequest) {
            // this.KeyxIsDown = true;
            this.socket_sender.carTurbo(racer.player);
            racer.player.setTurbo(true);
            // console.log(racer.player);
          }
          break;
        case constants.KEYUP:
          if(!racer.player.accelerate) {
            // this.KeyUpIsDown = true;
            this.socket_sender.carStraight(racer.player);
            racer.player.setAccelerate(true);
            // console.log(racer.player);
          }
          break;
        case constants.KEYDOWN:
          racer.player.setBrake(true);
          break;
        case constants.KEYLEFT:
          if(!racer.player.turnLeft) {
            // this.KeyLeftIsDown = true;
            this.socket_sender.carLeft(racer.player);
            racer.player.setTurnLeft(true);
            // console.log(racer.player);
          }
          break;
        case constants.KEYRIGHT:
          if(!racer.player.turnRight) {
            // this.KeyRightIsDown = true;
            this.socket_sender.carRight(racer.player);
            racer.player.setTurnRight(true);
            // console.log(racer.player);
          }
          break;
      }
    }
  }

  keyUp(e) {
    if (this.state !== STATE_RACEOVER) {
      switch (e.keyCode) {
        case 90: // z
          this.KeyzIsDown = false;
          racer.player.setDrift(false);
          break;
        case 88: // x(Turbo)
          if(racer.player.turboRequest) {
            // this.KeyxIsDown = false;
            this.socket_sender.carTurboCancel(racer.player);
            racer.player.setTurbo(false);
            // console.log(racer.player);
          }
          break;
        case constants.KEYUP:
          if(racer.player.accelerate) {
            // this.KeyUpIsDown = false;
            this.socket_sender.carStraightCancel(racer.player);
            racer.player.setAccelerate(false);
          }
          break;
        case constants.KEYDOWN:
          racer.player.setBrake(false);
          break;
        case constants.KEYLEFT:
          if(racer.player.turnLeft) {
            // this.KeyLeftIsDown = false;
            this.socket_sender.carLeftCancel(racer.player);
            racer.player.setTurnLeft(false);
            // console.log(racer.player);
          }
          break;
        case constants.KEYRIGHT:
          if(racer.player.turnRight) {
            // this.KeyRightIsDown = false;
            this.socket_sender.carRightCancel(racer.player);
            racer.player.setTurnRight(false);
            // console.log(racer.player);
          }
          break;
      }
    // } else {
    //   if (e.keyCode === 90) {
    //     if (!this.KeyzIsDown) {
    //       // retry race
    //
    //       this.start(this.raceNumber);
    //     }
    //     this.zIsDown = false;
    //   }
    //
    //   if (e.keyCode === 88) {
    //     if (!this.KeyxIsDown) {
    //       // next race
    //       if ((racer.cars.value)[(useGameStore()).playerIndex].finishPosition === "1st") {
    //         this.start(this.raceNumber + 1);
    //       }
    //     }
    //     this.KeyxIsDown = false;
    //   }
    }
  }

  resetCars() {
    racer.cars.value = [];
    let car, segment, z, sprite;
    for (let n = 0; n < this.carCount; n++) {
      z = racer.track.getLength() - (this.carCount - n) * Track.segmentLength * 13;

      segment = racer.track.findSegment(z);

      const trackLeft = segment.p1.world.x;
      const trackRight = segment.p2.world.x;
      //      let trackWidth = trackRight - trackLeft;

      //      sprite = SPRITES.CAR_STRAIGHT;

      car = new Car();
      if(n < this.carCount - this.AIAmount)
        car.isAI = false;
      car.PlayerIndex = (useGameStore()).playerIndex;

      let x = 0;
      if (n % 2) {
        x = trackLeft / 2;
      } else {
        x = trackRight / 2 - car.width;
      }

      car.index = n;
      car.x = x;
      car.z = z;
      car.sprite = sprite;
      car.speed = 0; //speed;
      car.percent = utilPercentRemaining(car.z, Track.segmentLength);

      // player speeds are set in car.js
      if (car.isAI) { //car.index !== (useGameStore()).controlIndex
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
      (racer.cars.value).push(car);
    }
  }

  updatePrerace(dt) {
    const time = racer.getTimestamp();
    if (time - this.lastTime > Race.COUNTDOWN_INTERVAL) {
      this.lastTime = racer.getTimestamp();
      this.countdownNumber--;
      if (this.countdownNumber === 3) {
        // speak("RACE");
      }
      if (this.countdownNumber === 2) {
        // speak(numbers[this.raceNumber]);
      }
      if (this.countdownNumber <= 0) {
        this.state = STATE_COUNTDOWN;
        this.countdownNumber = 3;
        // raceAudioTone(220, 1 / 4);
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
    const startPosition = racer.camera.z;

    for (let i = 0; i < (racer.cars.value).length; i++) {
      (racer.cars.value)[i].update(dt);
    }

    racer.camera.update(dt);

    render.bgLayerOffset.bgLayer3Offset = utilIncrease(
      render.bgLayerOffset.bgLayer3Offset,
      (render.bgLayerSpeed.bgLayer3Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
      Track.segmentLength,
      1
    );
    render.bgLayerOffset.bgLayer2Offset = utilIncrease(
      render.bgLayerOffset.bgLayer2Offset,
      (render.bgLayerSpeed.bgLayer2Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
      Track.segmentLength,
      1
    );
    render.bgLayerOffset.bgLayer1Offset = utilIncrease(
      render.bgLayerOffset.bgLayer1Offset,
      (render.bgLayerSpeed.bgLayer1Speed * playerSegment.curve * (racer.camera.z - startPosition)) /
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
    if (this.state === STATE_PRERACE) {
      // racer.context.value.font = "italic bold 350px " + constants.helvetica;
      //
      // if (this.countdownNumber < 4) {
      //   cntx.cntxFillStyle(DARKGREY);
      //   cntx.cntxFillText("RACE", 14, 304);
      //   cntx.cntxFillStyle(LIGHTGREY);
      //   cntx.cntxFillText("RACE", 10, 300);
      // }
      //
      // if (this.countdownNumber < 3) {
      //   if (this.raceNumber === 0) {
      //     racer.context.value.font = "italic bold 440px " + constants.helvetica;
      //   } else if (this.raceNumber === 1) {
      //     racer.context.value.font = "italic bold 430px " + constants.helvetica;
      //   } else if (this.raceNumber === 2) {
      //     racer.context.value.font = "italic bold 290px " + constants.helvetica;
      //   } else if (this.raceNumber === 3) {
      //     racer.context.value.font = "italic bold 358px " + constants.helvetica;
      //   }
      //
      //   cntx.cntxFillStyle(DARKGREY);
      //   cntx.cntxFillText(numbers[this.raceNumber], 14, 674);
      //   cntx.cntxFillStyle(LIGHTGREY);
      //   cntx.cntxFillText(numbers[this.raceNumber], 10, 670);
      // }
    }

    if (this.state === STATE_COUNTDOWN) {
      // racer.context.value.font = " 300px " + constants.helvetica;
      // racer.context.value.fillStyle = "#111111";
      // racer.context.value.fillText(this.countdownNumber, 449, 254);
      // racer.context.value.fillStyle = LIGHTGREY;
      // racer.context.value.fillText(this.countdownNumber, 445, 250);
    }

    if (this.state === STATE_RACING) {

      const speed = (
          "000" + Math.round(racer.player.getSpeed() / 100).toString(10)
      ).substr(-3);

      this.gameStore.rank = racer.player.position;
      this.gameStore.speed = speed;
      this.gameStore.lapCount = racer.player.getLap()
      this.gameStore.lapTime = racer.player.getCurrentLapTime().toFixed(2);
      this.gameStore.turboAmount = racer.player.turboAmount


      // cntx.cntxFillStyle(LIGHTGREY);
      // cntx.cntxStrokeStyle(LIGHTGREY);
      // racer.context.value.font = " 80px " + constants.helvetica;
      // racer.context.value.fillText(racer.player.getPosition(), 10, 80);
      //
      //
      // racer.context.value.font = " 40px " + constants.helvetica;
      // racer.context.value.fillText("Lap " + racer.player.getLap() + " of 2", 10, 130);
      // racer.context.value.fillText(
      //   "Lap Time: " + racer.player.getCurrentLapTime().toFixed(2),
      //   10,
      //   180
      // );

      //
      // racer.context.value.font = " 80px " + constants.helvetica;
      // racer.context.value.fillText(speed + "km/h", 695, 80);
      // racer.context.value.font = " 40px " + constants.helvetica;
      //
      // racer.context.value.fillText("Turbo ", 670, 136);
      // cntx.cntxBeginPath();
      // racer.context.value.rect(796, 110, 208, 28);
      // cntx.cntxStroke();
      // cntx.cntxFillRect(800, 114, racer.player.turboAmount * 2, 20);

      if ((racer.cars.value)[(useGameStore()).playerIndex].newPositionTime > 0) {
        racer.context.value.font = " 160px " + constants.helvetica;
        racer.context.value.textAlign = "center";
        cntx.cntxFillStyle(LIGHTGREY);
        racer.context.value.fillText((racer.cars.value)[(useGameStore()).playerIndex].getPosition(), (racer.canvas.value.width) / 2, 184);
      }
    }

    if (this.state === STATE_RACEOVER) {
      // racer.context.value.font = " 300px " + constants.helvetica;
      // cntx.cntxFillStyle(LIGHTGREY);
      // racer.context.value.fillText((racer.cars.value)[(useGameStore()).playerIndex].finishPosition, 300, 290); //cars[(useGameStore()).controlIndex].finishPosition, 494, 254);
      // racer.context.value.font = " 40px " + constants.helvetica;
      // let y = 380;
      // if ((racer.cars.value)[(useGameStore()).playerIndex].finishPosition === "1st") {
      //   racer.context.value.fillText("x: Next Race", 397, y);
      //   y += 80;
      // }
      // racer.context.value.fillText("z: Retry", 445, y);
    }
  }

  //改變車輛
  static ChangeCar(carIndex) {
    // racer.camera.WatchPlayer(carIndex);
    (useGameStore()).playerIndex = carIndex;
    racer.player = (racer.cars.value)[carIndex];
  }

//改變車輛最大速度
  static ChangeMaxSpeed(carIndex, speed) {
    (racer.cars.value)[carIndex].maxSpeed = speed;
  }

  static getCarSpeed(carIndex) {
    return (racer.cars.value)[carIndex].speed;
  }
}
