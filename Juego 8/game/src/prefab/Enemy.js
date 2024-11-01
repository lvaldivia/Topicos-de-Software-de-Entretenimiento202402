class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,velocity,tilemap){
        super(scene,x,y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.tilemap = tilemap;
        this.setOrigin(0.5,0.5);
        this.body.setCollideWorldBounds(true);
        this.body.bounce.set(1,0);
        this.body.velocity.x = 2;
    }
    update(){
        let direccion;
        if(this.body.velocity.x > 0){
            this.setFlipX(true);
            direccion = 1;
        }else{
            this.setFlipX(false);
            direccion = -1;
        }
        let nextX = this.x +direccion * (Math.abs(this.width)/2+1);
        let nextY = this.y +(this.height/2)+1;
        let nextTile = this.tilemap.getTileAtWorldXY(nextX,nextY,true,
                this.scene.cameras.main,'collisionLayer');
        if(!nextTile && this.body.blocked.down){
            this.body.velocity.x *= -1;
        }
    }
}
export default Enemy