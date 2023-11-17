/** Class to represent a boundary within the world
 *  Jimy Houlbrook
 *  17/11/23
 */

import { Graphics, Point } from "pixi.js";

export default class Boundary extends Graphics{
    public start: Point;
    public fin: Point

    constructor(x1: number, y1: number, x2: number, y2: number){
        super();

        this.start = new Point(x1, y1);
        this.fin = new Point(x2, y2);

        this.lineStyle(5, 0xffffff);
        this.moveTo(this.start.x, this.start.y);
        this.lineTo(this.fin.x, this.fin.y);
    }
}