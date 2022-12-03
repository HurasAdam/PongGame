/* eslint-disable no-unused-vars */
const canvas= document.querySelector('canvas');
const ctx=canvas.getContext('2d')

canvas.width=1000;
canvas.height=500;

const cw= canvas.width;
const ch=canvas.height;
let ballPositionX= (cw-10)/2
let ballPositionY=(ch-10)/2

const playerWidth= 20;
const playerHeight=100;

const playerPositionX=70;
const aiPositionX= 910;

function drawTable(){
ctx.fillStyle='#143d';
    ctx.fillRect(0,0,cw,ch)
}

function drawBall(){
    const ballSize=20;
    ctx.fillStyle='#ffff';
ctx.fillRect(ballPositionX,ballPositionY, ballSize,ballSize)

}

drawTable()
drawBall()

drawPlayers()
function drawPlayers(){
ctx.fillStyle='white'
ctx.fillRect(playerPositionX,250,playerWidth,playerHeight)

ctx.fillStyle='white'
ctx.fillRect(aiPositionX,250,playerWidth,playerHeight)
}