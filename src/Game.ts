import Assets, { AssetsObject } from "./Preload";
import Slot from "./Slot";
import { Text, TextStyle } from "pixi.js";

export default class Game{

    public static app:any;
    public static assets:AssetsObject;

    public slot1:Slot;
    public slot2:Slot;
    public slot3:Slot;
    public slot4:Slot;
    public slot5:Slot;
    public slot6:Slot;
    public slot7:Slot;
    public slot8:Slot;

    constructor(app:any){

        Game.app = app;

        let init = () => {

            Game.assets = a.assets;
            this.slot1 = new Slot(240, 400, 0, null);
            this.slot2 = new Slot(240, 400, 240, null);
            this.slot3 = new Slot(240, 400, 480, null);
            this.slot4 = new Slot(240, 400, 720, null);
            this.slot5 = new Slot(240, 400, 960, null);
            this.slot6 = new Slot(240, 400, 1200, null);
            this.slot7 = new Slot(240, 400, 1440, null);
            this.slot8 = new Slot(240, 400, 1680, null);

            let style = new TextStyle({ fontFamily: ['Arial', 'sans-serif'], align: 'left', fontSize: 14 , fontWeight: '900', fill: 0xf0c57d});
            let message = new Text('TS + pixi.js\r\n\r\nShort demo of a reusable slot component. Click the slot to start and stop the spin.\r\nTimes, speeds, icons, easings and sizes are all adjustable.\r\nResult of a spin is fetched from API.', style);
            message.x = 40;
            message.y = 440;
            Game.app.stage.addChild(message);
        }

        const a = new Assets();
        a.download(init);

        return;
    }
}