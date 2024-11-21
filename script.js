//Factory function for gameboard(IIFE)
const gameborad = (function () {
  let round = true;
  const board = Array.from({ length: 3 }, () => Array(3).fill(0));
  //console.log(board);
  const roundForPlayer1 = (i, j) => {
    if (board[i][j] == 0) {
      board[i][j] = 1;
      return true;
    } else return false;
  };
  const roundForPlayer2 = (i, j) => {
    if (board[i][j] == 0) {
      board[i][j] = 2;
      return true;
    } else return false;
  };
  const checkGame = () => {
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] == board[1][i] &&
        board[1][i] == board[2][i] &&
        board[0][i] != 0
      ) {
        return true;
      } else if (
        board[i][0] == board[i][1] &&
        board[i][1] == board[i][2] &&
        board[i][0] != 0
      ) {
        return true;
      }
    }
    if (
      board[0][0] != 0 &&
      board[0][0] == board[1][1] &&
      board[1][1] == board[2][2]
    ) {
      return true;
    } else if (
      board[0][2] != 0 &&
      board[0][2] == board[1][1] &&
      board[1][1] == board[2][0]
    ) {
      return true;
    }
    return false;
  };
  const clearBoard = () => {
    for (i = 0; i < 3; i++) {
      board[0][i] = 0;
      board[1][i] = 0;
      board[2][i] = 0;
    }
  };
  //Game logic
  const game = (i, j) => {
    if (!checkGame()) {
      if (round) {
        if (roundForPlayer1(i, j)) round = !round;
      } else {
        if (roundForPlayer2(i, j)) round = !round;
      }
    }
  };
  return { board, game, checkGame, clearBoard };
})();

//DOM manipulation to build the board on html
const container = document.querySelector(".container");
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const button = document.createElement("button");
    button.id = "button" + i + j;
    button.addEventListener("click", () => {
      if (!gameborad.checkGame()) {
        gameborad.game(i, j);
        if (gameborad.board[i][j] == 1) {
          button.textContent = "X";
        } else if (gameborad.board[i][j] == 2) {
          button.textContent = "O";
        } else {
          button.textContent = "";
        }
      }
    });
    container.appendChild(button);
  }
}

//Replay function
const replayDiv = document.querySelector(".replay");
const replay = document.createElement("button");
replay.className = "replayBtn";
replayDiv.appendChild(replay);
replay.addEventListener("click", () => {
  gameborad.clearBoard();
  const btns = document.querySelectorAll("button");
  console.log(btns);
  for (const btn of btns) {
    btn.textContent = "";
  }
  replay.textContent = "replay";
});
replay.textContent = "replay";
