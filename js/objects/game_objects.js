
/**
 * class for all objects drawn in game.
 * @param x x starting coordinates for object
 * @param y y starting coordinates for object
 * @param colour colour of object
 * @param shape shape of object ("circle" and "square" currently available)
 * @param dimensions dimensions of object as a record
 * @param ctx context passed
 */
export default class object {
    constructor(x, y, colour, shape, dimensions, direction, ctx){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.shape = shape;
        this.dimensions = dimensions;
        this.direction = direction;
        this.ctx = ctx;
        ctx.beginPath();
        ctx.fillstyle = colour;
        if (shape == "circle"){
            ctx.arc(this.x, this.y, this.dimensions.radius, 0, this.dimensions.arc);
        }
        else if (shape == "square"){
            ctx.fillRect(this.x, this.y, this.dimensions.width, this.dimensions.height);
        }
        else {
            console.log("Shape not detected.");
        }
        ctx.fill();
        ctx.closePath();
    }




}