var CellState = require("./cellstate.js");

class Minesweeper {
  constructor(rows, cols, minesToPlace) {
    this.board = this.setupBoard(rows, cols);
    this.rowMax = rows;
    this.colMax = cols;
    this.mineValue = -999; // value used to indicate a mine

    this.placeMines(minesToPlace);
    this.generateFieldCount();

    for (let row = 0; row < this.board.length; ++row) {
      for (let col = 0; col < this.board[row].length; ++col) {
        process.stdout.write(this.board[row][col].value + " ");
        // process.stdout.write(this.board[row][col].state + " ");
      }
      console.log("");
    }
  }

  setupBoard(rows, cols) {
    let board = [];
    for (let row = 0; row < rows; ++row) {
      board[row] = [];
      for (let col = 0; col < cols; ++col) board[row][col] = new CellState();
    }
    return board;
  }

  placeMines(minesToPlace) {
    const minePositions = new Set();

    for (let minesPlaced = 0; minesPlaced < minesToPlace; ++minesPlaced) {
      const length = minePositions.size;
      while (minePositions.size === length) {
        const randomRow = this.generateCoordInBound(this.rowMax);
        const randomCol = this.generateCoordInBound(this.colMax);

        minePositions.add(`${randomRow},${randomCol}`);
        this.board[randomRow][randomCol].setCellToMine();
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
        newRow >= this.rowMax ||
        newCol >= this.colMax ||
        this.board[newRow][newCol].getCellValue() == this.mineValue
      ) {
        continue;
      }

      this.board[newRow][newCol].incrementCellValue();
    }
  }
}

module.exports = Minesweeper;
