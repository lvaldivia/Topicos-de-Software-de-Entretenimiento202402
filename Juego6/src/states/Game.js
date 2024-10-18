import Phaser from "phaser"
import Platform from "../prefabs/Platform";

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        this.floorPool = this.add.group();
        this.maxJumpDistance = 120;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.myCoins = 0;
        this.isJumping = false;
        this.jumpPeaked = false;
        this.startJumpY = 0;
        this.levelSpeed = 200;
    }
    create(){
        this.player = this.physics.add.sprite(50,140,'player');
        this.player.setOrigin(0.5);
        this.anims.create({
            key: 'running',
            frames:this.anims.generateFrameNames('player',{frames:[0,1,2,3,2,1]}),
            frameRate : 15,
            repeat: -1
        });
        this.player.anims.play('running');
        this.player.body.setSize(38,60);
        this.platform = new Platform(this,this.floorPool,15,0,200,-this.levelSpeed);
    }
    update(){
        this.physics.collide(this.player,this.platform);
        if(this.cursors.up.isDown){
            //this.player.setVelocityY(-400);
            this.playerJump();
        }else if(this.cursors.up.isUp){
            this.isJumping = false;
        }
        /*if(this.cursors.left.isDown){
            this.player.setVelocityX(-150);
        }else if(this.cursors.right.isDown){
            this.player.setVelocityX(150);
        }else{
            this.player.setVelocityX(0);
        }*/
    }
    playerJump(){
        if(this.player.body.touching.down){
            this.startJumpY = this.player.y;
            this.isJumping = true;
            this.jumpPeaked = false;
            this.player.body.velocity.y = -300;
        }else if(this.isJumping && !this.jumpPeaked){
            let distance = this.startJumpY - this.player.y;
            if(distance <= this.maxJumpDistance){
                this.player.body.velocity.y = -300;
            }else{
                this.jumpPeaked = true;
            }
        }
    }
}
export default GameScene