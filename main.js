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
let playerPositionY=200;
let aiPositionY=200;
const lineWidth=4
const lineHeight=16

function drawTable(){
ctx.fillStyle='#143d';
    ctx.fillRect(0,0,cw,ch)


for(let linePosition=20;linePosition<ch;linePosition+=40){
    
    ctx.fillStyle='gray';
    ctx.fillRect((cw/2+2),linePosition,lineWidth,lineHeight);
}



}

function drawBall(){
    const ballSize=20;
    ctx.fillStyle='#ffff';
ctx.fillRect(ballPositionX,ballPositionY, ballSize,ballSize)

}

function drawPlayers(){
ctx.fillStyle='white'
ctx.fillRect(playerPositionX,playerPositionY,playerWidth,playerHeight)
ctx.fillStyle='white'
ctx.fillRect(aiPositionX,aiPositionY,playerWidth,playerHeight)
}

drawTable()
drawBall()
drawPlayers()