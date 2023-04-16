import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import Game from './Game';


function Board(props: {

}
) {
  const numFlags = 150;
  const gameWidth = 25;
  const gameHeight = 25;
  const numBombs = numFlags;

  const [flagsleft, setFlagsLeft] = useState(numFlags);
  const [state, setState] = useState();
  const [mode, setMode] = useState(1);


  const newGame = ():Game => {
    let myGame = new Game(gameWidth, gameHeight, numBombs);
    myGame.setFlagsLeftCallback(setFlagsLeft);
    myGame.setStateCallback(setState)
    myGame.setModeCallback(setMode)
    return myGame;
  }

  const [game, setGame] = useState(newGame());
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [, updateState] = React.useState<any>();
  game.setBoardCallBack((game: Game) => {
    setGame(game);
    forceUpdate();
    console.log(game.bombarr);
  });

  const togglemode = () =>{
    game.toggleMode();
  }
  const clickNewGame = () =>{
    setGame(newGame);
  }

  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(game.getRuntime());
    }, 1000);
    return () => clearInterval(interval);
  }, [game]);
  
  return (
    <div className="Board" style={{ width: game.width * (25 + 2) + "px" }}>
      <div className="scoreboard">
        <div className="left">
          <div>Bombs {game.bombarr.length}</div>
          <div>Flags {flagsleft}</div>
        </div>
        <div className="right">
          <div>Time {time}</div>
          <div>{state}</div>
        </div>
      </div>

      {game.tiles.map((gameCoord: any) => {
        return (<Tile key={gameCoord.x + "-" + gameCoord.y} tile={gameCoord} game={game} />);
      })
      }
      <div className="scoreboard">
        <button onClick={togglemode}>Toggle</button>
        <div>Mode {mode? <span>REVEAL</span> :<span>MARK</span>}</div>
        <button onClick={clickNewGame}>Newgame</button>
      </div>

    </div>
  );
}

export default Board;
