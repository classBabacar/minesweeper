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
        //TODO: Fill with game logic
        document.getElementById("grid").rows[row].cells[col].innerHTML =
          "<img src=https://upload.wikimedia.org/wikipedia/en/7/73/Trollface.png width = 60px>";
        break;

      case "rightclick":
        this.setGridPositionToFlag(row, col);
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

  setGridPositionToFlag(row, col) {
    this.minesweeper.toFlag(row, col);
    let isFlag = this.minesweeper.isFlag(row, col);

    // console.log(`flag[${row}][${col}] is set to: ${isFlag}`); // Comment to see flag statuses
    document.getElementById("grid").rows[row].cells[col].innerHTML = isFlag
      ? "<img src=https://www.shutterstock.com/image-vector/flag-icon-color-cartoon-sketch-600nw-1789996868.jpg width = 60px>"
      : "";
  }
}
