import React from 'react';
import calculateWinner from './calculateWinner';

function Winner(props) {
   const {history,stepNumber,isOnePlayer} = props.data
   const current = history[stepNumber];
   const winner = calculateWinner(current.squares);

   let winnerIs = "";
   if (winner) {
      winnerIs = isOnePlayer ? 
         winner === "O" ? "Computer Wins!" : "You Win!"
         : 
         winner + " Wins!";
   } 
   else if (stepNumber === 9 && winner === null){
      winnerIs = "Draw!"
   }
   
   return (<div className="winner"><h1>{winnerIs}</h1></div>)
}

export default Winner