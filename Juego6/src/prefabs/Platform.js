class Platform extends Phaser.Physics.Arcade.Group{
    constructor(scene,floorPool,numTiles,x,y,speed){
        super(scene.physics.world,scene);
        this.tileSize = 40;
        this.scene = scene;
        this.floorPool = floorPool;
        this.prepare(numTiles,x,y,speed);
        scene.add.existing(this);
    }
    prepare(numTiles,x,y,speed){
        let i = 0;
        while(i<numTiles){
            let floorTile = this.floorPool.getFirstDead();
            if(!floorTile){
                floorTile 
                = this.scene.physics.add.sprite(x+i*this.tileSize,
                        y,'floor');
                //this.scene.physics.add.existing(floorTile,true);
            }else{
                floorTile.setPosition(x+i*this.tileSize,y);
                floorTile.setActive(true);
                floorTile.setVisible(true);
                this.scene.physics.world.enable(floorTile);
            }
            this.add(floorTile);
            floorTile.body.setImmovable(true);
            floorTile.body.setAllowGravity(false);
            i++;
        }
        this.getChildren().forEach(tile=>{
            tile.body.velocity.x = speed;
        });
    }
}
export default Platform;