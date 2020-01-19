import ball from "./objects/ball_object.js";
import square from "./objects/square_object.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;
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
        {dx: 15, dy: 15},
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

var score = 0;


/**
 * all objects spawned, along with their associated logic goes here.
 */

function objectLogic() {
    drawPaddle();
    drawScore();
    drawBall();
}

function drawPaddle() {
    paddle_object.square_object_draw();
}

function drawBall() {

    ball_object.ball_object_draw();    
    /**
     * below bounce rules implementation for ball (simply negating the values)
     */
    if (ball_object.y < ball_object.dimensions.radius || ball_object.y + ball_object.direction.dy > canvas.height - ball_object.dimensions.radius) {
        ball_object.direction.dy = -ball_object.direction.dy;
    }

    if (ball_object.x < ball_object.dimensions.radius || ball_object.x + ball_object.direction.dx > canvas.width - ball_object.dimensions.radius) {
        ball_object.direction.dx = -ball_object.direction.dx;
    }

    /**
     * TODO: create universal collision detection for use of destructible
     * bricks
     */
    if (ball_object.y > paddle_object.y) {
        if (ball_object.x > paddle_object.x - paddle_object.dimensions.width / 2 && ball_object.x < paddle_object.x - paddle_object.dimensions.width / 2 + paddle_object.dimensions.width) {
            ball_object.direction.dy = -ball_object.direction.dy;
        }
    }

    /**
     * point to show where value from if statement above is referencing to.
     * left side point
     * 
     */
    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.arc(paddle_object.x - paddle_object.dimensions.width / 2, paddle_object.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    /**
     * 
     * right side point
     */

    ctx.beginPath();
    ctx.fillStyle = "#FFF";
    ctx.arc(paddle_object.x - paddle_object.dimensions.width / 2 + paddle_object.dimensions.width, paddle_object.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    /**
     * 
     * point of x and y coordinate of ball
     */
    ctx.beginPath();
    ctx.fillStyle = "#0F0";
    ctx.arc(ball_object.x, ball_object.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

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
            paddle_object.direction.rightPressed = true;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle_object.direction.leftPressed = true;
            
        }
    }

    function keyUpHandler(e) {
        if (e.key == "Right" || e.key == "ArrowRight") {
            paddle_object.direction.rightPressed = false;
        } else if (e.key == "Left" || e.key == "ArrowLeft") {
            paddle_object.direction.leftPressed = false;
        }
    }


    /**
     * TODO: implement this within the OOP scope of the paddle object
     * 
     *     if (leftPressed && rect_x < canvasWidth) {
        rect_x += -rect_dx;
    }

    if (rightPressed) {
        rect_x += rect_dx;
    }
     * 
     * 
     * 
     * 
     */
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