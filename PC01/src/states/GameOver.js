import Phaser from "phaser"

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        let gameOverTitle = this.add.sprite(160, 160, 'gameover');
        gameOverTitle.setOrigin(0.5, 0.5); 
        let playButton = this.add.sprite(160, 320, 'play').setInteractive();
        playButton.setOrigin(0.5, 0.5);
        playButton.on('pointerdown', () => this.playTheGame());
    }

    playTheGame() {
        this.scene.start('TheGameScene');
    }
}

export default GameOverScene