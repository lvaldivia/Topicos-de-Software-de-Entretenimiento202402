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
        this.initEnemy();
        this.loadLevel();
        this.physics.add.overlap(this.playerBullets,this.enemies,
            this.hitEnemy,null,this);
    }
    initEnemy(){
        this.enemies =  this.add.group({runChildUpdate:true});
        this.enemyBullets = this.add.group();
        /*let enemy = new Enemy(this,100,100,'greenEnemy',10,this.enemyBullets);
        enemy.body.setVelocity(100,50);
        this.enemies.add(enemy);*/
    }
    loadLevel(){
        this.currentIndexEnemy = 0;
        this.levelData = {
            "duration": 35,
            "enemies": 
            [
              {
                "time": 1,
                "x": 0.05,
                "health": 6,
                "speedX": 20, 
                "speedY": 50,
                "key": "greenEnemy",
                "scale": 3
              },
              {
                "time": 2,
                "x": 0.1,
                "health": 3,
                "speedX": 50, 
                "speedY": 50,
                "key": "greenEnemy",
                "scale": 1
              },
              {
                "time": 3,
                "x": 0.1,
                "health": 3,
                "speedX": 50, 
                "speedY": 50,
                "key": "greenEnemy",
                "scale": 1
              },
              {
                "time": 4,
                "x": 0.1,
                "health": 3,
                "speedX": 50, 
                "speedY": 50,
                "key": "greenEnemy",
                "scale": 1
              }]
            };
        this.scheduleNextEnemy();
    }
    scheduleNextEnemy(){
        let nextEnemy = this.levelData.enemies[this.currentIndexEnemy];
        if(nextEnemy){
            let nextTime = 1000 * (nextEnemy.time - 
                (this.currentIndexEnemy == 0) ? 0 : 
                    this.levelData.enemies[this.currentIndexEnemy].time );
            this.nextEnemyTimer = this.time.addEvent({
                delay: nextTime,
                callbackScope: this,
                callback:()=>{
                    this.createEnemy(nextEnemy.x * this.game.config.width,
                        -100, nextEnemy.health,nextEnemy.key,nextEnemy.scale,
                        nextEnemy.speedX,nextEnemy.speedY
                    );
                    this.currentIndexEnemy++;
                    this.scheduleNextEnemy();
                },
            });
        }
    }
    createEnemy(x,y,health,key,scale,speedX,speedY){
        let enemy = new Enemy(this,x,y,key,health,scale,
                                speedX,speedY,this.enemyBullets);
        this.enemies.add(enemy);
    }
    hitEnemy(bullet,enemy){
        bullet.destroy();
        enemy.getHit(1);
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