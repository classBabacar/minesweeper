// TODO: Eventually add other algorithms for the computer aspect of this game
export default class Algorithms {
  constructor(mineValue) {
    this.mineValue = mineValue; // value used to indicate a mine
  }

  // Case 2: If a user clicks a number, reveal that number
  // Case 3: If a user clicks a 0/empty space, expand out in all directions until you hit a number (most likely using bfs algorithm)
  // One thing I wonder is, if a user sets a cell to a flag, and they click a zero cell do I expand till the flag or stil expand the value under the flag

  bfsExpandCell(board, row, col) {
    // Case 1: If a user clicks a mine, send them to the death realm (game over) :)
    if (board[row][col].value == this.mineValue) return false;

    console.log("No mine hit.");
    return true;
  }
}
