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
        50,
        canvasWidth/2,
        "#FFF",
        {radius: 10, arc: Math.PI * 2},
        {dx: 10, dy: 10},
        ctx,
        0,
        0
    );

/**
 * rectangle paddle values
 */

var paddle_object = new square(
        canvasWidth / 2,
        canvasHeight - 100,
        "#F00",
        {width: 150, height: 20},
        {leftPressed: false, rightPressed: false},
        ctx,
        15
    );

var score = 0;


/**
 * all objects spawned, along with their associated logic goes here.
 */

function objectLogic() {
    
    drawPaddle();
    drawScore();
    drawBall();
    paddle_object.move_paddle();
}

function drawPaddle() {
    console.log(paddle_object);
    
    ctx.beginPath();
    ctx.fillStyle = "#F00";
    ctx.closePath();

    paddle_object.square_object_draw();

}

function drawBall() {

    ball_object.ball_object_draw();    
    /**
     * below bounce rules implefmentation for ball (simply negating the values)
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