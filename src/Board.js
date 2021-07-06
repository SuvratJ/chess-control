import React, { useState } from 'react';
import Row from './Row';

function Board(props) {
    return (
        <span className="chess-board">
            { props.position.map((rowPosition, row) => 
                <Row position = { rowPosition } 
                    rowNum = { row }
                    onMouseEnter = { (cell) => props.onMouseEnter(row, cell) }
                    onMouseLeave = { (cell) => props.onMouseLeave(row, cell) }
                    onMouseDown = { (cell) => props.onMouseDown(row, cell) }
                    onMouseUp = { (cell) => props.onMouseUp(row, cell) }
                />)
            }
        </span>
    );
    
}

export default Board;