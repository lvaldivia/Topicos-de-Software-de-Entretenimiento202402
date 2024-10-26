import Phaser from "phaser"

class GameTitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameTitleScene' });
    }

    create() {
        let gameTitle = this.add.sprite(160, 160, 'gametitle');
        gameTitle.setOrigin(0.5, 0.5);  

        let playButton = this.add.sprite(160, 320, 'play').setInteractive();
        playButton.setOrigin(0.5, 0.5);

        playButton.on('pointerdown', () => {
            this.playTheGame();
        });
    }

    playTheGame() {
        this.scene.start('TheGameScene');
    }
}

export default GameTitleScene