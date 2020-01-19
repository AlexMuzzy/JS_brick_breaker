import object from "./object.js";

export default class ball extends object {


    ball_object_draw () {
        console.log(this.x, this.y, this.colour, this.dimensions, this.direction, this.ctx);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.arc(this.x, this.y, this.dimensions.radius, 0, this.dimensions.arc);
        this.ctx.fill();
        this.ctx.closePath();

        this.ball_object_speed();
    }

    ball_object_speed () {
        /**
         * once ball is instiated, use this function to give the ball speed.
         */
        this.x += this.direction.dx;
        this.y += this.direction.dy;
    }
}