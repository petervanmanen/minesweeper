class GameCoord {
    x: Number;
    y: Number;
    neighbombs: Number = 0;
    bomb: boolean;
    marked: boolean = false;
    revealed: boolean = false;
    number:Number;

    constructor(x: Number, y: Number, bomb: boolean, neighbombs: Number,number:Number) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
        this.neighbombs = neighbombs;
        this.number = number;
    }
}
export default GameCoord;