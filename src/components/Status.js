import React from 'react';
import calculateWinner from './calculateWinner';

function Status(props) {
        const {history,stepNumber, xIsNext,isOnePlayer} = props.data
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);

        let status = "";
        if (winner) {
        status = isOnePlayer ? 
            winner === "O" ? "Computer Wins!" : "You Win!"
            : 
            "Winner: " + winner;
        } 
        else if (stepNumber === 9 && winner === null){
        status = "Draw!"
        }
        else {
        status = isOnePlayer ? 
            "Human Vs Computer!" : 
            ("Next player: " + (xIsNext ? "X" : "O"));
        }
        
        return (<div>{status}</div>)
}

export default Status