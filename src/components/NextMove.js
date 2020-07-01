import React from 'react';

function NextMove(props) {
        const {xIsNext,isOnePlayer} = props.data
        let status = isOnePlayer ? 
            "" : 
            ((xIsNext ? "X" : "O") + " move");
        
        return (<div className="move">{status}</div>)
}

export default NextMove