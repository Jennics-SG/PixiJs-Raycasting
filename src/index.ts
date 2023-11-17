/** Application to demonstrate raycasting in pixijs
 *  Jimy Houlbrook
 *  16/11/23
 */

import * as PIXI from 'pixi.js';
import Caster from './caster';

export default class Application {

    private app : PIXI.Application;

    constructor(){
        this.app = new PIXI.Application<HTMLCanvasElement>({
            height: 720,
            width: 1080,
            backgroundColor: 0x000000,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('cont'),
            antialias: true
        });

        const caster: Caster = new Caster(
            this.app.view.width / 2,
            this.app.view.height / 2,
        );
        const casterView = caster.drawCirc();
        this.app.stage.addChild(casterView)
    }

}

window.addEventListener('DOMContentLoaded', () => new Application);