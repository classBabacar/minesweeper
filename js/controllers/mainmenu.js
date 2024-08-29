import DisplayView from "../views/display.js";

const btn = document
  .getElementById("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(form);

    const rows = formData.get("rows");
    const cols = formData.get("cols");
    const minesToPlace = formData.get("mines");

    var display = new DisplayView(rows, cols, minesToPlace);
    display.displayBoard();
  });
