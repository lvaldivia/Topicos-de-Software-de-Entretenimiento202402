import PreloadScene from "./states/Preload";
import GameScene from "./states/Game";

let config = {
    /*width: window.innerWidth 100%,
    height: window.innerHeight,*/
    width: 800 ,
    height: 640,
    scene: [PreloadScene,GameScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default : 'arcade',
        arcade:{
            //debug:true,
            gravity:{
                y : 500
            }
        }
    }
};
new Phaser.Game(config);