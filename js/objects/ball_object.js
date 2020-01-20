import object from "./object.js";

export default class ball extends object {


    ball_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.arc(this.x, this.y, this.dimensions.radius, 0, this.dimensions.arc);
        this.ctx.fill();
        this.ctx.closePath();

        this.ball_object_speed();

        this.boundry_collision();
    }

    ball_object_speed () {
        /**
         * once ball is instiated, use this function to give the ball speed.
         */
        this.x += this.direction.dx;
        this.y += this.direction.dy;
    }

    boundry_collision () {
        /**
         * below bounce rules implementation for ball (simply negating the values)
         */
        if (this.y < this.dimensions.radius || this.y + this.direction.dy > this.ctx.canvas.height - this.dimensions.radius) {
            this.direction.dy = -this.direction.dy;
        }
    
        if (this.x < this.dimensions.radius || this.x + this.direction.dx > this.ctx.canvas.width - this.dimensions.radius) {
            this.direction.dx = -this.direction.dx;
        }
    }
}