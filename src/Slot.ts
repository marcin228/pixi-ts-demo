import { Container, Graphics, Sprite, SpriteSource } from "pixi.js";
import Game from "./Game";

type TilesModel = {

    tilesNum:Number;
    tilesImages:any;
}

const enum SlotMode {
    ACCELERATING = 0,
    FREESPINNING = 1,
    BRAKING = 2,
    STOPPED = 3,
    AWAITING = 4,
}

export default class Slot{

    private mode:SlotMode;
    private time:number;
    private current:number;
    private speed:number;
    private offset:number;

    private container:Container;
    private tiles:Array<Sprite>;
    private width:number;
    private height:number;
    private tileHeight:number = 240 as const;

    private maxSpeed:number;
    private rotatedBy:number;
    private delta:number;
    private prev:number;

    constructor(width:number, height:number, x:number, tiles:TilesModel){

        this.mode = SlotMode.STOPPED;
        this.current = 1;
        this.time = 0;
        this.speed = 0;

        this.tiles = [];
        this.width = width;
        this.height = height;

        this.offset = 0;
        this.rotatedBy = 0;
        this.prev = 0;
        this.delta = 0;
        this.maxSpeed = 35;

        this.container = new Container();
        this.container.x = x;
        this.container.width = this.width;
        this.container.height = this.height;

        let maskingRect = new Graphics();
        maskingRect.beginFill(0x222222);
        maskingRect.drawRect(0, 0, width, height);
        maskingRect.endFill();

        this.container.addChild(maskingRect);
        this.container.mask = maskingRect;

        let i:number = 0;
        for(let key in Game.assets){
    
            this.tiles[i] = Sprite.from(Game.assets[key]); 
            this.container.addChild(this.tiles[i]);
            this.tiles[i].y += i * this.tileHeight;
            this.tiles[i].y -= (this.tileHeight*0.66666);
            i++;
        }

        //this.container.x = Number(Game.app.screen.width) / 2;
        //this.container.y = Number(Game.app.screen.height) / 2;

        Game.app.stage.addChild(this.container);

        this.container.eventMode = "dynamic";
        this.container.on('mouseup', () => {
            
            if(this.mode == SlotMode.STOPPED){
                this.changeMode(SlotMode.ACCELERATING);
            }
            else if(this.mode == SlotMode.FREESPINNING){

                this.changeMode(SlotMode.AWAITING, false);
                this.getResponseFromAPIAndBrake();
            }
        });

        Game.app.ticker.add(() => {

            this.manageSlotMode();
            this.draw();

            this.time += 1/60;
        })
    }

    private async getResponseFromAPIAndBrake():Promise<void>{

        let api = 'https://www.random.org/integers/?num=1&min=0&max=' + (this.tiles.length-1) + '&base=10&col=1&format=plain&rnd=new';    
        let r = await fetch(api);

        if(r.status != 200)
            throw new Error('api call denied.')

        let d = await r.json();
        let aim = parseInt(d);

        this.offset = (this.tiles.length + ((this.tiles.length - aim) + this.current)) * this.tileHeight;
        this.offset += 80 - this.tiles[this.current].y;
        this.changeMode(SlotMode.BRAKING);

        return;
    }

    private changeMode(newMode:SlotMode, resetTime:boolean = true):void{
        this.mode = newMode;

        if(resetTime)
            this.time = 0;
    }

    private draw():void{

        for(let i = 0; i < this.tiles.length; i++){

            this.tiles[i].y += this.speed;

            if(this.tiles[i].y > this.height)
                this.tiles[i].y -= this.tiles.length * this.tileHeight;

            if(this.tiles[i].y < -this.tileHeight)
                this.tiles[i].y += this.tiles.length * this.tileHeight;

            if(this.tiles[i].y >= (this.height/2) - (this.tileHeight/2))
                if(this.tiles[i].y <= (this.height/2) + (this.tileHeight/2))
                    this.current = i;
        }

        return;
    }

    private manageSlotMode():void{
    
        if(this.mode == SlotMode.ACCELERATING){
        
            this.speed = this.easeIn(this.time, 0, this.maxSpeed, 1);

            if(this.speed >= this.maxSpeed)
                this.changeMode(SlotMode.FREESPINNING);
        }
        else if(this.mode == SlotMode.FREESPINNING){
        
            //if(this.time > this.freespin)
                //this.changeMode(SlotMode.BREAKING);

        } else if(this.mode == SlotMode.BRAKING){

            let next = this.easeOut(this.time, 1, this.offset, 4);
            this.delta = next - this.prev;
            this.prev = next;

            this.rotatedBy += this.delta;
            this.speed = this.delta;

            if(this.speed <= 0 || this.rotatedBy >= this.offset){
                this.changeMode(SlotMode.STOPPED);

                this.speed = 0;
                this.rotatedBy = 0;
                this.prev = 0;
            }

        } else if(this.mode == SlotMode.STOPPED){
            this.speed = 0;
        } else if(this.mode == SlotMode.AWAITING){
            
            //
        }

        return;
    }

    private easeIn (t:number, b:number, c:number, d:number):number {
        
        return c * (t /= d) * t + b;
    }

    private easeOut(t:number, b:number, c:number, d:number):number {

        return -c * (t /= d) * (t - 2) + b;
    }
}