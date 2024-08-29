import CellState from "./cellstate.js";

export default class Minesweeper {
  constructor(rows, cols, minesToPlace) {
    this.rows = rows;
    this.cols = cols;
    this.minesToPlace = minesToPlace;
    this.mineValue = -999; // value used to indicate a mine

    this.board = this.setupBoard();
    this.placeMines();
    this.generateFieldCount();
  }

  setupBoard() {
    let board = [];
    for (let row = 0; row < this.rows; ++row) {
      board[row] = [];
      for (let col = 0; col < this.cols; ++col)
        board[row][col] = new CellState();
    }
    return board;
  }

  placeMines() {
    const minePositions = new Set();

    for (let minesPlaced = 0; minesPlaced < this.minesToPlace; ++minesPlaced) {
      const length = minePositions.size;
      while (minePositions.size === length) {
        const randomRow = this.generateCoordInBound(this.rows);
        const randomCol = this.generateCoordInBound(this.cols);

        minePositions.add(`${randomRow},${randomCol}`);
        this.board[randomRow][randomCol].setCellToMine(this.mineValue);
      }
    }
  }

  generateCoordInBound(N) {
    // Generate a random number from 0 - N (where N is not inclusive)
    return Math.floor(Math.random() * N);
  }

  generateFieldCount() {
    for (let row = 0; row < this.board.length; ++row) {
      for (let col = 0; col < this.board[row].length; ++col) {
        if (this.board[row][col].getCellValue() == this.mineValue)
          this.addMineCount(row, col);
      }
    }
  }

  addMineCount(row, col) {
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

    for (const direction of directions) {
      const newRow = direction[0] + row;
      const newCol = direction[1] + col;

      if (
        newRow < 0 ||
        newCol < 0 ||
        newRow >= this.rows ||
        newCol >= this.cols ||
        this.board[newRow][newCol].getCellValue() == this.mineValue
      ) {
        continue;
      }

      this.board[newRow][newCol].incrementCellValue();
    }
  }
}
