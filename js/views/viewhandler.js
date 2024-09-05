import Minesweeper from "../models/minesweeper.js";

export default class ViewHandler {
  constructor(rows, cols, minesToPlace) {
    this.rows = rows;
    this.cols = cols;
    this.minesToPlace = minesToPlace;
    this.minesweeper = new Minesweeper(rows, cols, minesToPlace);
    // console.log("minesweeper board \n", this.minesweeper.toString());
  }

  displayBoard() {
    let obj = this;
    let grid = this.clickableGrid(function (row, col, action) {
      obj.handleAction(row, col, action);
    });
    document.body.appendChild(grid);
  }

  handleAction(row, col, action) {
    switch (action) {
      case "leftclick":
        this.expandCell(row, col);
        break;

      case "rightclick":
        this.setCellToFlag(row, col);
        break;
    }
  }

  clickableGrid(callback) {
    let grid = document.createElement("table");
    grid.id = "grid";
    for (let r = 0; r < this.rows; ++r) {
      let tr = grid.appendChild(document.createElement("tr"));
      for (let c = 0; c < this.cols; ++c) {
        let cell = tr.appendChild(document.createElement("td"));
        // cell.innerHTML = this.minesweeper.getCellValue(r, c); // Comment to help visual board
        cell.addEventListener(
          "click",
          function () {
            return callback(r, c, "leftclick");
          },
          false
        );

        cell.addEventListener(
          "contextmenu",
          function (evt) {
            evt.preventDefault();
            return callback(r, c, "rightclick");
          },
          false
        );
      }
    }
    return grid;
  }

  expandCell(row, col) {
    if (this.minesweeper.isCellFlag(row, col)) return;

    this.minesweeper.setCellToOpen(row, col);
    document.getElementById("grid").rows[row].cells[col].innerHTML =
      this.minesweeper.getCellValue(row, col);
  }

  setCellToFlag(row, col) {
    if (this.minesweeper.isCellOpen(row, col)) return;

    this.minesweeper.setCelltoFlag(row, col);
    let isFlag = this.minesweeper.isCellFlag(row, col);

    document.getElementById("grid").rows[row].cells[col].innerHTML = isFlag
      ? "<img src=https://www.shutterstock.com/image-vector/flag-icon-color-cartoon-sketch-600nw-1789996868.jpg width = 60px>"
      : "";
  }
}
