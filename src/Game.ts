import GameCoord from "./GameCoord";

class Game {
    started: boolean = false;
    state: string = "";
    bombarr: number[];
    width: number = 0;
    height: number = 0;
    nrbombs: number;
    boardCallBack: any;
    scoreboardCallBack: any;
    timeCallBack: any = null;
    tiles: GameCoord[] = [];
    startTime = Date.now()
    constructor(width: number, height: number, nrbombs: number) {
        this.nrbombs = nrbombs;
        this.height = height;
        this.width = width;
        this.bombarr = this.selectBombs();
        for (let y = 1; y <= height; y++) {
            for (let x = 1; x <= width; x++) {
                this.tiles.push(new GameCoord(x, y, this.bombarr.includes(this.getNumberForCoordinate(x,y)), this.getNeighbombs(x, y),this.getNumberForCoordinate(x,y)));
            }
        }
    }

    getBombsForCoordinate = (x: number, y: number) => {
        if (x > this.width || x < 1 || y > this.height || y < 1) {
            return 0;
        }
        return this.bombarr.includes(this.getNumberForCoordinate(x,y)) ? 1 : 0;
    }

    getNeighbombs = (x: number, y: number): number => {
        if (this.bombarr.includes(this.getNumberForCoordinate(x,y)))
            return 0;
        return this.getBombsForCoordinate(x + 1, y) + this.getBombsForCoordinate(x - 1, y) +
            this.getBombsForCoordinate(x + 1, y + 1) + this.getBombsForCoordinate(x - 1, y + 1) + this.getBombsForCoordinate(x, y + 1) +
            this.getBombsForCoordinate(x + 1, y - 1) + this.getBombsForCoordinate(x - 1, y - 1) + this.getBombsForCoordinate(x, y - 1);
    }

    getTileByCoordinate = (x: Number, y: Number) => {
        return this.tiles.find((tile) => {
            return tile.x === x && tile.y === y;
        });
    }
    getTileByNumber = (number:Number)=>{
        return this.tiles.find((tile) => {
            return tile.number===number;
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
        let gamecoord = this.getTileByCoordinate(x, y);
        this.startgame();
        console.log(gamecoord);
        console.log(this.getNumberForCoordinate(x.valueOf(),y.valueOf()));
        if (gamecoord != null) {
            if (gamecoord.bomb) {
                gamecoord.revealed = true;
                this.state = "lost";
                console.log("You lost");
            }
            else if (gamecoord.neighbombs === 0) {
                this.reveal(x.valueOf(), y.valueOf());
            } else {
                console.log("Neighbomb " + gamecoord.neighbombs);
                gamecoord.revealed = true;
            }
        }
        return;
    }

    update = () => {
        this.boardCallBack(this);
        if(this.gamewon()){
            this.state = "You win!";
            console.log("You win!");
        }
        this.setFlagsLeft();
    }

    setBoardCallBack(appCallBack: any) {
        this.boardCallBack = appCallBack;
    }

    setFlagsLeftCallback = (callBack: any) => {
        this.scoreboardCallBack = callBack;
    }

    sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    setFlagsLeft = () => {
        let bombs = this.bombarr.length;
        let flags = this.tiles.filter(tile => tile.marked).length;
        this.scoreboardCallBack(bombs - flags);
    }

    reveal = (x: number, y: number): boolean => {
        let gamecoord = this.getTileByCoordinate(x, y);
        if (gamecoord != null) {
            if (gamecoord.neighbombs === 0 && !gamecoord.revealed) {
                gamecoord.revealed = true;
                this.reveal(x + 1, y);
                this.reveal(x - 1, y);
                this.reveal(x + 1, y + 1);
                this.reveal(x, y + 1);
                this.reveal(x - 1, y + 1);
                this.reveal(x + 1, y - 1);
                this.reveal(x, y - 1);
                this.reveal(x - 1, y - 1);
            }
        }
        return false;
    }
    startgame(){
        console.log("Startgame");
        if(!this.started){
            this.state = "started";
            this.started=true;
            this.startTime = Date.now();
        }
    }
    gamewon():boolean{
        return this.bombarr.filter(i =>{
            return this.getTileByNumber(i)?.marked;
        }).length ===this.bombarr.length;

    }
    getRuntime(){
        if(this.started)
            return Math.ceil((Date.now() - this.startTime)/1000);
        return 0;
    }
    getNumberForCoordinate(x:number,y:number):number{
        return x + ((y-1) * this.width);
    }
}

export default Game;