import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import Game from './Game';


function Board(props: {
  game: Game
}
) {
  const [game, setGame] = useState(props.game);
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [, updateState] = React.useState<any>();
  game.setBoardCallBack((game: Game) => {
    setGame(game);
    forceUpdate();
    console.log(game.bombarr);
  });

  const [flagsleft, setFlagsLeft] = useState(props.game.bombarr.length);
  game.setFlagsLeftCallback(setFlagsLeft);

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
        </div>
      </div>

      {game.tiles.map((gameCoord: any) => {
        return (<Tile key={gameCoord.x + "-" + gameCoord.y} tile={gameCoord} game={game} />);
      })
      }
    </div>
  );
}

export default Board;
