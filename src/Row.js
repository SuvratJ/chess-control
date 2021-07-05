import React, { useState } from 'react';
import Cell from './Cell';

function Row(props) {
    return (
    <div className="chess-row">
        {props.position.map((cellValue, cell) => <Cell value={cellValue}/>)}
    </div>
    );
}

export default Row;