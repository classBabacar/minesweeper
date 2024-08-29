import Minesweeper from "../models/minesweeper.js";

export default class DisplayView {
  constructor(rows, cols, minesToPlace) {
    this.rows = rows;
    this.cols = cols;
    this.minesToPlace = minesToPlace;
    this.Minesweeper = new Minesweeper(rows, cols, minesToPlace);
  }

  displayBoard() {
    let lastClicked;
    let grid = clickableGrid(this.rows, this.cols, function (el, row, col, i) {
      console.log("You clicked on element:", el);
      console.log("You clicked on row:", row);
      console.log("You clicked on col:", col);
      console.log("You clicked on item #:", i);

      el.className = "clicked";
      // if (lastClicked) lastClicked.className = "";
      // lastClicked = el;
    });

    document.body.appendChild(grid);

    function clickableGrid(rows, cols, callback) {
      let i = 0;
      let grid = document.createElement("table");
      grid.className = "grid";
      for (let r = 0; r < rows; ++r) {
        let tr = grid.appendChild(document.createElement("tr"));
        for (let c = 0; c < cols; ++c) {
          let cell = tr.appendChild(document.createElement("td"));
          cell.innerHTML = ++i;
          cell.addEventListener(
            "click",
            (function (el, r, c, i) {
              return function () {
                callback(el, r, c, i);
              };
            })(cell, r, c, i),
            false
          );
        }
      }
      return grid;
    }
  }
}
