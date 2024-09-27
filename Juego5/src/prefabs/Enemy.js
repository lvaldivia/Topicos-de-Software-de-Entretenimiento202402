class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,health){
        super(scene,x,y,key);
        scene.add.existing(true);
        scene.physics.add.existing(true);
        this.setOrigin(0.5);
        this.health = health;
        this.anims.create({
            key: 'getHit',
            frames: this.anims.generateFrameNames(key,{start:0,end:2}),
            frameRate: 25,
            repeat:0
        });
    }
    getHit(){
        this.play('getHit');
    }
    destroyEnemy(){
        this.destroy();
    }
}
export default Enemy;