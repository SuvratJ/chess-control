import React, { useState } from 'react';

function Cell(props) {
    var className;
    if(props.value & (1 << 5))
        className = "cell-active";
    else
        className = "cell-default"
    return (
        <button className={className}
        onMouseEnter ={() => props.onMouseEnter()}
        onMouseOutCapture = {() => props.onMouseLeave()}>
            { props.value & 15}
        </button>);
}

export default Cell;