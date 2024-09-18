// TODO: Eventually add other algorithms for the computer aspect of this game
export default class Algorithms {
  constructor(mineValue) {
    this.mineValue = mineValue; // value used to indicate a mine
  }

  bfsExpandCell(board, row, col) {
    // Case 1: If a user clicks a mine, send them to the death realm (game over) :)
    if (board[row][col].value == this.mineValue) return false;

    // Case 2: If a user clicks a number greater than 0, reveal that number, and return
    // Case 3: If a user clicks a 0/empty space, expand out in all directions until you hit a number
    const directions = [
      // [Row, Col] or [Y-Coordinate, X-Coordinate]
      [0, -1], // Left
      [0, 1], // Right
      [-1, 0], // Up
      [1, 0], // Down
      [-1, -1], // Up Left
      [-1, 1], // Up Right
      [1, -1], // Down Left
      [1, 1], // Down Right
    ];

    const rows = board.length;
    const cols = board[0].length;
    const queue = [[row, col]];

    while (queue.length) {
      const [r, c] = queue.shift();
      board[r][c].isOpen = true;

      if (board[r][c].value > 0) continue;

      for (const direction of directions) {
        const newRow = direction[0] + r;
        const newCol = direction[1] + c;

        if (newRow < 0 || newCol < 0 || newRow >= rows || newCol >= cols)
          continue;

        if (!board[newRow][newCol].isOpen && !board[newRow][newCol].isFlag) {
          queue.push([newRow, newCol]);
        }
      }
    }

    return true;
  }
}
