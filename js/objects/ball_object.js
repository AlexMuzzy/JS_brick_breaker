import object from "./object.js";

/**
 * Class. Ball class for objects instaniated.
 * @param {Number} x starting coordinates for square object
 * @param {Number} y starting coordinates for square object
 * @param {String} colour of square object
 * @param {Object} dimensions of square object as a record
 * @param {Object} ctx context passed from canvas API
 */
export default class ball extends object {

/**
 * Void function. Main draw function for ball object.
 */
    ball_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.arc(this.x, this.y, this.dimensions.radius, 0, this.dimensions.arc);
        this.ctx.fill();
        this.ctx.closePath();
    }

/**
 * Void function. Once ball is instiated, use this function to give the ball speed.
 */
    ball_object_speed () {

        this.x += this.direction.dx;
        this.y += this.direction.dy;
    }

/**
 * Void function. Below bounce rules implementation for ball (simply negating the values)
 */
    boundry_collision () {

        if (this.y < this.dimensions.radius || this.y + this.direction.dy > this.ctx.canvas.height - this.dimensions.radius) {
            this.direction.dy = -this.direction.dy;
        }
    
        if (this.x < this.dimensions.radius || this.x + this.direction.dx > this.ctx.canvas.width - this.dimensions.radius) {
            this.direction.dx = -this.direction.dx;
        }
    }

/**
 * Void function. Debug function using to help indicate where the x and y is located.
 */
    ball_object_point_draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0F0";
        this.ctx.arc(this.x, this.y, 2, 0, this.dimensions.arc);
        this.ctx.fill();
        this.ctx.closePath();
    }
}