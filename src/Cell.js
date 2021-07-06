import React, { useState } from 'react';

function Cell(props) {
    var className;
    if((props.value & (1 << 7)) > 0)
        className = "cell selected";
    else if((props.value & (1 << 5)) > 0)
        className = "cell active";
    else if((props.value & (1 << 8)) > 0)
        className = "cell is-attacked";
    else if((props.value & (1 << 6)) > 0)
        className = "cell can-be-attacked";
    else
        className = "cell"
    return (
        <button className = { className }
        onMouseEnter = { () => props.onMouseEnter() }
        onMouseOutCapture = { () => props.onMouseLeave() }
        onMouseDownCapture = { () => props.onMouseDown() }
        onMouseUpCapture = { () => props.onMouseUp() }
        >
            { props.value & 15 }
        </button>);
}

export default Cell;