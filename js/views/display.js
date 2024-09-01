import Minesweeper from "../models/minesweeper.js";

export default class DisplayView {
  constructor(rows, cols, minesToPlace) {
    this.rows = rows;
    this.cols = cols;
    this.minesToPlace = minesToPlace;
    this.minesweeper = new Minesweeper(rows, cols, minesToPlace);
    // console.log("minesweeper board \n", this.minesweeper.toString());
  }

  displayBoard() {
    let grid = this.clickableGrid(function (el, row, col, action) {
      // This will be used to call the minesweeper model
      console.log("You clicked on element:", el);
      console.log("You clicked on row:", row);
      console.log("You clicked on col:", col);
      console.log("You did this action:", action);
      this.minesweeper.expandField(row, col);
      el.className = "clicked";
    });
    document.body.appendChild(grid);
  }

  clickableGrid(callback) {
    let grid = document.createElement("table");
    grid.className = "grid";
    for (let r = 0; r < this.rows; ++r) {
      let tr = grid.appendChild(document.createElement("tr"));
      for (let c = 0; c < this.cols; ++c) {
        let cell = tr.appendChild(document.createElement("td"));
        cell.innerHTML = this.minesweeper.getCellValue(r, c);
        cell.addEventListener(
          "click",
          (function (el, r, c, action) {
            return function () {
              callback(el, r, c, action);
            };
          })(cell, r, c, "rightclick"),
          false
        );
      }
    }
    return grid;
  }
}
