import React from 'react';
import './App.css';
import Board from './Board';
import Game from './Game';



function App() {
  let game: Game = new Game(6, 6, 4);

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

