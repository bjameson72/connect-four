import { checkWin } from "./win-logic.js";
import { BOARDROWS, BOARDCOLS } from "./constants.js";

const board = document.getElementById("board");
const playerIndicator = document.getElementById("player-indicator");

// setup board
// bounds: i & j
// directions: i & j

let boardHTML = "";
for (let row = BOARDROWS - 1; row >= 0; row--) {
  for (let col = 0; col < BOARDCOLS; col++) {
    // prettier-ignore

    boardHTML += `
      <div class="slot">
        <label for="slot${col}${row}">
          <input type="checkbox" ${row > 0 ? 'disabled': ''} 
          name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" />
        </label>
      </div>
      `;
  }
}

// set the board's HTML
board.innerHTML = boardHTML;

document
  .querySelectorAll("input")
  .forEach(input => input.addEventListener("change", runTurn));

let player1Turn = true;
function runTurn(event) {
  //   console.log(input);
  // change color of label
  const input = event.target;
  input.parentElement.className = player1Turn ? "player1" : "player2";

  // change what's disabled
  input.disabled = true;

  // enable the slot at (row + 1, col)
  const { col, row } = input.dataset;

  // check if input is in the top row
  if (row < BOARDROWS - 1) {
    const neighbor = document.getElementById(`slot${col}${parseInt(row) + 1}`);
    neighbor.disabled = false;
  }

  // check if it's a win
  const isWin = checkWin(
    parseInt(col),
    parseInt(row),
    player1Turn ? "player1" : "player2"
  );

  // update win text
  if (isWin) {
    alert("Winner winner chicken dinner!");
    return;
  }

  // change whose turn it is
  player1Turn = !player1Turn;

  // update player-indicator text
  if (player1Turn) {
    playerIndicator.innerText = "Player 1";
    playerIndicator.className = "player1";
  } else {
    playerIndicator.innerText = "Player 2";
    playerIndicator.className = "player2";
  }
}

function initialize() {
  playerIndicator.className = "player1";
  playerIndicator.innerText = "player 1";
  player1Turn = true;

  let boardHTML = "";

  for (let row = BOARDROWS - 1; row >= 0; row--) {
    for (let col = 0; col < BOARDCOLS; col++) {
      boardHTML += `<div class="slot">
        <label for="slot${col}${row}">
          <input onchange="runTurn(event)" type="checkbox" ${
            row > 0 ? "disabled" : ""
          }
            name="slot${col}${row}"
            id="slot${col}${row}"
            data-col="${col}"
            data-row="${row}">
            </label>
        </div>`;
    }
    board.innerHTML = boardHTML;
  }
}

window.runTurn = runTurn;
window.initialize = initialize;
