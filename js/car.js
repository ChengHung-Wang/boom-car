class Car {
  constructor() {
    this.sprite = 0;
    this.index = 0;
    this.width = 500; //530; // width
    this.height = 0;

    this.x = 0;
    this.y = 0;
    this.lastY = false;
    this.yOffset = 0;
    this.z = 0;
    this.lap = 0;
    this.lapStarted = false;
    this.position = 0;

    this.centrifugal = 0.3;
    this.slipstreamLines = [];
    this.slipstreamLengths = false;
    this.slipstream = 0;
    this.slipstreamTime = 0;

    this.percent = 0; // percent remaining in segment
    this.speed = 0;
    this.ySpeed = 0;

    this.turboStartTime = 0;
    this.accelerate = false;
    this.brake = false;
    this.turnLeft = false;
    this.turnRight = false;
    this.turbo = false;
    this.turboRequest = false;
    this.driftRequest = false;
    this.driftAmount = 0;
    this.driftDirection = 0;

    this.turboAmount = 100;
    this.lapStarted = false;

    // these are settings for the player
    // the car init routine will set them for ai players
    this.centrifugal = 0.3; // centrifugal force multiplier when going around curves

    this.maxSpeed = 36000;
    this.maxTurboSpeed = 41000;

    this.speedPercent = 0; // speed as percentage of max speed

    this.accel = 6800;
    this.breaking = -16000;
    this.decel = -8000;

    this.currentLapTime = 0; // current lap time
    this.lastLapTime = null; // last lap time

    this.position = 0;

    this.turnSpeed = 3000;

    // ai settings
    this.slowOnCorners = false;
    this.takeCornerOnInside = false;

    this.bounce = 1;
    this.finishPosition = 0;
  }

  doaccelerate(v, accel, dt) {
    return v + accel * dt;
  }

  initSlipstreamLines() {
    this.slipstreamLines = [];
    //    let carWidth = this.width;
    let carHeight = 400;
    //    let centreX = this.x + this.width / 2;
    let centreZ = this.z + 500;
    //    let centreY = this.y + carHeight;// + carHeight;
    let smallRadius = carHeight - 40; // - 200;// - 570;
    let lineLength = 700;

    let segments = 20;

    let angle = 0.0;
    if (this.slipstreamLengths === false) {
      this.slipstreamLengths = [];
      for (let i = 0; i < segments; i++) {
        this.slipstreamLengths.push(mathRand());
      }
    }
    //尾流
    for (let i = 0; i < segments; i++) {
      
      this.slipstreamLengths[i] += 0.03;
      if (this.slipstreamLengths[i] >= 0.8) {
        this.slipstreamLengths[i] = 0;
      }

      let largeRadius = carHeight + 60;

      if (angle > PI / 6 && angle < PI / 2) {
        largeRadius = carHeight + 60 + (angle - PI / 6) * 128; // - 200;// - 570;
      }
      if (angle >= PI / 2 && angle < (5 * PI) / 6) {
        largeRadius = carHeight + 60 + ((5 * PI) / 6 - angle) * 128; // - 200;// - 570;
      }
      let x1 = this.x + this.width / 2 + smallRadius * Math.cos(angle - 0.05);
      let y1 = this.y + smallRadius * sin(angle - 0.02);
      let x2 = this.x + this.width / 2 + smallRadius * Math.cos(angle + 0.05);
      let y2 = this.y + smallRadius * sin(angle + 0.02);

      let x3 = this.x + this.width / 2 + largeRadius * Math.cos(angle - 0.05);
      let y3 = this.y + largeRadius * sin(angle - 0.05);
      let x4 = this.x + this.width / 2 + largeRadius * Math.cos(angle + 0.05);
      let y4 = this.y + largeRadius * sin(angle + 0.05);

      //      x3 = x1;
      //      y3 = y1;
      //      x4 = x2;
      //      y4 = y2;

      let x1a = x1 + (x3 - x1) * this.slipstreamLengths[i];
      let x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      let y1a = y1 + (y3 - y1) * this.slipstreamLengths[i];
      let y2a = y2 + (y4 - y2) * this.slipstreamLengths[i];

      let x3a = x1 + (x3 - x1) * (this.slipstreamLengths[i] + 0.4);
      let x4a = x2 + (x4 - x2) * (this.slipstreamLengths[i] + 0.4);

      let y3a = y1 + (y3 - y1) * (this.slipstreamLengths[i] + 0.4);
      let y4a = y2 + (y4 - y2) * (this.slipstreamLengths[i] + 0.4);

      let za = centreZ - lineLength * this.slipstreamLengths[i];
      let z2a = centreZ - lineLength * (this.slipstreamLengths[i] + 0.4);
      //      let 1a = x1 + (x3 - x1) * this.slipstreamLengths[i];
      //    let x2a = x2 + (x4 - x2) * this.slipstreamLengths[i];

      let line = [];
      line.push({
        world: {
          x: x1a,
          y: y1a,
          z: za,
        },
        camera: {},
        screen: {},
      });

      line.push({
        world: {
          x: x2a,
          y: y2a,
          z: za,
        },
        camera: {},
        screen: {},
      });

      line.push({
        world: {
          x: x4a,
          y: y4a,
          z: z2a, //centreZ - lineLength
        },
        camera: {},
        screen: {},
      });

      line.push({
        world: {
          x: x3a,
          y: y3a,
          z: z2a, //centreZ-lineLength
        },
        camera: {},
        screen: {},
      });

      this.slipstreamLines.push(line);
      angle += PI / segments;
    }

    for (let i = 0; i < this.slipstreamLines.length; i++) {
      let points = this.slipstreamLines[i];
      for (let j = 0; j < points.length; j++) {
        camera.project(points[j], 0, 0, width, height);
      }
    }
  }

  limit(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  overlap(x1, w1, x2, w2, percent) {
    let min1 = x1 - ((percent - 1) * w1) / 2;
    let max1 = x1 + w1 * percent;
    let min2 = x2 - ((percent - 1) * w2) / 2;
    let max2 = x2 + w2 * percent;
    return !(max1 < min2 || min1 > max2);
  }

  // --- player controls ----
  setTurnLeft(turn) {
    this.turnLeft = turn;
  }

  setTurnRight(turn) {
    this.turnRight = turn;
  }

  setAccelerate(accelerate) {
    this.accelerate = accelerate;
  }

  setBrake(brake) {
    this.brake = brake;
  }

  setTurbo(turbo) {
    this.turboRequest = turbo;
  }

  setDrift(drift) {
    this.driftRequest = drift;
  }
  // --- end player controls ---

  getCurrentLapTime() {
    return this.currentLapTime;
  }

  getLap() {
    if (this.lap < 1) {
      return 1;
    }
    return this.lap;
  }

  getPosition() {
    let i = this.position;
    let j = i % 10;
    let k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  getSpeed() {
    return this.speed;
  }

  update(dt) {
    //}, playerSegment, playerW) {
    let maxSpeed = this.maxSpeed;
    this.speedPercent = this.speed / this.maxSpeed;
    let currentSegment = track.findSegment(this.z);
    let playerSegment = track.findSegment(cars[PlayerIndex].z);
    let speedPercent = this.speedPercent;
    this.percent = utilPercentRemaining(this.z, Track.segmentLength);

    let dx = dt * this.turnSpeed * speedPercent; // at top speed, should be able to cross from left to right (-1 to 1) in 1 second
    let trackLeft = currentSegment.p1.world.x;
    let trackRight = currentSegment.p2.world.x;

    let carLeftSide = this.x;
    let carRightSide = this.x + this.width;

    // middle distance is about 900
    // furthest is about 1800
    let distanceToLeft = carLeftSide - trackLeft;
    let distanceToRight = trackRight - carRightSide;
    let trackWidth = trackRight - trackLeft;

    let extraSpeed = 1;

    // is the car on a curve? easy curve max is about 4
    if (currentSegment.curve < 0 && distanceToLeft > 0) {
      // turn left
      if (this.index !== PlayerIndex) {
        extraSpeed =
          1 +
          ((trackWidth - this.width - distanceToLeft) * -currentSegment.curve) /
          (trackWidth * 80);
      }
    } else if (currentSegment.curve > 0 && distanceToRight > 0) {
      if (this.index !== PlayerIndex) {
        extraSpeed =
          1 +
          ((trackWidth - this.width - distanceToRight) * currentSegment.curve) /
          (trackWidth * 80);
      }
    }

    if (extraSpeed < 1) {
      extraSpeed = 1;
    }

    // max speed multiplier
    // 根据一些条件来调整最大速度的乘数和加速度的乘数 飄移+尾流
    let mult = 0.8;
    let accMult = 1;
    if (this.slipstreamTime > 0) {
      mult += 0.4;
    }

    if (this.driftRequest) {
      // can only drift over certain speed ,otherwise we're breaking
      if (this.speed > 8000) {
        if (!this.drift && !this.accelerate) {
          this.driftAmount = 1.2;
          this.drift = true;
        }
        //mult -= 0.1;
        // can turn faster
      } else {
        mult -= 0.5;
        this.drift = false;
      }
    } else {
      this.drift = false;
    }

    if (this.driftAmount > 0 && this.speed > 8000) {
      this.driftAmount -= dt;
      mult -= 0.04;
      if (this.driftDirection == 0) {
        if (this.turnLeft) {
          this.driftDirection = -1;
        }
        if (this.turnRight) {
          this.driftDirection = 1;
        }
      }
    } else {
      this.drift = false;
      this.driftAmount = 0;
      this.driftDirection = 0;
    }

    let turboOn = this.turbo;
    // is turbo on?
    if (this.turboRequest) {
      this.turbo = this.turboAmount > 0 && this.speed > 8000 && this.accelerate;
    } else {
      this.turbo = false;
    }

    if (this.turbo) {
      accMult = 1.2;
      maxSpeed = this.maxTurboSpeed;
    }

    this.bounce = 3.4;
    // is the car offroad with a bit of leeway??
    //車輛是否偏移車道 成立減速
    if (
      distanceToLeft < -this.width * 0.1 ||
      distanceToRight < -this.width * 0.1
    ) {
      if (
        distanceToLeft + this.width * 0.1 < -playerSegment.kerbWidth ||
        distanceToRight + this.width * 0.1 < -playerSegment.kerbWidth
      ) {
        this.bounce = 9.5;
        mult -= 0.6;
        accMult -= 0.2;
      } else {
        mult -= 0.1;
        this.bounce = 6;
      }
    }

    this.bounce = this.bounce * mathRand() * speedPercent;

    if (this.index == PlayerIndex && race.state != STATE_RACEOVER) {
      // its the player

      this.x =
        this.x - dx * speedPercent * playerSegment.curve * this.centrifugal;

      if (this.driftDirection != 0) {
        dx = dx * 0.5;
      }
      if (this.turnLeft) this.x = this.x - dx;
      else if (this.turnRight) this.x = this.x + dx;

      let ddrift = this.driftDirection * this.speed * 0.00055;
      this.x += ddrift;

      //need to check for collision with other cars..
      this.z = utilIncrease(
        this.z,
        dt * this.speed * extraSpeed,
        track.getLength()
      );

      this.y = utilInterpolate(
        currentSegment.p1.world.y,
        currentSegment.p3.world.y,
        this.percent
      );
      this.yOffset = 0;

      if (this.accelerate) {
        if (this.turbo) {
          let time = getTimestamp();
          if (!turboOn) {
            this.turboStartTime = time;
          }
          // decrease the amount of turbo left
          this.turboAmount -= dt * 2.45;
          raceAudioSetTurboTime(time - this.turboStartTime);
        }
        if (this.speed < maxSpeed * mult) {
          this.speed = this.doaccelerate(this.speed, this.accel * accMult, dt);
        } else {
          // going too fast, need to decelerate
          this.speed = this.doaccelerate(this.speed, this.decel, dt);
          if (this.speed < maxSpeed * mult) {
            this.speed = maxSpeed * mult;
          }
        }
      } else if (this.brake) {
        this.speed = this.doaccelerate(this.speed, this.breaking, dt);
      } else {
        // not accelerating or breaking, so just decelerate
        this.speed = this.doaccelerate(this.speed, this.decel, dt);
      }

      // check for collisions with roadside objects
      for (let n = 0; n < playerSegment.sprites.length; n++) {
        let sprite = playerSegment.sprites[n];
        let spriteW = sprite.s * sprite.source.cw;
        let spriteX = sprite.x + sprite.source.cx * sprite.s;
        // check for collision will roadside object, same segment and rects overlap
        let carX = this.x;
        if (this.overlap(carX, this.width, spriteX, spriteW, 1)) {
          if (this.index == PlayerIndex) {
            raceAudioCrash();
            this.slipstream = 0;
            this.slipstreamTime = 0;
          }
          this.speed = maxSpeed / 5;
          this.z = utilIncrease(playerSegment.p1.world.z, 0, track.getLength()); // stop in front of sprite (at front of segment)
          break;
        }
      }

      let isBehind = false;
      for (let i = 0; i < cars.length; i++) {
        let distance = cars[i].z - player.z;
        if (player.z > track.getLength() - 1200) {
          distance -= track.getLength();
        }

        if (distance > 0 && distance < 1800) {
          let offCentre = (player.x - cars[i].x) / cars[i].width;
          if (offCentre < 0) {
            offCentre = -offCentre;
          }
          if (offCentre < 0.4) {
            isBehind = true;
          }
        }
      }

      if (isBehind && this.speed > 8000) {
        this.slipstream += dt * 1;
        if (this.slipstream > 0.14) {
          this.slipstreamTime = 2;
        }
      } else {
        this.slipstream = 0;
      }

      if (this.slipstreamTime > 0) {
        this.slipstreamTime -= dt;
      }
    } else {
      if (this.speed < maxSpeed) {
        this.speed = this.doaccelerate(this.speed, this.accel, dt);
      }

      let turnDir = this.updateCarPosition(
        currentSegment,
        playerSegment,
        player.width
      );
      let newX = this.x + turnDir * dx;

      if (currentSegment.curve == 0) {
        this.turnLeft = turnDir == -1;
        this.turnRight = turnDir == 1;
      } else {
        this.turnLeft = currentSegment.curve < -0.5;
        this.turnRight = currentSegment.curve > 0.5;
      }

      if (newX + this.width < trackRight * 0.6 && newX > trackLeft * 0.8) {
        this.x = newX;
      }
      this.z = utilIncrease(this.z, dt * this.speed, track.getLength());
    }

    this.percent = utilPercentRemaining(this.z, Track.segmentLength); // useful for interpolation during rendering phase
    let newSegment = track.findSegment(this.z);

    // check collisions with other cars
    // check other cars
    //碰撞發生將玩家車輛速度改為前方車輛 直到離開
    if (this.index === PlayerIndex) {
      for (let n = 0; n < newSegment.cars.length; n++) {
        let car = newSegment.cars[n];

        if (car.index != this.index) {
          if (this.speed > car.speed) {
            // check for collision with other car, same segment and rects overlap
            if (this.overlap(this.x, this.width, car.x, car.width, 1)) {
              if (this.index !== PlayerIndex) {
                this.speed = car.speed / 2;
                if (car.index !== PlayerIndex) {
                  car.speed = car.speed * 1.2;
                }
              } else {
                if (this.index == PlayerIndex) {
                  raceAudioCrash();
                  this.slipstream = 0;
                  this.slipstreamTime = 0;
                }

                this.speed = car.speed;
                this.z = car.z - 100;
              }
              break;
            }
          }
        }
      }
    }

    // limit how far offroad a car can go
    if (this.x + this.width / 2 < trackLeft - 1.2 * this.width) {
      this.x = trackLeft - 1.2 * this.width - this.width / 2;
    }

    if (this.x + this.width / 2 > trackRight + 1.2 * this.width) {
      this.x = trackRight + 1.2 * this.width - this.width / 2;
    }

    // limit the speed to max speed
    this.speed = this.limit(this.speed, 0, maxSpeed); // or exceed maxSpeed

    if (this.index == 0) {
      raceAudioEngineSpeed(this.speedPercent);
    }

    if (currentSegment != newSegment) {
      let index = currentSegment.cars.indexOf(this);
      currentSegment.cars.splice(index, 1);
      newSegment.cars.push(this);
    }

    // next lap?
    if (this.z < Track.segmentLength * 1.2 && !this.lapStarted) {
      this.lap++;
      this.lapStarted = true;
      this.lastLapTime = this.currentLapTime;
      //報時 一圈所花時間
      if (this.lap == 2 && this.index == PlayerIndex) {
        //!== 1 && this.lap !== 3) {
        speak("lap time " + this.getCurrentLapTime().toFixed(2));
      }
      this.currentLapTime = 0;
    } else {
      if (this.z > Track.segmentLength * 1.2) {
        this.lapStarted = false;
      }
      this.currentLapTime += dt;
    }

    // work out position, position relies on current lap
    //計算當前排名
    let currentPosition = this.position;
    this.position = 1;
    for (let i = 0; i < cars.length; i++) {
      if (i != this.index) {
        if (cars[i].lap > this.lap) {
          this.position++;
        } else if (cars[i].lap === this.lap) {
          if (cars[i].z > this.z) {
            this.position++;
          }
        }
      }
    }

    if (this.index == PlayerIndex) {
      if (this.newPositionTime > 0) {
        this.newPositionTime -= dt;
      }
      if (this.position !== currentPosition) {
        // new position!
        this.newPosition = this.getPosition();
        this.newPositionTime = 1;
      }
    }
    //this.lap圈數
    if (this.index === PlayerIndex && this.lap === 3 && race.state != STATE_RACEOVER) {
      // race over!!!
      this.finishPosition = this.getPosition();
      speak("Race. Over.");
      speak(this.finishPosition + " Place");

      this.turbo = false;
      this.slipstream = 0;
      this.slipstreamTime = 0;

      race.raceOver();
    }
  }
  // 一个循环来查找前方的道路段落，以确定汽车应该向左还是向右转
  updateCarPosition(carSegment, playerSegment, playerWidth) {
    let lookAhead = 60;

    let segment = null;

    let trackSegments = track.getSegmentCount();

    for (let i = 1; i < lookAhead; i++) {
      segment = track.getSegment((carSegment.index + i) % trackSegments);
      let trackLeft = segment.p1.world.x;
      let trackRight = segment.p2.world.x;
      let dir = 0;

      // avoid other cars less than 8 segments ahead
      if (i < 8) {
        /*
        if ((segment === playerSegment) 
        && (this.speed > player.speed) 
        && (this.overlap(otherCarLeft, otherCarWidth, this.x, this.width, 1.2))) {
        */
        for (let n = 0; n < segment.cars.length; n++) {
          let otherCar = segment.cars[n];

          let otherCarLeft = otherCar.x;
          let otherCarWidth = otherCar.width;
          let otherCarRight = otherCar.x + otherCar.width;

          if (trackRight - otherCarRight < this.width * 1.4) {
            // can't fit on the right
            dir = -1;
          } else if (otherCarLeft - trackLeft < this.width * 1.4) {
            dir = 1;
          } else {
            if (otherCarLeft - trackLeft > trackRight - otherCarRight) {
              dir = -1;
            } else {
              dir = 1;
            }
            //            dir = (this.x > otherCarLeft) ? 1 : -1;
          }

          return (dir * 3) / i; //* (this.speed-player.speed)/maxSpeed;
        }
      }
    }

    if (this.takeCornerOnInside) {
      for (let i = 1; i < lookAhead; i++) {
        segment = track.getSegment((carSegment.index + i) % trackSegments);
        let trackLeft = segment.p1.world.x;
        let trackRight = segment.p2.world.x;

        if (segment.curve > 0) {
          // move to the right
          if (i < 5) {
            return 1 / 5;
          }
          return 2 / i;
        }

        if (segment.curve < 0) {
          // move to the left
          if (i < 5) {
            return -1 / 5;
          }
          return 2 / i;
        }
      }
    }

    return 0;
  }
}