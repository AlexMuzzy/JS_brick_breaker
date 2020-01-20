import object from "./object.js";

/**
 * Class. Square class for objects instaniated.
 * @param {Number} x starting coordinates for square object
 * @param {Number} y starting coordinates for square object
 * @param {String} colour of square object
 * @param {Object} dimensions of square object as a record
 * @param {Object} ctx context passed from canvas API
 */
export default class square extends object {

/**
 * Void function. Main draw function for square object.
 */
    square_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

/**
 * Void function. Function to check if movement key has been pressed,
 *  and if so, move square object.
 */
    move_paddle(){
        if (this.direction.leftPressed && this.x > 0) {
            this.x += -this.direction.dx;
        }
        if(this.direction.rightPressed && this.x < this.ctx.canvas.width - this.dimensions.width){
            this.x += this.direction.dx;
        }
    }

/**
 * Boolean function. Tests to see if x and y coordinates given have collided with coordinates in object.
 * @param {number} x Coordinate for object tested for collision.
 * @param {number} y Coordinate for object tested for collision.
 */
    hasCollidedTopSide (x, y) {
        if (y > this.y) {
            if (x > this.x && x < this.x + this.dimensions.width) {
                return true;
            }
        }
        return false;
    }

/**
 * Void function. Debug function to help test if object is being drawn properly 
 * by drawing a circle at each edge.
 */
    showSquarePoints () {

        /**
         * left side point
         * 
         */
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFF";
        this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        /**
         * 
         * right side point
         */
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFF";
        this.ctx.arc(this.x + this.dimensions.width, this.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        /**
         * 
         * lower left side point
         */
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFF";
        this.ctx.arc(this.x, this.y + this.dimensions.height, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        /**
         * 
         * lower left side point
         */
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFF";
        this.ctx.arc(this.x + this.dimensions.width, this.y + this.dimensions.height, 3, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
}