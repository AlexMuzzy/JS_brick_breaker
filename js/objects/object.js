
/**
 * Parent class for objects instaniated.
 * @param {Number} x starting coordinates for object
 * @param {Number} y starting coordinates for object
 * @param {String} colour of object
 * @param {Object} dimensions of object as a record
 * @param {Object} ctx context passed from canvas API
 */
export default class object {
    constructor(x, y, colour, dimensions, direction, ctx, dx, dy){
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.dimensions = dimensions;
        this.direction = direction;
        this.ctx = ctx;
    }
}