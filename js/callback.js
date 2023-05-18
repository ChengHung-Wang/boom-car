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