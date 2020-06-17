import React from 'react';
import calculateWinner from './calculateWinner';

function Status(props) {
        const {history,stepNumber, xIsNext,isOnePlayer} = props.data
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status = "";
        if (winner) {
        status = "Winner: " + winner;
        } 
        else if (stepNumber === 9 && winner === null){
        status = "Draw!"
        }
        else {
        status = isOnePlayer ? "Player: X | Computer: O" : 
            ("Next player: " + (xIsNext ? "X" : "O"));
        }
        
        return (<div>{status}</div>)
}

export default Status