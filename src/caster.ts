/** Class to represent ball that is casting rays
 *  Jimy Houlbrook
 *  16/11/23
 */

import { Graphics, Point } from "pixi.js";
import Ray from "./ray";
import Boundary from "./boundary";

export default class Caster extends Graphics {
    // Array to hold rays
    public rays: Array<Ray>;

    // Vector to hold pos
    public pos: Point;
    public r: number;

    constructor(x: number = 0, y: number = 0, r: number = 30) {
        super()

        this.pos = new Point(x, y);
        this.r = r;

        this.rays = new Array();
        let hue = 0
        const angleDelta = 0.5
        for (let i = 0; i < 360; i += angleDelta) {
            const ray = new Ray(this.pos, this.degreeToRadian(i), hue);
            hue += angleDelta;
            this.rays.push(ray);
        }

        window.addEventListener('mousemove', e => this.updatePos(e.clientX, e.clientY));
    }

    updatePos(x: number, y: number) {
        this.pos.x = x;
        this.pos.y = y;

        for (const ray of this.rays) {
            ray.pos.x = x;
            ray.pos.y = y;
            ray.draw();
        }

        // this.clear();
        // this.beginFill(0xffffff);
        // this.drawCircle(this.pos.x, this.pos.y, this.r);
        // this.endFill();
    }

    look(boundaries: Array<Boundary>) {
        for (const ray of this.rays) {
            let closest: Point | undefined;
            let max = Infinity;
            for (const boundary of boundaries) {
                const pt = ray.pointWillIntersect(boundary);
                if (pt != undefined) {
                    const d = this.distanceBetweenPoints(pt);
                    if (d <= max) {
                        max = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                ray.lookAt(closest);
                this.addChildAt(ray, 0);
            } else {
                ray.clear();
            }
        }
    }

    distanceBetweenPoints(pt: Point) {
        const x1: number = this.pos.x;
        const y1: number = this.pos.y;
        const x2: number = pt.x;
        const y2: number = pt.y;

        const xd = x2 - x1;
        const yd = y2 - y1;

        return Math.sqrt(xd ** 2 + yd ** 2);
    }

    degreeToRadian(d: number): number {
        return d * (Math.PI / 180);
    }
}