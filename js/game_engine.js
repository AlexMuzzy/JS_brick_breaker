var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
/**
 * ball values
 */
var ball_dx = 10;
var ball_dy = -10;
var ball_x = 50;
var ball_y = canvasWidth/2;
var ballRadius = 10;
/**
 * rectangle paddle values
 */
var rect_dx = 10;
var rect_x = canvasWidth/2;
var rect_y = canvasHeight - 100;
var rect_width = 150;
var rect_height = 20;

var rightPressed = false;
var leftPressed = false;
var ballColour = "#FFF";
var score = 0;

/**
 * all objects spawned, along with their associated logic goes here.
 */

function objectLogic() {
    drawPaddle();
    drawBall();
    drawScore();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.fillStyle = "#F00";
    ctx.fillRect(rect_x - rect_width/2, rect_y, rect_width, rect_height);
    ctx.closePath();
}    
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = ballColour;
    ctx.arc(ball_x, ball_y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
    ball_x += ball_dx;
    ball_y += ball_dy;

    if (ball_y < ballRadius || ball_y + ball_dy > canvas.height-ballRadius){
        ball_dy = -ball_dy;
    }

    if (ball_x < ballRadius || ball_x + ball_dx > canvas.width-ballRadius){
        ball_dx = -ball_dx;
    }

}

function drawScore(){
    ctx.beginPath();
    ctx.fillText("score: " + score, canvasWidth - 200, 50);
    ctx.closePath();
    score++;
    
    /** 
     * /score reset if hit bottom of canvas (had to set threshold slightly higher since it does not work without it
     */
    if (ball_y + ball_dy > canvas.height-ballRadius-20){
        score = 0;
    }
}

function keyboardController () {

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    
    function keyDownHandler(e) {
        if          (e.key == "Right" || e.key == "ArrowRight") { rightPressed = true; }
        else if     (e.key == "Left" || e.key == "ArrowLeft") { leftPressed = true; }
    }
    
    function keyUpHandler(e) {
        if          (e.key == "Right" || e.key == "ArrowRight") { rightPressed = false; }
        else if     (e.key == "Left" || e.key == "ArrowLeft") { leftPressed = false; }
    }

    if (leftPressed && rect_x < canvasWidth){
        rect_x += -rect_dx;
    }

    if (rightPressed){
        rect_x += rect_dx;
    }
}

/**
    - draw loop of game set to 60fps. each frame will clear the screen and draw each part associated inside
    the function.

    - since this is procedural (maybe ill re-write this in an object oriented style at a later date), ensure 
    that the;
        _object logic, 
        _keyboard logic, 
        _the objects drawn,
        _the draw loop 
    are directly called, and separate. 
*/ 


function draw(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    keyboardController();
    objectLogic();
}

setInterval(draw, 1000/60);