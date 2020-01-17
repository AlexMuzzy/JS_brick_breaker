import object from "./object.js";

export default class square extends object {


    square_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillstyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
        this.ctx.fill();
        this.ctx.closePath();
    }
}