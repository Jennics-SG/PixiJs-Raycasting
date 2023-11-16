/** Pixi application boilerplate
 *  Jimy Houlbrook
 *  16/11/23
 */

import * as PIXI from 'pixi.js';

export default class Application {

    private app : PIXI.Application;

    constructor(){
        this.app = new PIXI.Application<HTMLCanvasElement>({
            height: 720,
            width: 1080,
            backgroundColor: 0x000000,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('cont')
        });
    }
}

window.addEventListener('DOMContentLoaded', () => new Application);