import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import Status from './Status'

class Game extends React.Component {
  state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true,
        isOnePlayer: true
      };

  handleClick = (i) => {
    const {xIsNext, isOnePlayer} = this.state;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if(isOnePlayer){
      squares[i] = "X";
      let randNum = Math.floor(Math.random() * 9);
      if(squares.includes(null)){
        while (squares[randNum] != null){
          randNum = Math.floor(Math.random() * 9);
        }
      }
      if(!calculateWinner(squares)){
        squares[randNum] = "O"
      }
      this.setState({
        history: history.concat([{squares: squares}]),
        stepNumber: history.length,
        xIsNext: true
      });
    }
    else {
      squares[i] = xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{squares: squares}]),
        stepNumber: history.length,
        xIsNext: !xIsNext
      });
    }
  }

  newGame = () => {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isOnePlayer: true
    })
  }

  handleTimeTravel = (e) => {
    const stepMinusOne = this.state.stepNumber - 1;
    const stepPlusOne = this.state.stepNumber + 1;
    const maxStep = this.state.history.length - 1;
    const lastStep = stepMinusOne >= 0 ? stepMinusOne : 0;
    const nextStep = stepPlusOne <= maxStep ? stepPlusOne : maxStep;
    e.target.name === "back" ? this.jumpTo(lastStep) : this.jumpTo(nextStep)
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: this.state.isOnePlayer ? true : (step % 2) === 0
    });

  }

  handlePlayers = (e) => {
    if(this.state.history.length === 1){
      e.target.name === "one-player" ?
      this.setState({isOnePlayer: true}) :
      this.setState({isOnePlayer: false});
    }
  }

  render() {
    const {history,stepNumber} = this.state
    return (
      <div className="game">
        <Status data={this.state} />
        <div>
            <button 
                name="one-player" 
                onClick={this.handlePlayers}
                className={this.state.isOnePlayer ? "selected" : ""}>
            1 Player
            </button>
            <button 
                name="two-player" 
                onClick={this.handlePlayers}
                className={this.state.isOnePlayer ? "" : "selected"}>
            2 Players
            </button>
        </div>
        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div>
          <button name="back" onClick={this.handleTimeTravel}>Go Back</button>
          <button name="forward" onClick={this.handleTimeTravel}>Go Forward</button>
        </div>
        <div>
          <button onClick={this.newGame}>New Game</button>
        </div>
      </div>
    );
  }
}

export default Game;