import React from 'react';

function NextMove(props) {
        const {xIsNext,isOnePlayer} = props.data
        const xo = xIsNext ? "move x-move" : "move o-move"
        let status = isOnePlayer ? 
            "" : 
            ((xIsNext ? "X" : "O") + " move");
        
        return (<div className={xo}>{status}</div>)
}

export default NextMove