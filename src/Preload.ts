import { Assets, Texture } from "pixi.js";

export type AssetsObject = {

    [key: string]: Texture;
};

export default class Preload{

    private _assets:AssetsObject;
    private assetsNames:Array<string>
    
    constructor(){

        this.assetsNames = ['2.png', '1.png', '8.png', '7.png', '6.png', '5.png', '4.png', '3.png'];
        this._assets = {};
    }

    async download(callback:Function):Promise<void>{

        try{
            for(let val of this.assetsNames)
                this._assets[val] = await Assets.load<any>('slots/' + val);
        }catch(e){
            throw new Error('no such asset to load.')
        }

        callback();
        return;
    }

    public get assets():AssetsObject{

        if(Object.values(this._assets).length == 0)
            throw new Error('no assets loaded yet.')

        return {...this._assets};
    }
}