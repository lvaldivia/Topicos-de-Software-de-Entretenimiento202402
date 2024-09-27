import PreloadScene from "./states/Preload";
import GameScene from "./states/Game";

let config = {
    width: window.innerWidth /*100%*/,
    height: window.innerHeight,
    scene: [PreloadScene,GameScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics:{
        default : 'arcade'
    }
};
new Phaser.Game(config);