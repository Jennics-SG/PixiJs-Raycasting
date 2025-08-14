/** Application to demonstrate raycasting in pixijs
 *  Jimy Houlbrook
 *  16/11/23
 */

import * as PIXI from 'pixi.js';
import Caster from './caster';
import Ray from './ray';
import Boundary from './boundary';
import fragment from './shaders/Ascii/frag.glsl';
import vertex from './shaders/Ascii/vertex.glsl';


export default class Application {

    private app: PIXI.Application;
    private worldContainer!: PIXI.Container;
    private fragmentShader!: string;
    private caster!: Caster;
    private filter!: PIXI.Filter;
    private boundaries: Array<Boundary>
    private elapsed = 0;
    private mousePosition= {x: 0, y:0};

    constructor() {
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
        })


        const backgroundTexture = await PIXI.Assets.load('/data/images/real.png');

        this.worldContainer = new PIXI.Container();
        this.app.stage.addChild(this.worldContainer);

        const background = new PIXI.Sprite(backgroundTexture);
        this.worldContainer.addChild(background);

        console.log(fragment);

        const program = new PIXI.GlProgram({
            vertex,
            fragment,
        });

        this.filter = new PIXI.Filter({
            glProgram: program,
            resources: {
                timeUniforms: { uTime: { value: 0.0, type: 'f32' } },
                filterUniforms: {
                    uSize: { value: 10.0, type: 'f32' },
                    uMaxSize: { value: 50.0, type: 'f32' },
                    uMousePosition: { value: [0, 0], type: 'vec2<f32>' }
                }
            },
        });

        this.worldContainer.filters = [this.filter];

        this.app.ticker.add(this.onTick.bind(this));
        document.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    onTick() {
        // this.caster.look(this.boundaries)
        this.elapsed += this.app.ticker.deltaMS / 1000
        // this.filter.resources.timeUniforms.uniforms.uTime = this.elapsed;
        const local = this.worldContainer.toLocal(this.mousePosition)
        this.filter.resources.filterUniforms.uniforms.uMousePosition = [local.x, local.y]
    }

    onMouseMove(e: MouseEvent) {
        // console.log(e.x, e.y)
        this.mousePosition = {x: e.x, y: e.y};
        this.filter.resources.filterUniforms.uniforms.uMousePosition.x = e.x;
        this.filter.resources.filterUniforms.uniforms.uMousePosition.y = e.y;
    }
}
window.addEventListener('DOMContentLoaded', () => new Application);