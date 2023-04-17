import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import Game from './Game';


function Board(props: {

}
) {
  const numBombs = 125;
  const gameWidth = 25;
  const gameHeight = 25;
  const numFlags = numBombs;

  const [flagsleft, setFlagsLeft] = useState(numFlags);
  const [state, setState] = useState();
  const [mode, setMode] = useState(1);


  const newGame = (): Game => {
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
  });

  const togglemode = () => {
    game.toggleMode();
  }
  const clickNewGame = () => {
    setGame(newGame);
  }

  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(game.getRuntime());
    }, 950);
    return () => clearInterval(interval);
  }, [game]);

  return (
    <div>
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
      <div className="Board" style={{ width: game.width * 1.54 + "em" }}>


        {game.tiles.map((gameCoord: any) => {
          return (<Tile key={gameCoord.x + "-" + gameCoord.y} tile={gameCoord} game={game} />);
        })
        }


      </div>
      <div className="buttonbar">
        <div className="left">
          <button onClick={togglemode}>Toggle</button>
          <div>Mode {mode ? <span>REVEAL</span> : <span>MARK</span>}</div>
        </div>
        <div className="right">
          <button onClick={clickNewGame}>Newgame</button>
        </div>
      </div>
    </div>
  );
}

export default Board;
