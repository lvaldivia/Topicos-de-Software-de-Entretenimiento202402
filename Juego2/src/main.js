import Phaser from "phaser";
import PreloaderScene from "./states/PreloaderScene";
import MenuScene from "./states/MenuScene";
import GameScene from "./states/GameScene";

let config = {
    width: 360,
    height: 460,
    scene : [PreloaderScene,MenuScene,GameScene]
};
new Phaser.Game(config);