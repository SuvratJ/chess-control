import React, { useState } from 'react';
import Row from './Row';

function Board(props) {
    return (
        <div className="chess-board">
            {props.position.map((rowPosition, row) => <Row position={rowPosition}/>)}
        </div>
    );
    
}

export default Board;