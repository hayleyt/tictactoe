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
        squares: [],
        stepNumber: 0,
        xIsNext: true,
        isOnePlayer: true
      };

  handleClick = (i) => {
    const {xIsNext,isOnePlayer,stepNumber} = this.state;
    const history = this.state.history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    if(isOnePlayer){
      squares[i] = "X";

      this.setState({
        history: history.concat([{squares: squares}]),
        stepNumber: history.length,
        xIsNext: false
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

  handleChange = () => {
    const {xIsNext,isOnePlayer,stepNumber} = this.state;
    if( (isOnePlayer === false) || stepNumber === 9 || xIsNext) {
      return;
    }
    setTimeout(() => {
      this.computerPlaysTurn()
    }, 400)

  }

  computerPlaysTurn = () => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(current)
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

  handleTimeTravel = () => {
    const {stepNumber,isOnePlayer} = this.state;
    const backOne = (stepNumber-1) > 0 ? (stepNumber-1) : 0;
    const backTwo = (stepNumber-2) > 1 ? (stepNumber-2) : 0;

    if(isOnePlayer){
      if(stepNumber === 9){
        this.jumpTo(backOne) 
      } else{
        this.jumpTo(backTwo)
      }
    } 
    else {
      this.jumpTo(backOne) 
    }
  }

  jumpTo = (step) => {
    let history = this.state.history.splice().pop()
    console.log(history)
    
    if (this.state.isOnePlayer){
      this.setState({
        stepNumber: step,
        xIsNext: true
      });
    }
    else{
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

  }

  handlePlayers = (e) => {
    const isNewGame = this.state.history.length === 1
    if(isNewGame && e.target.name === "one-player"){
      this.setState({isOnePlayer: true})
    } 
    else if(isNewGame && e.target.name === "two-player") {
      this.setState({isOnePlayer: false});
    }
    else if(!isNewGame && e.target.name === "two-player")
    {
      this.newGame()
      this.setState({isOnePlayer: false});
    }
    else{
      this.newGame()
      this.setState({isOnePlayer: true});
    }
  }

  render() {
    const {history,stepNumber} = this.state
    return (
      <div className="game">

        <div className="header">
          <h1>Play Tic Tac Toe</h1>
          <div className="status">
            <Status data={this.state} /> 
          </div>
          <div className="player-buttons">
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
        </div>

        <div className="game-board">
          <Board
            squares={history[stepNumber].squares}
            onClick={i => this.handleClick(i)}
            onChange={this.handleChange()}
          />
        </div>

        <div className="time-travel-buttons">
          <button name="back" onClick={this.handleTimeTravel}>Step Back</button>
        </div>

        <div className="new-game-button">
          <button onClick={this.newGame}>Start New Game</button>
        </div>

      </div>
    );
  }
}

export default Game;