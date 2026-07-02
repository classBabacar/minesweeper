import ViewHandler from "../views/viewhandler.js";

const form = document.getElementById("form");
const gameButton = document.getElementById("game");
const errorEl = document.getElementById("error");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorEl.textContent = "";

  const formData = new FormData(e.target);
  const rows = Number(formData.get("rows"));
  const cols = Number(formData.get("cols"));
  const minesToPlace = Number(formData.get("mines"));

  if (minesToPlace >= rows * cols) {
    errorEl.textContent = `Too many mines: max is ${rows * cols - 1} for a ${rows}x${cols} board.`;
    return;
  }

  gameButton.disabled = true;

  try {
    const display = new ViewHandler(rows, cols, minesToPlace);
    display.displayBoard();
  } catch (err) {
    console.error(err);
    errorEl.textContent = "Something went wrong starting the game.";
    gameButton.disabled = false;
  }
});
