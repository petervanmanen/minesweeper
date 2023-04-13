import React, { useContext } from 'react';
import Tile from './Tile';
import { Game } from './Game';



function Board(props: {
  game: Game
}
) {
  return (

    <div className="Board" style={{ width: props.game.width * (25 + 2) + "px" }}>
      {props.game.tiles.map((gameCoord: any) => {
        return (<Tile key={gameCoord.x + "-" + gameCoord.y} tile={gameCoord} game={props.game} />);
      })
      }
    </div>
  );
}

export default Board;
