class Game {
    constructor() {
        // equal to "isGameStart"
        this.racing = false;
    }
}

class Graphic
{
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

class DrawAble extends Graphic
{

}

class MoveAble extends DrawAble
{

}

class Car extends MoveAble
{

}
