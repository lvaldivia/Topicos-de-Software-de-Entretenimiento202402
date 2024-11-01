class Goal extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,data){
        super(scene,x,y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5,0.5);
        this.nextLevel = data.properties.nextLevel;
    }
}
export default Goal