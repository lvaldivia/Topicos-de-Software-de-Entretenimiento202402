class Platform extends Phaser.Physics.Arcade.Group{
    constructor(scene,floorPool,numTiles,x,y,speed,coinsPool){
        super(scene.physics.world,scene);
        this.tileSize = 40;
        this.scene = scene;
        this.coinsPool = coinsPool;
        console.log(this.coinsPool);
        this.floorPool = floorPool;
        this.prepare(numTiles,x,y,speed);
        scene.add.existing(this);
    }
    prepare(numTiles,x,y,speed){
        this.alive = true;
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
        this.addCoins(speed);
    }
    kill(){
        this.alive = false;
        this.getChildren().forEach(tile=>{
            tile.setActive(false);
            tile.setVisible(false);
            this.floorPool.add(tile);
        });
    }
    addCoins(speed){
        let coinsY = 90 + Math.random() * 110;
        this.getChildren().forEach(tile=>{
            if(Math.random()<=0.4){ 
                let coin = this.coinsPool.getFirstDead();
                if(!coin){
                    coin 
                    = this.scene.physics.add.sprite(tile.x,tile.y - coinsY,'coin');
                }else{
                    coin.setPosition(tile.x,tile.y-coinsY);
                    coin.setActive(true);
                    coin.setVisible(true);
                }
                coin.body.velocity.x = speed;
                coin.body.setAllowGravity(false);
            }
        });
        
    }
}
export default Platform;