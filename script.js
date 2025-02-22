//board

let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//player
let playerWidth = 80;
let playerHeight = 10;
let playerVelocityX = 10;

let player = {
    x: boardWidth / 2 - playerWidth /2,
    y: boardHeight  - playerHeight -5,
    width: playerWidth,
    height: playerHeight,
    velocityX: playerVelocityX

}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ballVelocityX = 3;
let ballVelocityY = 2;

let ball = {
    x: boardWidth / 2,
    y: boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX: ballVelocityX,
    velocityY: ballVelocityY

}

//blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColumns = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

//starting block corner top left

let blockX = 15;
let blockY = 45;



window.onload = function (){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //draw initial player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", movePlayer);

    //create blocks
    createBlocks();


}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0, board.width, board.height);

    //player
    context.fillStyle = "lightgreen";
    context.fillRect(player.x, player.y, player.width, player.height);

    //ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
   context.fillRect(ball.x, ball.y, ball.width, ball.height);

//bounce ball off walls
if(ball.y <= 0){

    ball.velocityY *= -1;
}
else if(ball.x <= 0|| (ball.x + ball.width) >= boardWidth){
    ball.velocityX *= -1;

}
else if(ball.y + ball.height >= boardHeight){
}

//bounce the ball off player paddle
if(topCollision(ball, player) || bottomCollision(ball, player)){
    ball.velocityY *= -1;
} else if(leftCollision(ball, player) || rightCollision(ball, player)){
     ball.velocityX *= -1;
}

//blocks
context.fillStyle = "skyblue";
for(let i =0; i<blockArray.length; i++){
    let block = blockArray[i];
    if(!block.break){
        if(topCollision(ball, block) || bottomCollision(ball, block)){
            block.break = true;
            ball.velocityY *= -1;
            blockCount -= 1;
        } 
        else if(leftCollision(ball, block) || rightCollision(ball, block)){
            block.break = true;
            ball.velocityX *= -1;
            blockCount -= 1;
        }
        context.fillRect(block.x, block.y, block.width, block.height);
    }
}

}

function outOfBounce(xPosition){
    return(xPosition<0 || xPosition+playerWidth > boardWidth);
}

function movePlayer(e){
    if(e.code == "ArrowLeft"){
        let nextPlayerX = player.x - player.velocityX;
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX;
        }
    }
    else if(e.code == "ArrowRight"){
        let nextPlayerX = player.x + player.velocityX;
        if(!outOfBounce(nextPlayerX)){
            player.x = nextPlayerX;
        }

    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function topCollision(ball, block){
    return detectCollision(ball, block) && (ball.y + ball.height) >= block.y;
}

function bottomCollision(ball, block){
    return detectCollision(ball, block) && (block.y + block.height) >= ball.y;
}
function leftCollision(ball, block){
    return detectCollision(ball, block) && (ball.x + ball.width) >= block.x;
}
function rightCollision(ball, block){
    return detectCollision(ball, block) && (block.x + block.width) >= ball.x;
}


function createBlocks(){
    blockArray = [];
    for(let c =0; c< blockColumns; c++){
        for(let r=0; r< blockRows; r++){
            let block = {
                x: blockX + c*blockWidth + c*10,
                y: blockY + r*blockHeight + r*10,
                width: blockWidth,
                height: blockHeight,
                break: false

            }
            blockArray.push(block);
        }
    }
blockCount = blockArray.length;
}