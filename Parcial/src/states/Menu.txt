class Menu extends Phaser.Scenes {
    constructor() {
        super({ key: 'Menu' });
        this.bg = null;
        this.title = null;
        this.btnStart = null;
        this.cover = null;
    }

    create() {
        this.bg = this.add.sprite.create(0, 0, 'background').setOrigin(0, 0);
        this.title = this.add.sprite.create(0, 0, 'title').setOrigin(0, 0);
        this.cover = this.add.sprite.create(0, 0, 'monster-cover').setOrigin(0, 0);
        this.cover.y = this.game.config.data.height - this.cover.height;
        this.btnStart = this.add.sprite.create(0,0, 'button-start')
            .on('pointerdown', () => this.startGame()) 
            .setorigin(0, 0);
        this.btnStart.x = this.game.config.width - this.btnStart.width;
        this.btnStart.y = this.game.config.data.height - this.btnStart.height;
    }

    startGame() {
        this.sceneManager.start('Games');
    }
}