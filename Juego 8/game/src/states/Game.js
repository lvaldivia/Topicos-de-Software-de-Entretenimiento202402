import Phaser from "phaser"
import Enemy from '../prefab/Enemy'
class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 500;
        this.BOUNCIG_SPEED = 150;
        this.score = 0;
        this.dead = 0;
    }
    create(){
        this.loadLevel();
        this.initPlayer();
        this.initEnemy();
    }
    loadLevel(){
        this.map = this.make.tilemap({key:'demo'});
        this.tileset = this.map
                .addTilesetImage('tiles_spritesheet','tiles');
        
        this.collisionLayer = this.map.createLayer('collisionLayer',this.tileset);
        this.backgroundLayer = this.map.createLayer('backgroundLayer',this.tileset);
        this.physics.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.backgroundLayer.setDepth(-1);
        this.collisionLayer.setCollisionBetween(1,156);
    }
    initEnemy(){
        this.enemies = this.add.group({runChildUpdate:true});
        const enemyData = this.findObjectsByType('enemy',this.map,'objectsLayer');
        let enemy;
        enemyData.forEach((element=>{
            enemy = new Enemy(this,element.x,element.y,'slime',
                    element.properties.velocity,this.map);
            this.enemies.add(enemy);

        }));
        this.physics.add.collider(this.enemies,this.collisionLayer);
        this.physics.add.collider(this.player,this.enemies,
                this.hitEnemy,null,this);
    }
    hitEnemy(player,enemy){
        if(enemy.body.touching.up){
            enemy.destroy();
            player.setVelocityY(-this.BOUNCIG_SPEED);
            this.score++;
        }
    }
    initPlayer(){
        const playerData = this.findObjectsByType('player',this.map,'objectsLayer');
        this.player = this.physics.add.sprite(playerData[0].x,playerData[0].y,'player');
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 1] }),
            frameRate: 6,
            repeat: -1

        });
        this.physics.add.collider(this.player,this.collisionLayer);
        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update(){
        /*this.enemies.children.iterate((enemy=>{
            if(enemy){
                ene
            }
        }));*/
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            this.player.play('walking',true);
            this.player.setFlipX(false);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            this.player.setFlipX(true);
            this.player.anims.play('walking',true);
        }else{
            this.player.anims.stop();
        }
        if(this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-this.JUMPING_SPEED);
        }
    }

    findObjectsByType(targetType,tilemap,layer){
        let result = [];
        let objectsLayer = tilemap.getObjectLayer(layer);
        if(objectsLayer){
            objectsLayer.objects.forEach(element=>{
                if(element.properties.type == targetType){
                    result.push(element);
                }
            })
        }
        return result;
    }
        
}
export default GameScene