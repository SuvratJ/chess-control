import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [boardState, setBoardState] = useState (Array(8).fill(Array(8)));
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
  if(boardState[0][0] == null){
    var startingPosition = [
      [10, 8, 9, 11, 12, 9, 8, 10],
      [7,  7, 7, 7,   7, 7, 7,  7],
      [0,  0, 0, 0,   0, 0, 0,  0],
      [0,  0, 0, 0,   0, 0, 0,  0],
      [0,  0, 0, 0,   0, 0, 0,  0],
      [0,  0, 0, 0,   0, 0, 0,  0],
      [1,  1, 1, 1,   1, 1, 1,  1],
      [4,  2, 3, 5,   6, 3, 2,  4]
    ];
    setBoardState(startingPosition);
  }
  function activatePiece(i, j, position){
    position[i][j] = position[i][j] | (1 << 5);
    var piece = position[i][j] & 15;
    if(isPawn(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'pawn';
    } else if(isRook(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'rook';
    } else if(isKnight(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'knight';
    } else if(isBishop(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'bishop';
    } else if(isQueen(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'queen';
    } else if(isKing(piece)) {
      document.getElementsByClassName('screen-left').item(0).innerHTML = 'king';
    }
  }
  function isPawn(piece) {
    if(piece == 1 || piece-6 == 1)
      return true;
    return false
  }
  function isRook(piece) {
    if(piece == 4 || piece-6 == 4)
      return true;
    return false
  }
  function isKnight(piece) {
    if(piece == 2 || piece-6 == 2)
      return true;
    return false
  }
  function isBishop(piece) {
    if(piece == 3 || piece-6 == 3)
      return true;
    return false
  }
  function isQueen(piece) {
    if(piece == 5 || piece-6 == 5)
      return true;
    return false
  }
  function isKing(piece) {
    if(piece == 6 || piece-6 == 6)
      return true;
    return false
  }
  function handleMouseEnter(i, j) {
    var newState = boardState.map(function(arr) {
      return arr.slice();
    });
    if((newState[i][j] & 15) > 0) {
      activatePiece(i, j, newState);
    }
    setBoardState(newState);
  }
  function handleMouseLeave(i, j) {
    var newState = boardState.map(function(arr) {
      return arr.slice();
    });
    newState[i][j] = newState[i][j] & (~(1 << 5));
    setBoardState(newState);
  }
  return (
    <div className="App">
      <span className="screen-left">
      </span>
      <span className="screen-right">
        <Board position = {boardState}
          onMouseEnter={(i, j) => handleMouseEnter(i, j)}
          onMouseLeave={(i, j) => handleMouseLeave(i, j)}
        />
      </span>
    </div>
  );
}

export default App;