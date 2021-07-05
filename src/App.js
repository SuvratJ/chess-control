import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  // const [boardState, setBoardState] = useState (Array(8).fill(Array(8)));
  /*
    (7, 0) -> a1
    (0, 7) -> h8
    
           White   Black
    empty    0       0
    pawn     1       7
    knight   2       8
    bishop   3       9
    rook     4       10
    queen    5       11
    king     6       12
  */
  var startingPosition = [
    [10, 8, 9, 11, 12, 9, 8, 10],
    [7, 7, 7, 7, 7, 7, 7, 7],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [4, 2, 3, 5, 6, 3, 2, 4]
  ];
  // setBoardState(startingPosition);
  return (
    <div className="App">
      <Board position = {startingPosition}/>
    </div>
  );
}

export default App;