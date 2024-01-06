import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const TURNS = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  //choose the class for the turn to be played
  const className = `square ${isSelected ? "is-selected" : ""}`;

  //handle the function to upload the board
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X);

  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

  useEffect(() => { }, []);
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  

  const updateBoard = (index) => {
    //if something in this index, dont run the function
    if (board[index]) return;
    //create a copy of board to maniupulate
    const newBoard = [...board];
    //in the index store the value of turn x / o
    newBoard[index] = turn;
    //then set the board with the new manipulated board
    setBoard(newBoard);
    //if turn is x change to o or viceversa
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    //change the turn state
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>


      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {winner === false ? 'Draw' :
                  'Won'
               }
              </h2>
              <header>
                {winner && <Square>{winner}</Square>}
              </header>


              <footer>
                <button onClick={resetGame}>Start again</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
