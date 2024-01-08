import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import confetti from "canvas-confetti"
import { Square } from "./components/Square";
import { TURNS } from "./components/constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) :
      Array(9).fill(null);
})


  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X;
  })

  const [winner, setWinner] = useState(null);


  useEffect(() => {}, []);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  };

 


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

    //save game
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    //check if winner
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>TicTacToe</h1>
      <button onClick={resetGame}>Reset</button>
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
