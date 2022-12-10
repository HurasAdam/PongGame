/* eslint-disable no-unused-vars */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gameResultBox = document.querySelectorAll("div span");

gameResultBox[1].textContent = getScore().Player;
gameResultBox[2].textContent = getScore().Computer;
canvas.width = 1000;
canvas.height = 500;

const gameState = {
  Player: 0,
  Computer: 0,
  cw: canvas.width,
  ch: canvas.height,
  ballPositionX: (1000 - 10) / 2,
  ballPositionY: (500 - 10) / 2,
  playerWidth: 20,
  playerHeight: 100,
  playerPositionX: 70,
  aiPositionX: 910,
  playerPositionY: 200,
  aiPositionY: 200,
  lineWidth: 4,
  lineHeight: 16,
  ballSpeedX: 2,
  ballSpeedY: 2,
  topCanvas: canvas.offsetTop,
};

function drawTable() {


  ctx.fillStyle = "#143d";
  ctx.fillRect(0, 0, gameState.cw, gameState.ch);
  for (let linePosition = 20; linePosition < gameState.ch; linePosition += 40) {
    ctx.fillStyle = "gray";
    ctx.fillRect(
      gameState.cw / 2 + 2,
      linePosition,
      gameState.lineWidth,
      gameState.lineHeight
    );
  }
}

function drawBall() {
  const ballSize = 20;
  ctx.fillStyle = "#ffff";
  ctx.fillRect(
    gameState.ballPositionX,
    gameState.ballPositionY,
    ballSize,
    ballSize
  );
  gameState.ballPositionX = gameState.ballPositionX + gameState.ballSpeedX;
  gameState.ballPositionY = gameState.ballPositionY + gameState.ballSpeedY;

  if (
    gameState.ballPositionY >= gameState.ch - ballSize ||
    gameState.ballPositionY <= 0
  ) {
    gameState.ballSpeedY = -gameState.ballSpeedY;
    speedUpBall(0.2);
  }

  const plyerWiningCondition =
    gameState.ballPositionX >= gameState.cw - ballSize;
  const aiWiningCondition = gameState.ballPositionX <= 0;
  if (plyerWiningCondition || aiWiningCondition) {
    if (plyerWiningCondition) {
      console.log("Gracz wygrywa");
      gameState.Player++;
      gameOver();
      gameResultBox[1].textContent = getScore().Player;
    } else if (aiWiningCondition) {
      console.log("Komputer wygrywa");
      gameState.Computer++;
      gameOver();
      gameResultBox[2].textContent = getScore().Computer;
    }
  }

  if (
    gameState.ballPositionX >= gameState.playerPositionX &&
    gameState.ballPositionX <=
      gameState.playerPositionX + gameState.playerWidth &&
    gameState.ballPositionY >= gameState.playerPositionY &&
    gameState.ballPositionY <= gameState.playerPositionY + 100
  ) {
    gameState.ballSpeedX = -gameState.ballSpeedX;
    speedUpBall(0.5);
  } else if (
    gameState.ballPositionX >= gameState.aiPositionX - gameState.playerWidth &&
    gameState.ballPositionY >= gameState.aiPositionY &&
    gameState.ballPositionY <= gameState.aiPositionY + 100
  ) {
    gameState.ballSpeedX = -gameState.ballSpeedX;
    speedUpBall(0.5);
  }
}

function drawPlayers() {
  ctx.fillStyle = "white";
  ctx.fillRect(
    gameState.playerPositionX,
    gameState.playerPositionY,
    gameState.playerWidth,
    gameState.playerHeight
  );
  ctx.fillStyle = "white";
  ctx.fillRect(
    gameState.aiPositionX,
    gameState.aiPositionY,
    gameState.playerWidth,
    gameState.playerHeight
  );
}

function setGame() {
  getScore();
  drawTable();
  drawBall();
  drawPlayers();
  aiMovement();
}

function speedUpBall(value) {
  if (gameState.ballSpeedX > 0 && gameState.ballSpeedX < 14) {
    gameState.ballSpeedX = gameState.ballSpeedX + value;
  }
  if (gameState.ballPositionX < 0 && gameState.ballSpeedX > -14) {
    gameState.ballSpeedX = gameState.ballSpeedX - value;
  }

  if (gameState.ballSpeedY > 0 && gameState.ballSpeedY < 16) {
    gameState.ballPositionY += value;
  }

  if (gameState.ballSpeedY < 0 && gameState.ballSpeedX > -16) {
    gameState.ballSpeedY -= value;
  }
}

function game(){
const scoreBoard=document.querySelector('.gameResult')

scoreBoard.classList.add('gameResultt')


setInterval(setGame, 1000 / 60);
}

window.addEventListener('keypress',game);
canvas.addEventListener("mousemove", function (e) {
  const mousePosition = e.clientY;

  gameState.playerPositionY =
    mousePosition - gameState.playerHeight / 2 - gameState.topCanvas;

  if (gameState.playerPositionY >= 400) {
    gameState.playerPositionY = 400;
  } else if (gameState.playerPositionY <= 0) {
    gameState.playerPositionY = 0;
  }
});

function aiMovement() {
  if (gameState.aiPositionY >= 400) {
    gameState.aiPositionY = 400;
  } else if (gameState.aiPositionY <= 0) {
    gameState.aiPositionY = 0;
  }
  if (gameState.ballPositionX > 500) {
    if (gameState.ballPositionY - 10 - (gameState.aiPositionY - 50) > 100) {
      gameState.aiPositionY += 5;
    }
  }
  if (gameState.ballPositionX > 500) {
    if (gameState.ballPositionY - 10 - (gameState.aiPositionY - 50) < 150) {
      gameState.aiPositionY -= 5;
    }

    if (gameState.ballPositionX < 500) {
      if (gameState.ballPositionY - 10 - (gameState.aiPositionY - 50) > 100) {
        gameState.aiPositionY += 1;
      }
    }
    if (gameState.ballPositionX > 500) {
      if (gameState.ballPositionY - 10 - (gameState.aiPositionY - 50) < 150) {
        gameState.aiPositionY -= 1;
      }
    }
  }
}

function gameOver() {
  gameState.ballPositionX = (gameState.cw - 10) / 2;
  gameState.ballPositionY = (gameState.ch - 10) / 2;
  gameState.ballSpeedX = 1;
  gameState.ballSpeedY = 1;
  drawTable();
  drawBall();
  drawPlayers();
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

function getScore() {
  let result = JSON.parse(localStorage.getItem("gameState"));
  if (result) {
    return result;
  } else {
    return 0;
  }
}


