import PreloadScene from "./states/Preload";
import GameTitleScene from "./states/GameTitle";
import TheGameScene from "./states/TheGame";
import GameOverScene from "./states/GameOver";

let config = {
    width: 320,
    height: 480,
    scene: [PreloadScene,GameTitleScene,TheGameScene,GameOverScene],
    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};
new Phaser.Game(config);