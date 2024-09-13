import Phaser from "phaser"
class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    create(){
        this.levelData = JSON.parse(this.cache.text.get("level"));
        //console.log(this.cache.text.get("level"));
        this.platforms = this.physics.add.group({
            allowGravity: false,
            immovable : true
        });
        this.fires = this.physics.add.group();
        this.barrils = this.add.group();
        this.createPlatform(this.levelData.platformData);
        this.createPlayer(this.levelData.playerStart);
        this.createFire(this.levelData.fireData);
        this.createGorilla();
        this.createMovement();
        this.barrelFrequency = this.levelData.barrelFrequency * 1000;
        this.barrelSpeed = this.levelData.barrelSpeed;
        this.elapsed = 0;
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.platforms);
        this.physics.add.collider(this.gorilla,this.platforms);
        this.physics.add.collider(this.fires,this.platforms);
        this.physics.add.collider(this.barrils,this.platforms);
        //this.physics.add.collider(this.barrils,this.ground);
        this.createButtons();
    }
    createButtons(){
        this.playerLeft = false;
        this.playerRight = false;
        this.playerJump = false;
        this.actionButton = this.add.sprite(0,0,'actionButton');
        this.actionButton.setInteractive();
        this.actionButton.x = this.game.config.width - this.actionButton.width;
        this.actionButton.y = this.game.config.height - this.actionButton.height;
        this.actionButton.on("pointerdown",this.jump,this);
        this.actionButton.on("pointerup",this.cancelJump,this);

        this.leftButton = this.add.sprite(0,0,'arrowButton');
        this.leftButton.x = this.leftButton.width;
        this.leftButton.setInteractive();
        this.leftButton.y = this.game.config.height - this.leftButton.height;
        this.leftButton.on("pointerdown",this.moveLeft,this);
        this.leftButton.on("pointerup",this.cancelMoveLeft,this);

        this.rightButton = this.add.sprite(0,0,'arrowButton');
        this.rightButton.setInteractive();
        this.rightButton.x = this.leftButton.x  + this.leftButton.width + 25;
        this.rightButton.y = this.game.config.height - this.rightButton.height;
        this.rightButton.on("pointerdown",this.moveRight,this);
        this.rightButton.on("pointerup",this.cancelMoveRight,this);
    }
    cancelMoveRight(){
        this.playerRight = false;
    }
    cancelMoveLeft(){
        this.playerLeft = false;
    }
    cancelJump(){
        this.playerJump = false;
    }
    jump(){
        this.playerJump = true;
    }
    moveLeft(){
        this.playerLeft = true;
    }
    moveRight(){
        this.playerRight = true;
    }
    createPlatform(data){
        data.forEach(element => {
            //primera forma
            /*let platform = this.add.sprite(element.x,element.y,"platform");
            this.platforms.add(platform);*/
            //segunda forma
            this.platforms.create(element.x,element.y,"platform");
        });
        this.platforms.children.iterate(function(platform){
            //platform.body.allowGravity = false;
            platform.setOrigin(0,0);
            // platform.body.immovable = true;
        });
        this.ground = this.physics.add.sprite(0,0,"ground");
        this.ground.setOrigin(0,0);
        this.ground.y = this.game.config.height - this.ground.height;
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;
    }
    createGorilla() {
        this.gorilla = this.physics.add.sprite(0,0,"gorilla");
        this.gorilla.setOrigin(0,0);
    }
    createFire(data) {
        data.forEach(element => {
            this.fires.create(element.x,element.y,"fire");
        });
        this.fires.children.iterate(function(platform){
            platform.setOrigin(0,0);
        });
    }
    createPlayer(playerStart){
        this.player = this.physics.add.sprite(playerStart.x,playerStart.y,"player");
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key : 'run',
            frames: this.anims.generateFrameNumbers('player',{start:0,end:1}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: [{key: 'player',frame:2}],
            frameRate : 1,
            repeat: 0
        });
        this.anims.create({
            key: 'idle',
            frames:[{key:'player',frame:3}],
            frameRate: 1,
            repeat: 0
        });
    }
    createMovement(){
        this.cursor = this.input.keyboard.createCursorKeys();
    }
    createBarril(){
        let barrel = this.barrils.getFirstDead();
        if(!barrel){
            console.log('crea nuevo');
            barrel = this.physics.add.sprite(this.levelData.goal.x,this.levelData.goal.y,'barrel');
            this.barrils.add(barrel);
        }else{
            console.log('reutiliza');
            barrel.setActive(true);
            barrel.setVisible(true);
            barrel.body.enable = true;
            barrel.setPosition(this.levelData.goal.x,this.levelData.goal.y);
        }
        barrel.setCollideWorldBounds(true);
        barrel.body.bounce.setTo(1,0.5);
        barrel.body.setVelocityX(this.barrelSpeed);
    }
    update(time,delta){
        this.elapsed +=delta;
        if(this.elapsed>= this.barrelFrequency){
            this.elapsed = 0;
            this.createBarril();
        }
        this.barrils.children.iterate(function(barrel){
            if(barrel.y > 600){
                /*barrel.setActive(false);
                barrel.setVisible(false);*/
                barrel.disableBody(true,true); /*= muerto */
            }
        });
        if(this.player.body.touching.down 
            && (this.cursor.up.isDown || this.playerJump)){
            this.player.setVelocityY(-700);
            this.player.play("jump");
        }
        if(this.cursor.left.isDown || this.playerLeft){
            this.player.setVelocityX(-150);
            this.player.scaleX = 1;
            this.player.body.setOffset(0,0);
            this.player.play("run");
        }
        else if(this.cursor.right.isDown || this.playerRight){
            this.player.scaleX = -1;
            this.player.setVelocityX(150);
            this.player.body.setOffset(this.player.width,0);
            this.player.play("run");
        }else{
            this.player.setVelocityX(0);
            this.player.play("idle");
        }
    }   
}
export default GameScene