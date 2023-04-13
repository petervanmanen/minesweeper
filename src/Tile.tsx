import React from 'react';
import { GameCoord, Game } from './Game';





function Tile(props: {
  tile: GameCoord,
  game: Game
}) {
  let game = props.game;


  const leftClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    game.click(props.tile.x, props.tile.y);
  }

  const rightClickHandler = (event: React.MouseEvent<HTMLElement>) => {
    console.log(props.tile)
    props.tile.marked = !props.tile.marked;
    game.update();
  }

  return (
    <div className={`tile ${props.tile.revealed&&props.tile.neighbombs===0?"zero":""}`} onClick={leftClickHandler} onContextMenu={rightClickHandler} >
      {props.tile.revealed && props.tile.bomb ? <span>&#128163;</span> : null}
      {props.tile.revealed && !props.tile.bomb ? <span>{props.tile.neighbombs.valueOf()}</span> : null}
      {!props.tile.revealed ? <span></span> : null}
      {props.tile.marked ? <span>&#128681;</span> : null}
    </div>
  );
}

export default Tile;
