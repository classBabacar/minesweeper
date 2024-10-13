// TODO: Eventually add other algorithms for the computer aspect of this game
export default class Algorithms {
  constructor(mineValue, rows, cols) {
    this.mineValue = mineValue; // value used to indicate a mine
    this.rows = rows;
    this.cols = cols;
    this.visited = this.setupVisitedBoard();
  }

  setupVisitedBoard() {
    const visited = [];
    for (let row = 0; row < this.rows; ++row) {
      visited[row] = [];
      for (let col = 0; col < this.cols; ++col) visited[row][col] = false;
    }
    return visited;
  }

  bfsExpandCell(board, row, col) {
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

    const queue = [[row, col]];

    while (queue.length) {
      const [r, c] = queue.shift();
      board[r][c].isOpen = true;
      this.visited[r][c] = true;

      // Case 1: If a user clicks a mine or a number greater than 0, set that cell to open
      if (board[r][c].value > 0 || board[r][c] == this.mineValue) continue;

      // Case 2: If a user clicks a 0/empty space, expand out in all directions until you hit a number
      for (const direction of directions) {
        const newRow = direction[0] + r;
        const newCol = direction[1] + c;

        if (
          newRow < 0 ||
          newCol < 0 ||
          newRow >= this.rows ||
          newCol >= this.cols
        )
          continue;

        if (
          !this.visited[newRow][newCol] &&
          !board[newRow][newCol].isOpen &&
          !board[newRow][newCol].isFlag &&
          board[newRow][newCol].value != this.mineValue
        ) {
          this.visited[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  }
}
