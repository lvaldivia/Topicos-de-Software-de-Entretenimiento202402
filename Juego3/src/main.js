import PreloaderScene from "./states/Preloader";
import GameScene from "./states/Game";

let config = {
    width: 360,
    height: 700,
    scene: [PreloaderScene,GameScene],
    physics:{
        default : 'arcade',
        arcade:{
            gravity: {y:1000},
            debug: true
        }
    }
};
new Phaser.Game(config);