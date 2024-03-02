import Assets, { AssetsObject } from "./Preload";
import Slot from "./Slot";
import { Text, TextStyle } from "pixi.js";

export default class Game{

    public static app:any;
    public static assets:AssetsObject;

    public slot1:Slot | null;
    public slot2:Slot | null;
    public slot3:Slot | null;
    public slot4:Slot | null;
    public slot5:Slot | null;
    public slot6:Slot | null;
    public slot7:Slot | null;
    public slot8:Slot | null;

    constructor(app:any){

        Game.app = app;

        this.slot1 = null;
        this.slot2 = null;
        this.slot3 = null;
        this.slot4 = null;
        this.slot5 = null;
        this.slot6 = null;
        this.slot7 = null;
        this.slot8 = null;

        let init = () => {

            Game.assets = a.assets;
            this.slot1 = new Slot(240, 400, 0);
            this.slot2 = new Slot(240, 400, 240);
            this.slot3 = new Slot(240, 400, 480);
            this.slot4 = new Slot(240, 400, 720);
            this.slot5 = new Slot(240, 400, 960);
            this.slot6 = new Slot(240, 400, 1200);
            this.slot7 = new Slot(240, 400, 1440);
            this.slot8 = new Slot(240, 400, 1680);

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