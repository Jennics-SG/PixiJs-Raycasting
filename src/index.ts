/** Application to demonstrate raycasting in pixijs
 *  Jimy Houlbrook
 *  16/11/23
 */

import * as PIXI from 'pixi.js';
import Caster from './caster';
import Ray from './ray';
import Boundary from './boundary';

export default class Application {

    private app: PIXI.Application;

    private caster: Caster;

    private boundaries: Array<Boundary>

    constructor(){
        this.app = new PIXI.Application<HTMLCanvasElement>({
            height: 720,
            width: 1080,
            backgroundColor: 0x000000,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('cont'),
            antialias: true
        });

        this.boundaries = new Array();

        // Create randomised boundaries

        for(let i = 0; i < 3; i++){
            let p1 = new PIXI.Point(
                Math.floor(Math.random() * this.app.view.width),
                Math.floor(Math.random() * this.app.view.height)
            );
            let p2 = new PIXI.Point(
                Math.floor(Math.random() * this.app.view.width),
                Math.floor(Math.random() * this.app.view.height)
            );
            const bound = new Boundary(p1.x, p1.y, p2.x, p2.y);
            this.boundaries.push(bound)
            this.app.stage.addChild(bound);
        }

        this.caster = new Caster(
            this.app.view.width / 2,
            this.app.view.height / 2,
        );
        this.app.stage.addChild(this.caster);

        this.app.ticker.add(this.delta.bind(this));
    }

    delta(){
        this.caster.look(this.boundaries)
    }
}
window.addEventListener('DOMContentLoaded', () => new Application);