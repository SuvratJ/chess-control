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
  if(boardState[0][0] == null) {
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
    for(let cells of getAttackedSquares(piece, i, j)) {
      position[cells[0]][cells[1]] = position[cells[0]][cells[1]] | (1<<6);
    }
  }
  function deactivatePiece(i, j, position) {
    position[i][j] = position[i][j] & (~(1 << 5));
    var piece = position[i][j] & 15;
    for(let cells of getAttackedSquares(piece, i, j)) {
      position[cells[0]][cells[1]] = position[cells[0]][cells[1]] & (~(1<<6));
    }
  }
  function isPawn(piece) {
    if(piece == 1 || piece-6 == 1)
      return true;
    return false;
  }
  function isRook(piece) {
    if(piece == 4 || piece-6 == 4)
      return true;
    return false;
  }
  function isKnight(piece) {
    if(piece == 2 || piece-6 == 2)
      return true;
    return false;
  }
  function isBishop(piece) {
    if(piece == 3 || piece-6 == 3)
      return true;
    return false;
  }
  function isQueen(piece) {
    if(piece == 5 || piece-6 == 5)
      return true;
    return false;
  }
  function isKing(piece) {
    if(piece == 6 || piece-6 == 6)
      return true;
    return false;
  }
  function isBlack(piece) {
    return (piece >= 7 && piece <=12);
  }
  function isWhite(piece) {
    return !isBlack(piece);
  }
  function getAttackedSquares(piece, i, j) {
    var attackedSquares = [];
    if(isPawn(piece)) {
      if(isWhite(piece)) {
        if(i == 6) {
          attackedSquares.push([i-1, j]);
          attackedSquares.push([i-2, j]);
        } else {
          attackedSquares.push([i-1, j]);
        }
      } else {
        if(i == 1) {
          attackedSquares.push([i+1, j]);
          attackedSquares.push([i+2, j]);
        } else {
          attackedSquares.push([i+1, j]);
        }
      }
    } else if(isRook(piece)) {
      for(var ctr = 0; ctr < 8; ctr += 1) {
        attackedSquares.push([(i+ctr)%8, j]);
        attackedSquares.push([i, (j+ctr)%8]);
      }
    } else if(isBishop(piece)) {
      for(var ctr = 0; ctr < 8; ctr += 1) {
        if (isValidCell(i+ctr, j+ctr))
          attackedSquares.push([(i+ctr), (j+ctr)]);
        if (isValidCell(i+ctr, j-ctr))
          attackedSquares.push([(i+ctr), (j-ctr)]);
        if (isValidCell(i-ctr, j-ctr))
          attackedSquares.push([(i-ctr), (j-ctr)]);
        if (isValidCell(i-ctr, j+ctr))
          attackedSquares.push([(i-ctr), (j+ctr)]);
      }
    } else if(isQueen(piece)) {
      for(var ctr = 0; ctr < 8; ctr += 1) {
        attackedSquares.push([(i+ctr)%8, j]);
        attackedSquares.push([i, (j+ctr)%8]);
        if (isValidCell(i+ctr, j+ctr))
          attackedSquares.push([(i+ctr), (j+ctr)]);
        if (isValidCell(i+ctr, j-ctr))
          attackedSquares.push([(i+ctr), (j-ctr)]);
        if (isValidCell(i-ctr, j-ctr))
          attackedSquares.push([(i-ctr), (j-ctr)]);
        if (isValidCell(i-ctr, j+ctr))
          attackedSquares.push([(i-ctr), (j+ctr)]);
      }
    } else if(isKing(piece)) {
      if (isValidCell(i+1, j-1))
        attackedSquares.push([(i+1), (j-1)]);
      if (isValidCell(i+1, j))
        attackedSquares.push([(i+1), (j)]);
      if (isValidCell(i+1, j))
        attackedSquares.push([(i+1), (j+1)]);
      if (isValidCell(i, j-1))
        attackedSquares.push([(i), (j-1)]);
      if (isValidCell(i, j+1))
        attackedSquares.push([(i), (j+1)]);
      if (isValidCell(i-1, j-1))
        attackedSquares.push([(i-1), (j-1)]);
      if (isValidCell(i-1, j))
        attackedSquares.push([(i-1), (j)]);
      if (isValidCell(i-1, j+1))
        attackedSquares.push([(i-1), (j+1)]);
    } else if(isKnight(piece)) {
      if (isValidCell(i+2, j+1))
        attackedSquares.push([(i+2), (j+1)]);
      if (isValidCell(i+2, j-1))
        attackedSquares.push([(i+2), (j-1)]);
      if (isValidCell(i-2, j+1))
        attackedSquares.push([(i-2), (j+1)]);
      if (isValidCell(i-2, j-1))
        attackedSquares.push([(i-2), (j-1)]);
      if (isValidCell(i+1, j+2))
        attackedSquares.push([(i+1), (j+2)]);
      if (isValidCell(i-1, j+2))
        attackedSquares.push([(i-1), (j+2)]);
      if (isValidCell(i+1, j-2))
        attackedSquares.push([(i+1), (j-2)]);
      if (isValidCell(i-1, j-2))
        attackedSquares.push([(i-1), (j-2)]);
    }
    return attackedSquares;
  }
  function isValidCell(i, j) {
    return (i>=0 && i<8 && j>=0 && j<8);
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
    if((newState[i][j] & 15) > 0) {
      deactivatePiece(i, j, newState);
    }
    setBoardState(newState);
  }
  function handleMouseUp(i, j) {
    
  }
  function handleMouseDown(i, j) {
    document.getElementsByClassName('screen-left').item(0).innerHTML += ('\nMouseDown' + i + j);
  }
  return (
    <div className="App">
      <span className="screen-left">
      </span>
      <span className="screen-right">
        <Board position = {boardState}
          onMouseEnter = { (i, j) => handleMouseEnter(i, j) }
          onMouseLeave = { (i, j) => handleMouseLeave(i, j) }
          onMouseDown = { (i, j) => handleMouseDown(i, j) }
          onMouseUp = { (i, j) => handleMouseUp(i, j) }
        />
      </span>
    </div>
  );
}

export default App;