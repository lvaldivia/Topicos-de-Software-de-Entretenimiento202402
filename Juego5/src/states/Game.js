import Phaser from "phaser"
import PlayerBullet from "../prefabs/PlayerBullet";
import Enemy from "../prefabs/Enemy";

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        console.log('init');
        this.PLAYER_SPEED = 200;
        this.BULLET_SPEED = -400;
    }
    create(){
        this.background = 
        this.add.tileSprite(0,0,
            this.game.config.width,this.game.config.height,'space');
        this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(this.game.config.width/2,
                this.game.config.height/2,'player');
        this.player.setOrigin(0.5);
        this.player.setCollideWorldBounds(true);
        this.initBullets();
        this.shootingTimer = this.time.addEvent({
            delay:200,
            callback:this.createPlayerBullet,
            callbackScope : this,
            loop : true
        });
    }
    initBullets(){
        this.playerBullets = this.add.group();
    }
    createPlayerBullet(){
        let bullet = this.playerBullets.getFirstDead();
        if(!bullet){
            bullet = new PlayerBullet(this,this.player.x,this.player.y-20);
            this.playerBullets.add(bullet);
        }else
        {
            bullet.setPosition(this,this.player.x,this.player.y-20);
            bullet.setActive(true);
            bullet.setVisible(true);
        }
        bullet.body.velocity.y = this.BULLET_SPEED;
    }
    update(){
        this.background.tilePositionY +=0.5;
        this.player.body.setVelocityX(0);
        if(this.input.activePointer.isDown){
            this.targetX = this.input.activePointer.position.x;
            this.direction = this.targetX > this.game.config.width / 2 ? 1 : -1;
            this.player.body.setVelocityX(this.direction* this.PLAYER_SPEED);
        }
    }
}
export default GameScene