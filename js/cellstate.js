class CellState {
  constructor() {
    this.value = 0;
    this.state = "unopened";
  }

  setCellToMine() {
    this.value = -999;
    this.state = "unopened";
  }

  setCellToFlag() {
    this.state = "flagged";
  }

  getCellValue() {
    return this.value;
  }

  getCellState() {
    return this.state;
  }

  incrementCellValue() {
    this.value += 1;
  }
}

module.exports = CellState;
