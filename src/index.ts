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

    private worldContainer!: PIXI.Container;

    private caster!: Caster;

    private boundaries: Array<Boundary>

    constructor(){
        this.app = new PIXI.Application();

        //@ts-expect-error
        globalThis.__PIXI_APP__ = this.app;

        this.boundaries = new Array();

        this.init();
    }

    async init() {
        await this.app.init({
            resizeTo: window,
            backgroundColor: 0x000000,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('cont'),
            antialias: true
        });

        const backgroundTexture = await PIXI.Assets.load('/data/images/real.png');
        console.log(backgroundTexture);

        this.worldContainer = new PIXI.Container();
        this.app.stage.addChild(this.worldContainer);

        const background = new PIXI.Sprite(backgroundTexture);
        this.worldContainer.addChild(background);

        // Screen boundaries
        const w = this.app.screen.width;
        const h = this.app.screen.height;
        this.boundaries.push(
            new Boundary(0, 0, w, 0),
            new Boundary(w, 0, w, h),
            new Boundary(w, h, 0, h),
            new Boundary(0, h, 0, 0)
        )

        // Create randomised boundaries
        for(let i = 0; i < 3; i++){
            let p1 = new PIXI.Point(
                Math.floor(Math.random() * this.app.screen.width),
                Math.floor(Math.random() * this.app.screen.height)
            );
            let p2 = new PIXI.Point(
                Math.floor(Math.random() * this.app.screen.width),
                Math.floor(Math.random() * this.app.screen.height)
            );
            const bound = new Boundary(p1.x, p1.y, p2.x, p2.y);
            this.boundaries.push(bound)
            this.worldContainer.addChild(bound);
        }

        this.caster = new Caster(
            this.app.screen.width,
            this.app.screen.height,
            30,
            this.app
        );
        this.worldContainer.addChild(this.caster);
        this.worldContainer.mask = this.caster;

        this.app.ticker.add(this.onTick.bind(this));
    }

    onTick(){
        this.caster.look(this.boundaries)
    }
}
window.addEventListener('DOMContentLoaded', () => new Application);