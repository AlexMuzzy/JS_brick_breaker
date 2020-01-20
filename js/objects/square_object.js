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

    /**
     * TODO: create universal collision detection for use of destructible
     * bricks
     */
    hasCollidedTopSide (x, y) {
        if (y > this.y) {
            if (x > this.x && x < this.x + this.dimensions.width) {
                return true;
            }
        }
        return false;
    }

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