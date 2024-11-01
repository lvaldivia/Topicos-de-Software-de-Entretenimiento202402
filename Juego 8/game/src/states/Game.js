import Phaser from "phaser"
import Enemy from '../prefab/Enemy'
import Goal from "../prefab/Goal";
class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(data){
        this.level = 1;
        if(data){
            this.level = data.level || 1;
        }
        if(this.level == 4){
            this.level = 1;
        }
        switch(this.level){
            case 1:
                this.mapName = 'demo';
                break;
            case 2:
                this.mapName = 'level1';
                break;
            default:
                this.mapName = 'level2';
                break;
        }
        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 500;
        this.BOUNCIG_SPEED = 150;
        this.score = 0;
        this.dead = 0;
        this.originalX = 0;
        this.originalY = 0;
    }
    create(){
        this.loadLevel();
        this.initPlayer();
        this.initEnemy();
        this.initGoal();
    }
    loadLevel(){
        this.map = this.make.tilemap({key:this.mapName});
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
        this.enemyCollider = this.physics.add.collider(this.player,this.enemies,
                this.hitEnemy,null,this);
    }
    initPlayer(){
        const playerData = this.findObjectsByType('player',this.map,'objectsLayer');
        this.player = this.physics.add.sprite(playerData[0].x,playerData[0].y,'player');
        this.player.setCollideWorldBounds(true);
        this.originalX = this.player.x;
        this.originalY = this.player.y;
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
    initGoal(){
        let goalData = this.findObjectsByType('goal',this.map,
                'objectsLayer');
        console.log(goalData);
        this.goals = this.add.group();
        let goal;
        goalData.forEach((element=>{
            goal = new Goal(this,element.x,element.y,'goal',element);
            this.goals.add(goal);
        }));
        this.physics.add.collider(this.goals,this.collisionLayer);
        this.physics.add.collider(this.player,this.goals,
                this.hitGoal,null,this);
    }
    update(){
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
    hitGoal(player,goal){
        this.level++;
        this.scene.start('GameScene',{
            'level':this.level
        });
    }
    hitEnemy(player,enemy){
        if(enemy.body.touching.up){
            enemy.destroy();
            player.setVelocityY(-this.BOUNCIG_SPEED);
            this.score++;
        }else{
            /*this.player.x = this.originalX;
            this.player.y = this.originalY;*/
            this.startBlink();
        }
    }
    startBlink(){
        this.enemyCollider.active = false;
        this.tweens.add({
            targets:this.player,
            alpha: 0,
            duration:100,
            repeat:10,
            yoyo:true
        });
        this.time.delayedCall(1100,()=>{
            this.player.alpha = 1;
            this.enemyCollider.active = true;
        });
    }
        
}
export default GameScene