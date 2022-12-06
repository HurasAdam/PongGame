/* eslint-disable no-unused-vars */
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const gameResultBox= document.querySelectorAll('div span');

canvas.width = 1000;
canvas.height = 500;

let Player = 0;
let Computer=0;
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
let ballSpeedX = 2;
let ballSpeedY = 2;
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
    speedUpBall(0.2);
  }

  const plyerWiningCondition=ballPositionX >= cw - ballSize;
  const aiWiningCondition= ballPositionX <= 0;
  if ( plyerWiningCondition||aiWiningCondition ) {
    gameOver();

    if(plyerWiningCondition){
      console.log('Gracz wygrywa')
      Player++
      gameResultBox[1].textContent= Player;
    }
    else if(aiWiningCondition){
      console.log('Komputer wygrywa');
      Computer++
      gameResultBox[2].textContent= Computer;
    }
  }

  if (
    ballPositionX >= playerPositionX &&
    ballPositionX <= playerPositionX + playerWidth &&
    ballPositionY >= playerPositionY &&
    ballPositionY <= playerPositionY + 100
  ) {
    ballSpeedX = -ballSpeedX;
    speedUpBall(0.5);
  } else if (
    ballPositionX >= aiPositionX - playerWidth &&
    ballPositionY >= aiPositionY &&
    ballPositionY <= aiPositionY + 100
  ) {
    ballSpeedX = -ballSpeedX;
    speedUpBall(0.5);
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
  aiMovement();

}

function speedUpBall(value) {
  if (ballSpeedX > 0 && ballSpeedX < 14) {
    ballSpeedX = ballSpeedX + value;
  }
  if (ballPositionX < 0 && ballSpeedX > -14) {
    ballSpeedX = ballSpeedX - value;
  }

  if (ballSpeedY > 0 && ballSpeedY < 16) {
    ballPositionY += value;
  }

  if (ballSpeedY < 0 && ballSpeedX > -16) {
    ballSpeedY -= value;
  }
}

setInterval(setGame, 1000 / 60);

canvas.addEventListener("mousemove", function (e) {
  const mousePosition = e.clientY;

  playerPositionY = mousePosition - playerHeight / 2 - topCanvas;
  
  if (playerPositionY >= 400) {
    playerPositionY = 400;
   
  }

  else if (playerPositionY <= 0) {
    playerPositionY = 0;
   
  }  
});



function aiMovement(){
  if(aiPositionY>=400){
    aiPositionY=400
  }
  else if (playerPositionY <= 0) {
    playerPositionY = 0;
   
  }  
if(ballPositionX>500){
  if((ballPositionY+10)-(aiPositionY+50)<200){
    aiPositionY=ballPositionY;
  }

  if(ballPositionX>500){
    if((ballPositionY+10)-(aiPositionY+50)<-100){
      aiPositionY=ballPositionY-5;
    }
  }
  // else if((ballPositionY+10)-(aiPositionY+50)>200){
  //   aiPositionY+=5;
  // }
}
  }




function gameOver() {
  ballPositionX = (cw - 10) / 2;
  ballPositionY = (ch - 10) / 2;
  ballSpeedX = 1;
 ballSpeedY = 1;
  drawTable();
  drawBall();
  drawPlayers();
  
}


function testLocalStorage(){

const foo= ' foo';

try{
  localStorage.setItem(foo,foo);
  
  return true;
}catch(e){
  return false;
}

}


// function init(){
//   if(!testLocalStorage){
//     console.log('Lipa')
//   }
//   else
// }