import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, values, onPlay }) {
  function handleClick(idx) {
    const nextValues = values.slice();
    if (values[idx] || calculateWinner(values)) {
      if (calculateWinner(values)) {
        console.log("Winner: " + calculateWinner(values));
      }
      return;
    }
    if (xIsNext) {
      nextValues[idx] = "X";
    } else {
      nextValues[idx] = "O";
    }
    onPlay(nextValues);
  }
  const winner = calculateWinner(values);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={values[0]} onSquareClick={() => handleClick(0)} />
        <Square value={values[1]} onSquareClick={() => handleClick(1)} />
        <Square value={values[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={values[3]} onSquareClick={() => handleClick(3)} />
        <Square value={values[4]} onSquareClick={() => handleClick(4)} />
        <Square value={values[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={values[6]} onSquareClick={() => handleClick(6)} />
        <Square value={values[7]} onSquareClick={() => handleClick(7)} />
        <Square value={values[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentValues = history[currentMove];

  function handlePlay(nextValues) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextValues];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((values, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} values={currentValues} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  //all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // check if the three winning squares have the same user
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
