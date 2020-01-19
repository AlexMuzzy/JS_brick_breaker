import object from "./object.js";

export default class square extends object {


    square_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillstyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move_paddle(){
        if (this.direction.leftPressed && this.x > 0) {
            this.x += -this.dx;
        }
        if(this.direction.rightPressed && this.x < this.ctx.canvas.width - this.dimensions.width){
            this.x += this.dx;
        }
    }
}