import DisplayView from "../views/display.js";

const btn = document
  .getElementById("form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const rows = formData.get("rows");
    const cols = formData.get("cols");
    const minesToPlace = formData.get("mines");

    const display = new DisplayView(rows, cols, minesToPlace);
    display.displayBoard();
  });
