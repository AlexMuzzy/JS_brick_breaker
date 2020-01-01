import object from "./object.js";

export default class ball extends object {


    draw () {
        console.log(this.x, this.y, this.colour, this.shape, this.dimensions, this.direction, this.ctx);
        this.ctx.beginPath();
        this.ctx.fillstyle = this.colour;
        this.ctx.arc(this.x, this.y, this.dimensions.radius, 0, this.dimensions.arc);
        this.ctx.fill();
        this.ctx.closePath();
    }
}