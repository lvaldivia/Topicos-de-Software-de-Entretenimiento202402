import Phaser from "phaser"

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    create(){
        this.background = this.add.tileSprite(0,0,
            this.game.config.width,this.game.config.height,'bakground');
        this.background.setOrigin(0,0);
        this.player = this.physics.add.sprite(0,0,'player');
        this.jumpForce = -400;
        this.player.x = this.game.config.width *0.5;
        this.player.y = this.game.config.height *0.5;
        this.walls = this.add.group();
        this.spawnWall = 0;
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('player',{start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
        //this.player.play('fly');
        this.player.setFrame(1);
        this.spaceBar = 
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down',this.jump,this);
        this.input.on('pointerdown',this.jump,this);
        this.score = 0;
        this.scoreText = this.add.text(0,0,'Score: '+this.score,{
            font: '64px Arial',
            fill: '#FFFFFF'
        });
        this.scoreText.setDepth(9999);
        if(localStorage.hasOwnProperty('score')){
            this.maxScoreText = this.add.text(0,0,'Max Score: '+localStorage.score,{
                font: '64px Arial',
                fill: '#FFFFFF'
            });
            this.maxScoreText.x = this.game.config.width - this.maxScoreText.width;
            this.maxScoreText.setDepth(9999);
        }

        this.physics.add.collider(this.player,this.walls,
                this.hitWall,null,this);
    }
    hitWall(object1,object2){
        //object1.setActive(false);
        //object1.setVisible(false);
        object1.disableBody(true,true);
        if(this.score > 0){
            localStorage.score = this.score;
        }
        this.gameOverText = this.add.text(0,0,'Game Over, click to continue',{
            font: '64px Arial',
            fill: '#FFFFFF'
        });
        this.gameOverText.setOrigin(0.5,0.5);
        this.gameOverText.x = this.game.config.width / 2;
        this.gameOverText.y = this.game.config.height / 2;
        this.gameOverText.setInteractive();
        this.gameOverText.on('pointerdown',function(){
            this.scene.start('GameScene');
        },this);
        this.walls.children.iterate(function(wall){
            if(wall.active){
                wall.disableBody(true,true);
            }
        });
    }
    jump(){
        this.player.setVelocityY(this.jumpForce);
    }
    update(time,delta){
        if(!this.player.active && !this.player.visible){
            return;
        }
        this.background.tilePositionX -= 1;
        this.spawnWall+=delta;
        if(this.player.body.velocity.y > -20){
            this.player.setFrame(3);
        }else{
            this.player.play('fly');
        }
        if(this.spawnWall> 3000){
            this.spawnWall = 0;
            this.createWall();
        }
        this.walls.children.iterate(function(wall){
            if(wall.active){
                if(this.player.x>=wall.x){
                    if(!wall.scored){
                        wall.scored = true;
                        this.score+=0.5;
                        this.scoreText.text = 'Score: '+this.score;
                        
                    }
                }
                else if(wall.x + wall.width < 0){
                    wall.disableBody(true,true);
                }
            }
        },this)
    }
    createWall(){
        let wallY = Phaser.Math.Between(this.game.config.height * 0.3,
            this.game.config.height*0.7
        );
        this.generateWall(wallY);
        this.generateWall(wallY,true);
    }
    generateWall(wallY,flipped){
        let opening = 200;
        if(flipped){
            wallY = wallY  - (opening/2);
        }else{
            wallY = wallY  + (opening/2);
        }
        let wall = this.walls.getFirstDead();
        if(wall){
            wall.scored = false;
            wall.setPosition(this.game.config.width,wallY);
            wall.setActive(true);
            wall.setVisible(true);
            wall.body.enable = true;
        }else{
            wall = this.physics.add.sprite(this.game.config.width,wallY,'wall');
            wall.setOrigin(0,0);
            this.walls.add(wall);
        }
        wall.body.setVelocityX(-200);
        wall.body.allowGravity = false;
        wall.body.setImmovable(true);
        if(flipped){
            wall.scaleY = -1;
            wall.body.setOffset(0,wall.height);
        }else{
            wall.scaleY = 1;
            wall.body.setOffset(0,0);
        }
    }
}
export default GameScene