class PlayerBullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'bullet');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);
        //this.setCollideWorldBounds(true);
        //this.body.onWorldBounds = true;
        /*this.body.world.on('worldbounds',()=>{
            this.setActive(false);
            this.setVisible(false);
        });*/
    }
    update(){
        if(this.y<0){
            this.setActive(false);
            this.setVisible(false);
            this.body.stop();
        }
    }
}

export default PlayerBullet;