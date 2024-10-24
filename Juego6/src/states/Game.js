import Phaser from "phaser"
import Platform from "../prefabs/Platform";

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        this.floorPool = this.add.group();
        this.platformPool = this.add.group();
        this.coinsPool = this.add.group();
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
        //this.player.setCollideWorldBounds(true);
        this.currentPlatform = new Platform(this,this.floorPool,50,0,200,
                -this.levelSpeed,this.coinsPool);
        this.platformPool.add(this.currentPlatform);
        this.loadLevel();
    }
    update(){
        this.physics.collide(this.player,this.platformPool);
        if(this.cursors.up.isDown){
            //this.player.setVelocityY(-400);
            this.playerJump();
        }else if(this.cursors.up.isUp){
            this.isJumping = false;
        }
        if(this.currentPlatform.getLength() && 
            this.currentPlatform.getLast(true).getRightCenter().x < this.game.config.width ){
                this.createPlatfom();
        }
        this.platformPool.getChildren().forEach(platform=>{
            let last = platform.getLast(true);
            if(last && last.getBounds().right < 0){
                platform.kill();
            }
        });
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
    loadLevel(){
        /*this.levelData = {
            platforms: [
              { separation: 50, y: 200, numTiles: 4 },
              { separation: 50, y: 250, numTiles: 6 },
              { separation: 100, y: 200, numTiles: 3 },
              { separation: 50, y: 250, numTiles: 8 },
              { separation: 100, y: 200, numTiles: 10 },
              { separation: 100, y: 300, numTiles: 4 },
              { separation: 50, y: 200, numTiles: 4 }
            ]
          };
        this.currIndex = 0;*/
        this.createPlatfom();
    }
    generateRandomPlatform(){
        let data = {};
        let minSeparation = 60;
        let maxSeparation = 200;
        data.separation = 
            minSeparation + Math.random() * (maxSeparation - minSeparation);
        let minDifY = -120;
        let maxDifY = 120;
        let previousPlatformY = this.currentPlatform.getChildren()[0].y;
        data.y = previousPlatformY  
                + minDifY + Math.random() * (maxDifY- minDifY);
        
        data.y = Math.max(150,data.y);
        data.y = Math.min(this.game.config.height - 50,data.y);
        let minTiles = 1;
        let maxTiles = 5;
        data.numTiles = Math.floor(minTiles+Math.random() * (maxTiles - minTiles));
        return data;
    }
    createPlatfom(){
        let nextPlatformData = this.generateRandomPlatform();
        if(nextPlatformData){
            this.currentPlatform = this.platformPool.getFirstDead();
            if(!this.currentPlatform){
                this.currentPlatform = new Platform(this,
                    this.floorPool,nextPlatformData.numTiles,
                    this.game.config.width + nextPlatformData.separation,
                    nextPlatformData.y,
                    -this.levelSpeed,
                    this.coinsPool
                );
            }else{
                this.currentPlatform.prepare(
                    nextPlatformData.numTiles,
                    this.game.config.width + nextPlatformData.separation,
                    nextPlatformData.y,
                    -this.levelSpeed,
                    this.coinsPool
                );
            }
        }
        this.platformPool.add(this.currentPlatform);
    }
}
export default GameScene