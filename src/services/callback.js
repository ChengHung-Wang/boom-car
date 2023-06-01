export function callback_RaceOver(){
    //console.log("Race Over");
}

export function callback_LapOver(lap){
    //console.log("Lap Over", lap);
}

export function callback_RunOffTrack(){//completely off
    //console.log("Player Run Off Track");
}

export function callback_BackOnTrack(){//completely on
    //console.log("Player Back On Track");
}

export function callback_SpeedChange(speed){
    //console.log("callback_SpeedChange: ", speed);
}

export function callback_PlayerCrashwithBuilding(){
    //console.log("Player Crash with Building");
}

export function callback_PlayerCrashwithCar(crashed_car){
    //console.log("Player Crash with Car index: ", crashed_car.index);
}


let last_direction = "Straight";
export function callback_TurnChange(turnLeft, turnRight){
    // if(!turnLeft && !turnRight || turnLeft && turnRight) {
    //     if(last_direction != "Straight") {
    //         console.log("Direction Changed: Straight");
    //         last_direction = "Straight";
    //     }
    // }
    // else if(turnLeft) {
    //     if (last_direction != "Left") {
    //         console.log("Direction Changed: Left");
    //         last_direction = "Left";
    //     }
    // }
    // else if(turnRight){
    //     if(last_direction != "Right") {
    //         console.log("Direction Changed: Right");
    //         last_direction = "Right";
    //     }
    // }
}

// export function callback_TurnChange(dir){
//     let last_direction = "Straight";
//     if(dir !== last_direction) {
//         console.log("Direction Changed: " +  dir);
//         last_direction = dir;
//     }
// }