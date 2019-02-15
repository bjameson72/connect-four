const BOARDROWS = 6;
const BOARDCOLS = 7;

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
          <input onchange="runTurn(this)" type="checkbox" ${row > 0 ? 'disabled': ''} 
          name="slot${col}${row}" id="slot${col}${row}" data-row="${row}" data-col="${col}" />
        </label>
      </div>
      `;
  }
}

// set the board's HTML
board.innerHTML = boardHTML;

let player1Turn = true;
function runTurn(input) {
  //   console.log(input);
  // change color of label
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

function checkWin(col, row, currPlayer) {
  // check down or across
  return checkDown(col, row, currPlayer) || checkAcross(col, row, currPlayer);

  // check diagonal
  //   return checkDiagonal(col, row, currPlayer);
}

function checkDown(col, row, currPlayer) {
  if (row < 3) {
    return false;
  } // can't connect 4 if it's only stacked 3 or less

  for (let j = row - 1; j > row - 4; j--) {
    const currSlotPlayer = document.getElementById(`slot${col}${j}`)
      .parentElement.className;
    if (currSlotPlayer != currPlayer) {
      return false;
    }
    return true;
  }
}

function checkAcross(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  // check right
  for (let i = col + 1; i < col + 4; i++) {
    // break if out of bounds
    if (i >= BOARDCOLS) {
      break;
    }
    const currSlotPlayer = document.getElementById(`slot${i}${row}`)
      .parentElement.className;
    if (currSlotPlayer === currPlayer) {
      sameColorNeighbors += 1;
    } else {
      break;
    }
  }

  // check left
  for (let i = col - 1; i > col - 4; i--) {
    // break if out of bounds
    if (i < 0) {
      break;
    }
    const currSlotPlayer = document.getElementById(`slot${i}${row}`)
      .parentElement.className;
    if (currSlotPlayer === currPlayer) {
      sameColorNeighbors += 1;
    } else {
      break;
    }
  }
  return sameColorNeighbors >= 3;
}

function checkDiagonal(col, row, currPlayer) {}

function checkUpLeft(col, row, currPlayer) {
  let sameColorNeighbors = 0;

  //   search up left
  for (let i = 1; i < 4; i++) {
    if (col - i < 0 || row + 1 >= BOARDCOLS) {
      break;
    }
    const currSlotPlayer = document.getElementById(`slot${col - i}${rol + 1}`)
      .parentElement.className;
    if (currSlotPlayer === currPlayer) {
      sameColorNeighbors += 1;
    } else {
      break;
    }
  }

  //   search down right
  for (let i = 1; i < 4; i++) {
    if (col + i >= BOARDCOLS || row - 1 < 0) {
      break;
    }
    const currSlotPlayer = document.getElementById(`slot${col + i}${rol - 1}`)
      .parentElement.className;
    if (currSlotPlayer === currPlayer) {
      sameColorNeighbors += 1;
    } else {
      break;
    }
    return sameColorNeighbors >= 3;
  }

  function checkUpRight(col, row, currPlayer) {
    let sameColorNeighbors = 0;

    //   search up left
    for (let i = 1; i < 4; i++) {
      if (col + i >= BOARDCOLS || row + 1 >= BOARDCOLS) {
        break;
      }
      const currSlotPlayer = document.getElementById(`slot${col + i}${rol + 1}`)
        .parentElement.className;
      if (currSlotPlayer === currPlayer) {
        sameColorNeighbors += 1;
      } else {
        break;
      }
    }

    //   search down right
    for (let i = 1; i < 4; i++) {
      if (col - i < 0 || row - 1 < 0) {
        break;
      }
      const currSlotPlayer = document.getElementById(`slot${col - i}${rol - 1}`)
        .parentElement.className;
      if (currSlotPlayer === currPlayer) {
        sameColorNeighbors += 1;
      } else {
        break;
      }
      return sameColorNeighbors >= 3;
    }
  }
}
