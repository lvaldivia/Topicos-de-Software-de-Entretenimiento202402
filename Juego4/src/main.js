import PreloadScene from "./states/Preload";
import GameScene from "./states/Game";

let config = {
    width: 1280,
    height: 720,
    scene: [PreloadScene,GameScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default : 'arcade',
        arcade:{
            gravity: {y:500},
            //debug: true
        }
    }
};
new Phaser.Game(config);