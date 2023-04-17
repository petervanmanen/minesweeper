import React from 'react';
import Game from './Game';
import GameCoord from './GameCoord';

function Tile(props: {
  tile: GameCoord,
  game: Game
}) {
  let game = props.game;

  const leftClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    game.select(props.tile.x, props.tile.y);
    game.update();
  }

  const rightClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    game.mark(props.tile.x, props.tile.y);
    game.update();
  }

  return (
    <div className={`tile ${props.tile.revealed?"revealed t"+props.tile.neighbombs:""}`} onClick={leftClickHandler} onContextMenu={rightClickHandler} >
      {(props.tile.revealed && props.tile.bomb) || (game.state === 'lost' && props.tile.bomb)? <span>&#128163;</span> : null}
      {props.tile.revealed && !props.tile.bomb && props.tile.neighbombs.valueOf() > 0 ? <span>{props.tile.neighbombs.valueOf()}</span> : null}
      {!props.tile.revealed ? <span></span> : null}
      {props.tile.marked ? <span>&#128681;</span> : null}
    </div>
  );
}

export default Tile;
