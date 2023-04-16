import React from 'react';
import './App.css';
import Board from './Board';

function App() {

  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  return (
    <div className="App">
      <Board/>
    </div>
  );
}
export default App;

