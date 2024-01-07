import { WINNER_COMBOS } from "../components/constants";


export const checkWinnerFrom = (boardToCheck) => {
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
  //if no winner
  return null;
}

export const checkEndGame = (newBoard) => {
  // If any square is empty, the game continues
  if (newBoard.some((square) => square === null)) {
    return false;
  }
  // All squares are filled and no winner, it's a draw
  return true;
};