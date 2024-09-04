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
    let vh = this;
    let grid = this.clickableGrid(function (el, row, col, action) {
      // This will be used to call the minesweeper model
      console.log("You clicked on element:", el);
      console.log("You clicked on row:", row);
      console.log("You clicked on col:", col);
      console.log("You did this action:", action);
      vh.setDocumentToFlag(row, col);
    });
    document.body.appendChild(grid);
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
          (function (el, r, c, action) {
            return function () {
              callback(el, r, c, "flag");
            };
          })(cell, r, c, "click"),
          false
        );
      }
    }
    return grid;
  }

  setDocumentToFlag(row, col) {
    this.minesweeper.toFlag(row, col);
    let isFlag = this.minesweeper.isFlag(row, col);

    // console.log(`flag[${row}][${col}] is set to: ${isFlag}`); // Comment to see flag statuses
    document.getElementById("grid").rows[row].cells[col].innerHTML = isFlag
      ? "<img src=https://www.shutterstock.com/image-vector/flag-icon-color-cartoon-sketch-600nw-1789996868.jpg width = 60px>"
      : "";
  }
}
