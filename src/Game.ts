

class Game {
    bombarr: number[];
    width: number = 0;
    height: number = 0;
    nrbombs: number;
    appCallBack: any;
    tiles: GameCoord[] = [];
    constructor(width: number, height: number, nrbombs: number) {
        this.nrbombs = nrbombs;
        this.height = height;
        this.width = width;
        this.bombarr = this.selectBombs();
        for (let y = 1; y <= height; y++) {
            for (let x = 1; x <= width; x++) {
                this.tiles.push(new GameCoord(x, y, this.bombarr.includes(x * y), this.getNeighbombs(x, y)));
            }
        }
    }

    getBombsForCoordinate = (x: number, y: number) => {
        if (x > this.width || x < 1 || y > this.height || y < 1) {
            return 0;
        }
        return this.bombarr.includes(x * y) ? 1 : 0;
    }

    getNeighbombs = (x: number, y: number): number => {
        let myNum: number = x * y;
        if (this.bombarr.includes(myNum))
            return 0;
        return this.getBombsForCoordinate(x + 1, y) + this.getBombsForCoordinate(x - 1, y) +
            this.getBombsForCoordinate(x + 1, y + 1) + this.getBombsForCoordinate(x - 1, y + 1) + this.getBombsForCoordinate(x, y + 1) +
            this.getBombsForCoordinate(x + 1, y - 1) + this.getBombsForCoordinate(x - 1, y - 1) + this.getBombsForCoordinate(x, y - 1);
    }

    getTile = (x: Number, y: Number) => {
        return this.tiles.find((tile) => {
            return tile.x === x && tile.y === y;
        });
    }

    selectBombs = (): number[] => {
        const bombs: number[] = [];
        while (bombs.length < this.nrbombs) {
            const randomNumber = Math.floor(Math.random() * this.width * this.height) + 1;
            if (!bombs.includes(randomNumber)) {
                bombs.push(randomNumber);
            }
        }
        return bombs;
    }

    click = (x: Number, y: Number) => {
        let gamecoord = this.getTile(x, y);
        console.log(gamecoord);
        if (gamecoord != null) {
            if (gamecoord.bomb) {
                gamecoord.revealed = true;
                console.log("You lost");
            }
            else if (gamecoord.neighbombs === 0) {
                console.log("Neighbomb 0");
                this.reveal(x.valueOf(), y.valueOf());
            } else{
                console.log("Neighbomb " + gamecoord.neighbombs);
                gamecoord.revealed = true;
            }
        }
        this.update();
        return;
    }

    update = () => {
        this.appCallBack(this);
    }

    setGameCallBack(appCallBack:any){
        this.appCallBack = appCallBack;
    }

    reveal = (x: number, y: number):boolean =>{
        let gamecoord = this.getTile(x, y);
        console.log(gamecoord);
        if(gamecoord!=null){
            if (gamecoord.neighbombs === 0 && !gamecoord.revealed) {
                console.log(gamecoord);
                gamecoord.revealed = true;
                this.reveal(x+1,y);
                this.reveal(x-1,y);
                this.reveal(x+1,y+1);
                this.reveal(x,y+1);
                this.reveal(x-1,y+1);
                this.reveal(x+1,y-1);
                this.reveal(x,y-1);
                this.reveal(x-1,y-1);
            }
        }
        return false;
    }
}

class GameCoord {
    x: Number;
    y: Number;
    neighbombs: Number = 0;
    bomb: boolean;
    marked:boolean =false;
    revealed: boolean = false;

    constructor(x: Number, y: Number, bomb: boolean, neighbombs: Number) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
        this.neighbombs = neighbombs;
    }
}
export { GameCoord, Game }