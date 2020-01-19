
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
    constructor(x, y, colour, dimensions, direction, ctx, dx, dy){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.dimensions = dimensions;
        this.direction = direction;
        this.ctx = ctx;
        this.dx =dx;
        this.dy = dy;
    }
}