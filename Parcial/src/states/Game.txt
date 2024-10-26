class Game extends Phaser.Scenes {
    constructor() {
        super({ key: 'Game' });
        this.bg = null;
        this.floor = null;
        this.monster = null;
        this.candyGroup = null;
        this.textScore = null;
        this.fontStyle = null;
    }

    create() {
        this.physics.world.gravity.y = 200;

        this.bg = this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        this.floor = this.add.sprite(0, 0, 'floor').setOrigin(0, 0);
        this.floor.y = this.game.config.height - this.floor.height;

        this.monster = this.add.sprite(0, this.floor.y - 50, 'monster-idle');
        this.candyGroup = this.physics.add.group();

        this.fontStyle = { font: '40px Arial', fill: '#FFCC00', stroke: '#333', strokeThickness: 5 };
        this.textScore = this.add.text(0, 0, '0', this.fontStyle);
    }

    update(time, delta) {
        this.timeCreated += delta;
        if (this.timeCreated > 1000) {
            this.timeCreated = 0;

            let candy = this.physics.add.sprite(
                Phaser.Math.Between(82 / 2, this.game.config.width - (82 / 2)), 
                0, 
                'candy'
            );
            candy.setFrame(Phaser.Math.Between(0, 4));
            candy.setOrigin(0.5, 0.5);
            candy.rotateMe = (Math.random() * 4) - 2;
            this.candyGroup.add(candy);
            candy.on('pointersdown', () => this.destroy(candy));
        }

        this.candyGroup.getChildren().forEach((candy) => {
            candy.angle += candy.rotateMe;
        });
    }

    destroy(candy) {
        this.score++;
        this.textScore.setText(this.score);
        candy.destroy();
    }
}
