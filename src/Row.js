import React, { useState } from 'react';
import Cell from './Cell';

function Row(props) {
    
    return (
    <div className="chess-row">
        { props.position.map((cellValue, cell) => 
            <Cell value={cellValue} 
            className="cell-default" 
            onMouseEnter={() => props.onMouseEnter(cell)}
            onMouseLeave={() => props.onMouseLeave(cell)}
            />)
        }
    </div>
    );
}

export default Row;