/** Class to represent ray
 *  17/11/23
 *  Jimy Houlbrook
 */

import { Point, Graphics } from "pixi.js";
import '@pixi/math-extras';
import Boundary from "./boundary";

export default class Ray extends Graphics{
    
    public pos: Point;
    private dir: Point;

    constructor(pos: Point, angle: number){
        super()

        this.pos = pos
        this.dir = this.vectorFromAngle(angle);

        this.lineStyle(5, 0xffffff);

        this.moveTo(this.pos.x, this.pos.y);
        this.lineTo(this.pos.x + this.dir.x, this.pos.y + this.dir.y);
    }

    vectorFromAngle(a: number): Point {
        return new Point(Math.cos(a), Math.sin(a))
    }

    pointWillIntersect(b: Boundary): Point | undefined{
        // Im not gonna pretend to understand this maths, 
        // it has convinced me that maths is infact dark magic.
        // REF: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection

        // Position of boundary
        const x1: number = b.start.x;
        const y1: number = b.start.y;
        const x2: number = b.fin.x;
        const y2: number = b.fin.y;

        // Position of ray given that it goes on for infinite length
        const x3: number = this.pos.x;
        const y3: number = this.pos.y;
        const x4: number = this.pos.x + this.dir.x;
        const y4: number = this.pos.y + this.dir.y;

        const den: number = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        // If the denominator is 0 the points will not intersect
        if (den === 0) return;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (!(t > 0 && t < 1 && u > 0)) return

        return new Point(
            x1 + t * (x2 - x1),
            y1 + t * (y2 - y1)
        );
    }

    draw(){
        this.clear();
        this.lineStyle(5, 0xffffff);
        this.moveTo(this.pos.x, this.pos.y);
        this.lineTo(this.pos.x + this.dir.x, this.pos.y + this.dir.y);
    }

    lookAt(p: Point){
        this.dir.x = p.x - this.pos.x
        this.dir.y = p.y - this.pos.y;
        this.dir.normalize()

        this.draw();
    }

}
