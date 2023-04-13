import React, { useState } from 'react';
import './App.css';
import Board from './Board';
import { Game } from './Game';



function App() {
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [game, setGame] = useState(new Game(25, 25, 50));
  
  //let game = new Game(25, 25, 50);
  game.setGameCallBack((game: Game) => {
    setGame(game);
    forceUpdate();
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  return (
    <div className="App">
      <Board game={game} />
    </div>
  );
}
export default App;

