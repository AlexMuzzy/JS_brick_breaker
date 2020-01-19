import object from "./object.js";

export default class square extends object {


    square_object_draw () {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
        this.ctx.fill();
        this.ctx.closePath();

        this.move_paddle();
        
    }

    move_paddle(){
        if (this.direction.leftPressed && this.x > 0) {
            this.x += -this.direction.dx;
        }
        if(this.direction.rightPressed && this.x < this.ctx.canvas.width - this.dimensions.width){
            this.x += this.direction.dx;
        }
    }
}