import ball from "./objects/ball_object.js";
import square from "./objects/square_object.js";

/**
 * Setting up window and environment for Canvas API.
 */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasHeight = 900;
var canvasWidth = 680;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
/**
 * ball values
 */
var ball_object = new ball(
        canvasWidth/2,
        canvasHeight/2,
        "#FFF",
        {radius: 10, arc: Math.PI * 2},
        {dx: 10, dy: 10},
        ctx
    );

/**
 * rectangle paddle values
 */
var paddle_object = new square(
        canvasWidth / 2,
        canvasHeight - 100,
        "#F00",
        {width: 150, height: 20},
        {leftPressed: false, rightPressed: false, dx: 15},
        ctx
    );

/**
 * Score value being set
 */

var brick_object = new square(
        100,
        150,
        "#0F0",
        {width: 40, height: 10},
        {score: 5000, live: true},
        ctx
    );
var score = 0;

/**
 * all objects spawned, along with their associated logic goes here.
 */
function objectLogic() {
    drawBricks();
    drawPaddle();
    drawScore();
    drawBall();
}

/**
 * Void function. Handles paddle object logic.
 */
function drawPaddle() {
    paddle_object.move_paddle();
    paddle_object.square_object_draw();

/**
 * Check if either top or bottom side of paddle are colliding with ball.
 */
    if (paddle_object.hasCollidedTopSide(ball_object.x, ball_object.y) || 
        paddle_object.hasCollidedBottomSide(ball_object.x, ball_object.y)){
        ball_object.direction.dy = -ball_object.direction.dy;
    }

/**
 * For debug purposes, showing where each edge is calculated at the 
 * end of each frame.
 */
    paddle_object.showSquarePoints();
}

/**
 * Void function. Handles ball logic.
 */
function drawBall() {
    ball_object.ball_object_speed();
    ball_object.boundry_collision();
    ball_object.ball_object_draw();
}

/**
 * Void function. Draws score on screen.
 */
function drawScore() {
    ctx.beginPath();
    ctx.fillText("score: " + score, canvasWidth - 200, 50);
    ctx.closePath();
    score++;

    /** 
     * /score reset if hit bottom of canvas (had to set threshold slightly higher since it does not work without it
     */
    // if (ball_y + ball_dy > canvas.height - ballRadius - 20) {
    //     score = 0;
    // }
}

function drawBricks() {
    if (brick_object.direction.live){
        brick_object.square_object_draw();
    
    
        if (brick_object.hasCollidedBottomSide(ball_object.x, ball_object.y) || brick_object.hasCollidedTopSide(ball_object.x, ball_object.y)){
            brick_object.direction.live = false;
            //ball_object.direction.dx = -ball_object.direction.dx;
            ball_object.direction.dy = -ball_object.direction.dy;
        }

        if(brick_object.hasCollidedRightSide(ball_object.x, ball_object.y) || brick_object.hasCollidedLeftSide(ball_object.x, ball_object.y)){
            brick_object.direction.live = false;
            ball_object.direction.dx = -ball_object.direction.dx;
        }
    }
}

function keyboardController () {
    /**
     * Event listener for both pressing the key down and pressing the key up
     * 
     * TODO: Currently the event listeners are being created at every 
     * frame which is causing large performance issues. Needs solving.
     */
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    /**
     * function for pressing the key down
     * @param {Object} e 
     */
    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            paddle_object.direction.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle_object.direction.leftPressed = true;
            
        }
    }

    /**
     * function for pressing the key up
     * @param {Object} e 
     */
    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            paddle_object.direction.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle_object.direction.leftPressed = false;
        }
    }
}

/**
 * Void function. Main draw loop for game. Works by
 * recursively calling the draw function with the 
 * requestAnimationFrame().
 */
function draw() {
    keyboardController();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    objectLogic();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);