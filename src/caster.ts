/** Class to represent ball that is casting rays
 *  Jimy Houlbrook
 *  16/11/23
 */

import { Graphics, Container } from "pixi.js";

export default class Caster{
    public x : number;
    public y : number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
    }

    drawCirc(){
        const circ : Graphics = new Graphics();
        circ.beginFill(0xffffff);
        circ.drawCircle(this.x, this.y, 30);
        circ.endFill
        return circ;
    }
}