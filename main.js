/* eslint-disable no-unused-vars */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

let counter = 30;
const cw = canvas.width;
const ch = canvas.height;
let ballPositionX = (cw - 10) / 2;
let ballPositionY = (ch - 10) / 2;

const playerWidth = 20;
const playerHeight = 100;

const playerPositionX = 70;
const aiPositionX = 910;
let playerPositionY = 200;
let aiPositionY = 200;
const lineWidth = 4;
const lineHeight = 16;
let ballSpeedX = 1;
let ballSpeedY = 1;
const topCanvas = canvas.offsetTop;
console.log(topCanvas);

function drawTable() {
  ctx.fillStyle = "#143d";
  ctx.fillRect(0, 0, cw, ch);
  for (let linePosition = 20; linePosition < ch; linePosition += 40) {
    ctx.fillStyle = "gray";
    ctx.fillRect(cw / 2 + 2, linePosition, lineWidth, lineHeight);
  }
}

function drawBall() {
  const ballSize = 20;
  ctx.fillStyle = "#ffff";
  ctx.fillRect(ballPositionX, ballPositionY, ballSize, ballSize);
  ballPositionX = ballPositionX + ballSpeedX;
  ballPositionY = ballPositionY + ballSpeedY;

  if (ballPositionY >= ch - ballSize || ballPositionY <= 0) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballPositionX >= cw - ballSize || ballPositionX <= 0) {
    ballSpeedX = -ballSpeedX;
  }
}

function drawPlayers() {
  ctx.fillStyle = "white";
  ctx.fillRect(playerPositionX, playerPositionY, playerWidth, playerHeight);
  ctx.fillStyle = "white";
  ctx.fillRect(aiPositionX, aiPositionY, playerWidth, playerHeight);
}

function setGame() {
  drawTable();
  drawBall();
  drawPlayers();
}

setInterval(setGame, 1000 / 60);

canvas.addEventListener("mousemove", function (e) {
  const mousePosition = e.clientY;

  playerPositionY = mousePosition - topCanvas;
  if (playerPositionY >= 400) {
    playerPositionY = 400;
  }

  if (playerPositionY <= 0) {
    playerPositionY = 0;
  }
});
