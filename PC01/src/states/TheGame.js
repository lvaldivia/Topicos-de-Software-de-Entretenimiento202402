import Phaser from "phaser"

class TheGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TheGameScene' });
    }

    create() {
        this.spriteNumber = null;
        this.number = 0;
        this.workingButtons = true;
        this.higher = true;
        this.score = 0;
        this.number = Math.floor(Math.random() * 10);
        this.spriteNumber = this.add.sprite(160, 240, 'numbers');
        this.spriteNumber.setOrigin(0.5, 0.5);
        this.spriteNumber.setFrame(this.number);

        let higherButton = this.add.sprite(160, 100, 'higher').setInteractive();
        higherButton.setOrigin(0.5, 0.5);
        higherButton.on('pointerdown', () => this.clickedHigher());

        let lowerButton = this.add.sprite(160, 380, 'lower').setInteractive();
        lowerButton.setOrigin(0.5, 0.5);
        lowerButton.on('pointerdown', () => this.clickedLower());
    }

    clickedHigher() {
        this.higher = true;
        this.tweenNumber(true);
    }

    clickedLower() {
        this.higher = false;
        this.tweenNumber(false);
    }

    tweenNumber(higher) {
        if (this.workingButtons) {
            this.workingButtons = false;
            this.tweens.add({
                targets: this.spriteNumber,
                x: 420,
                duration: 500,
                onComplete: () => this.exitNumber()
            });
        }
    }

    exitNumber() {
        this.spriteNumber.x = -180;
        this.spriteNumber.setFrame(Math.floor(Math.random() * 10));

        this.tweens.add({
            targets: this.spriteNumber,
            x: 160,
            duration: 500,
            onComplete: () => this.enterNumber()
        });
    }

    enterNumber() {
        this.workingButtons = true;
    }
}
export default TheGameScene