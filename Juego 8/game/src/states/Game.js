import Phaser from "phaser"

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        
    }
    create(){
        this.loadLevel();
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

        const playerData = this.findObjectsByType('player',this.map,'objectsLayer');
        this.player = this.physics.add.sprite(playerData[0].x,playerData[0].y,'player');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player,this.collisionLayer);
        this.cameras.main.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
        
    }
    update(){
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
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