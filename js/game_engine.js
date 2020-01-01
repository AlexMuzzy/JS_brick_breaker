import object from "./objects/object.js"
import ball from "./objects/ball_object.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;
ctx.canvas.width = canvasWidth;
ctx.canvas.height = canvasHeight;
/**
 * ball values
 */
var ball_object = new ball(50, canvasWidth/2, "#FFF", "circle", {radius: 10, arc: Math.PI * 2}, {dx: 10, dy: 10}, ctx);
/**
 * rectangle paddle values
 */
var rect_dx = 15;
var rect_x = canvasWidth / 2;
var rect_y = canvasHeight - 100;
var rect_width = 150;
var rect_height = 20;
var rightPressed = false;
var leftPressed = false;
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
    ctx.fillRect(rect_x - rect_width / 2, rect_y, rect_width, rect_height);
    ctx.closePath();
}

function drawBall() {

    ball_object.draw();

    ball_object.x += ball_object.direction.dx;
    ball_object.y += ball_object.direction.dy;
    
    /**
     * below bounce rules implementation for ball (simply negating the values)
     */
    // if (ball_y < ballRadius || ball_y + ball_dy > canvas.height - ballRadius) {
    //     ball_dy = -ball_dy;
    // }

    // if (ball_x < ballRadius || ball_x + ball_dx > canvas.width - ballRadius) {
    //     ball_dx = -ball_dx;
    // }

    /**
     * TODO: create universal collision detection for use of destructible
     * bricks
     */
    // if (ball_y > rect_y) {
    //     if (ball_x > rect_x - rect_width / 2 && ball_x < rect_x - rect_width / 2 + rect_width) {
    //         ball_dy = -ball_dy;
    //     }
    // }
}

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

function keyboardController() {

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = false;
        }
    }

    if (leftPressed && rect_x < canvasWidth) {
        rect_x += -rect_dx;
    }

    if (rightPressed) {
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


function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    keyboardController();
    objectLogic();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);