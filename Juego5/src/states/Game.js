import Phaser from "phaser"

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        console.log('init');
    }
    create(){
        console.log('create');
        this.background = 
        this.add.tileSprite(0,0,
            this.game.config.width,this.game.config.height,'space');
        this.background.setOrigin(0,0);

        this.player = this.physics.add.sprite(this.game.config.width/2,
                this.game.config.height/2,'player');
        this.player.setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
    }
    update(){
        this.background.tilePositionY +=0.5;
        this.player.body.setVelocityX(0);
        if(this.input.activePointer.isDown){
            this.targetX = this.input.activePointer.position.x;
            this.direction = this.targetX > this.game.config.width / 2 ? 1 : -1;
        }
    }
}
export default GameScene