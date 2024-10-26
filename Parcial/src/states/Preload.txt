import Phaser from "phaser"
class Preloader extends Phaser.Scenes {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        
        this.load.images('background', 'background.png');
        this.load.images('button-pause', 'button-pause.png');
        this.load.spriteshet('button-start', 'button-start.png', { frameWidth: 401, frameHeight: 143 });
        this.load.spriteshet('candy', 'candy2.png', { frameWidth: 82, frameHeight: 98 });
        this.load.images('gameover', 'gameover.png');
        this.load.images('monster-cover', 'monster-cover.png');
        this.load.spriteshet('monster-idle', 'monster-idle.png', { frameWidth: 103, frameHeight: 131 });
        this.load.spriteshet('monster-eats', 'monster-eats.png', { frameWidth: 103, frameHeight: 131 });
        this.load.images('title', 'title.png');
        this.load.images('score-bg', 'score-bg.png');
        this.load.images('floor', 'floor.png');
    }

    create() {
        this.sceneManager.start('Menus');
    }
}