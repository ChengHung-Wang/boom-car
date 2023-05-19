function callback_RaceOver(){
    console.log("Race Over");
}

function callback_LapOver(lap){
    console.log("Lap Over", lap);
}

function callback_RunOffTrack(){//completely off
    console.log("Player Run Off Track");
}

function callback_BackOnTrack(){//completely on
    console.log("Player Back On Track");
}

function callback_SpeedChange(speed){
    //console.log("callback_SpeedChange: ", speed);
}

function callback_PlayerCrashwithBuilding(){
    console.log("Player Crash with Building");
}

function callback_PlayerCrashwithCar(crashed_car){
    console.log("Player Crash with Car index: ", crashed_car.index);
}

function callback_TurnChange(turnLeft, turnRight){
    if(!turnLeft && !turnRight || turnLeft && turnRight)
        console.log("Direction Changed: Straight");
    else if(turnLeft)
        console.log("Direction Changed: Left");
    else if(turnRight)
        console.log("Direction Changed: Right");
}