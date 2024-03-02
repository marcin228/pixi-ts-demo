import { Application } from "pixi.js";
import Game from "./Game";

const app = new Application<HTMLCanvasElement>( {background: '#000000', resizeTo: window });
document.body.appendChild(app.view);
app.stage.sortableChildren = true;

const game:Game = new Game(app);
console.log(game);
