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
          false,
        );

        cell.addEventListener(
          "contextmenu",
          function (evt) {
            evt.preventDefault();
            return callback(row, col, "rightclick");
          },
          false,
        );
      }
    }
    return grid;
  }

  expandCell(row, col) {
    if (
      this.minesweeper.isCellFlag(row, col) ||
      this.minesweeper.isCellOpen(row, col)
    )
      return;

    this.minesweeper.expandCell(row, col);

    const didUserHitMine = this.minesweeper.isBomb(row, col);
    if (this.minesweeper.checkIfGameOver() || didUserHitMine) {
      this.displayGameOver(didUserHitMine);
      return;
    }

    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.cols; ++c) {
        if (this.minesweeper.isCellOpen(r, c)) {
          const cellValue = this.minesweeper.getCellValue(r, c);
          const element = document.getElementById("grid").rows[r].cells[c];

          element.innerHTML = cellValue == 0 ? "" : cellValue;
          element.classList.add("clicked");
          if (cellValue > 0) element.classList.add(`n${cellValue}`);
        }
      }
    }
  }

  setCellToFlag(row, col) {
    if (this.minesweeper.isCellOpen(row, col)) return;

    this.minesweeper.setCelltoFlag(row, col);

    const isFlag = this.minesweeper.isCellFlag(row, col);
    const element = document.getElementById("grid").rows[row].cells[col];

    element.innerHTML = isFlag
      ? "<img class='icon' src='images/flag.jpg' alt='flag' width='40' height='40' />"
      : "";
  }

  displayGameOver(didUserHitMine) {
    for (let row = 0; row < this.rows; ++row) {
      for (let col = 0; col < this.cols; ++col) {
        const cellValue = this.minesweeper.getCellValue(row, col);
        const element = document.getElementById("grid").rows[row].cells[col];

        // set all cells to open status so users can't do anything on board after the game is finished
        this.minesweeper.setCellToOpen(row, col);

        if (cellValue == this.minesweeper.mineValue) {
          element.id = "bomb";
        }

        element.innerHTML =
          cellValue == 0 // if cellValue == 0
            ? "" // return empty
            : this.minesweeper.isCellFlag(row, col) // if cell is a flag
              ? "<img class='icon' src='images/flag.jpg' alt='flag' width='40' height='40' />"
              : cellValue == this.minesweeper.mineValue // if cellValue == mineValue
                ? "<img class='icon' src='images/bomb.jpg' alt='flag' width='40' height='40' />"
                : cellValue; // otherwise return cell value
      }
    }

    const report = document.createElement("div");
    report.className = `report ${didUserHitMine ? "lose" : "win"}`;
    report.innerHTML = `
    <div class="report-body">
      <span>${didUserHitMine ? "Sorry, you lose" : "Congrats, you win"}</span>
      <button onclick="location.reload()">Play again</button>
    </div>
  `;
    document.body.appendChild(report);
  }
}
