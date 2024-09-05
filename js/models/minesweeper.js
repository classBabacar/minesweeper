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

  toString() {
    let boardString = "";
    for (let row = 0; row < this.rows; ++row) {
      for (let col = 0; col < this.cols; ++col) {
        boardString += this.board[row][col].value + " ";
      }
      boardString += "\n";
    }
    return boardString;
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
        this.board[randomRow][randomCol].value = this.mineValue;
      }
    }
  }

  generateCoordInBound(N) {
    // Generate a random number from 0 - N (where N is not inclusive)
    return Math.floor(Math.random() * N);
  }

  generateFieldCount() {
    for (let row = 0; row < this.rows; ++row) {
      for (let col = 0; col < this.cols; ++col) {
        if (this.board[row][col].value == this.mineValue)
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
        this.board[newRow][newCol].value == this.mineValue
      ) {
        continue;
      }

      this.board[newRow][newCol].incrementCellValue();
    }
  }

  getCellValue(row, col) {
    return this.board[row][col].value;
  }

  isCellFlag(row, col) {
    return this.board[row][col].isFlag;
  }

  setCelltoFlag(row, col) {
    return (this.board[row][col].isFlag = NaN);
  }

  expandField(row, col) {
    // Case 1: If a user clicks a number, reveal that number
    // Case 2: If a user clicks a 0/empty space, expand out in all directions until you hit a number
    // Case 3: If a user clicks a mine, game over :)
  }
}
