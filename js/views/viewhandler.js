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
    for (let row = 0; row < this.rows; ++row) {
      let tr = grid.appendChild(document.createElement("tr"));
      for (let col = 0; col < this.cols; ++col) {
        let cell = tr.appendChild(document.createElement("td"));
        cell.addEventListener(
          "click",
          function () {
            return callback(row, col, "leftclick");
          },
          false
        );

        cell.addEventListener(
          "contextmenu",
          function (evt) {
            evt.preventDefault();
            return callback(row, col, "rightclick");
          },
          false
        );
      }
    }
    return grid;
  }

  expandCell(row, col) {
    if (this.minesweeper.isCellFlag(row, col)) return;

    // TODO: End the game, but how? maybe call minesweeper object and reset the game, then also update frontend?
    let gameStatus = this.minesweeper.expandCell(row, col);
    if (!gameStatus) console.log("Game Over -- TEST");

    // TODO: after expanding in the model is complete reveal all of the values to the user (that are opened), logic below needs to be in a loop, to express the expand
    this.minesweeper.setCellToOpen(row, col);
    document.getElementById("grid").rows[row].cells[col].innerHTML =
      this.minesweeper.getCellValue(row, col);

    // TODO: Indicate to user they clicked an empty cell, possibly change the color of the tile
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
