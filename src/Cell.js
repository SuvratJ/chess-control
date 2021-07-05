import React, { useState } from 'react';

function Cell(props) {
    return (<button className="cell-default">{props.value}</button>);
}

export default Cell;