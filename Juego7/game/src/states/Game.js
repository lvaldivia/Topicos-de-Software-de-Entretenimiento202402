import Phaser from "phaser"

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    init(){
        
    }
    create(){
        this.map = this.make.tilemap({key:'map'});
        console.log(this.map);
        this.tileset = this.map.addTilesetImage('plataformero','tiles');
        this.platforms = this.map.createLayer('Platforms', this.tileset, 0,200);
        this.platforms.setCollisionByExclusion(-1,true);
        this.spikes = this.physics.add.group({
            allowGravity : false,
            immovable : true
        });
        this.map.getObjectLayer("Spikes").objects.forEach((spike)=>{
            this.spikes.create(
                spike.x,spike.y + 200 - spike.height,'spike').setOrigin(0);
        });
        this.player = this.physics.add.sprite(50,300,'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player,this.platforms);
    }
    update(){

    }
}
export default GameScene