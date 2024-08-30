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
        this.createPlatform(this.levelData.platformData);
        this.createPlayer(this.levelData.playerStart);
        this.createMovement();
        //console.log(this.levelData);
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
    createPlayer(playerStart){
        //this.player = this.add.sprite(playerStart.x,playerStart.y,"player");
        this.player = this.physics.add.sprite(playerStart.x,playerStart.y,"player");
        //this.player.setOrigin(0,0);
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }
    createMovement(){
        this.cursor = this.input.keyboard.createCursorKeys();
    }
    update(){
        this.physics.add.collider(this.player,this.ground);
        this.physics.add.collider(this.player,this.platforms);
        if(this.player.body.touching.down && this.cursor.up.isDown){
            this.player.setVelocityY(-700);
        }
        if(this.cursor.left.isDown){
            this.player.setVelocityX(-150);
            this.player.scaleX = 1;
            //console.log('presione izquierda');
        }
        else if(this.cursor.right.isDown){
            this.player.scaleX = -1;
            this.player.setVelocityX(150);
            //console.log('presione derecha');
        }else{
            this.player.setVelocityX(0);
        }
    }
}
export default GameScene