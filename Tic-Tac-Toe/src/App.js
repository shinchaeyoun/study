import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row">
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // for 반복문
  function generateWinningLines() {
    const lines = [];

    // 가로줄 (rows)
    for (let row = 0; row < 3; row++) {
      const start = row * 3;
      lines.push([start, start + 1, start + 2]);
    }

    // 세로줄 (columns)
    for (let col = 0; col < 3; col++) {
      lines.push([col, col + 3, col + 6]);
    }

    // 대각선 (diagonals)
    lines.push([0, 4, 8]);
    lines.push([2, 4, 6]);

    return lines;
  }

  // map 반복문
  // function generateWinningLines() {
  //   // 가로줄 (rows)
  //   const rows = [0, 1, 2].map(row => {
  //     const start = row * 3;
  //     return [start, start + 1, start + 2];
  //   });

  //   // 세로줄 (columns)
  //   const cols = [0, 1, 2].map(col => {
  //     return [col, col + 3, col + 6];
  //   });

  //   // 대각선 (diagonals)
  //   const diagonals = [
  //     [0, 4, 8],
  //     [2, 4, 6]
  //   ];

  //   return [...rows, ...cols, ...diagonals];
  // }

  const lines = generateWinningLines();

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[a] &&
      squares[b] === squares[a] &&
      squares[c]
    ) {
      return squares[a];
    }
  }

  return null;
}
