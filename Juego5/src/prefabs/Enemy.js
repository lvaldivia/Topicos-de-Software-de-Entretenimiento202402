import EnemyBullet from "./EnemyBullet";

class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,key,health,enemyBullets){
        super(scene,x,y,key);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.enemyBullets = enemyBullets;
        this.setOrigin(0.5);
        this.health = health;
        this.anims.create({
            key: 'getHit',
            frames: this.anims.generateFrameNames(key,{start:0,end:2}),
            frameRate: 25,
            repeat:0
        });
        this.startShooting();
    }
    startShooting(){
        this.shoot();
        this.shootingTimer = this.scene.time.addEvent({
            delay:2000,
            callbackScope: this,
            callback:this.shoot,
            loop : true
        });
    }
    shoot(){
        let bullet = new EnemyBullet(this.scene,this.x,this.y);
        this.enemyBullets.add(bullet);
        bullet.body.setVelocityY(100);
    }
    update(){
        if(this.x < 0.05 * this.scene.game.config.width){
            this.x = 0.05 * this.scene.game.config.width + 2;
            this.body.velocity.x *=-1;
        }else if(this.x > 0.95 * this.scene.game.config.width){
            this.x = 0.95 * this.scene.game.config.width - 2;
            this.body.velocity.x *=-1;
        }
    }
    getHit(damage){
        this.play('getHit');
        this.health-=damage;
        if(this.health<=0){
            this.createExplosion();
            this.destroyEnemy();
            this.shootingTimer.remove();
        }
    }
    createExplosion(){
        let particles = this.scene.add.particles(
            0,0,'enemyParticle',{
                x: this.x,
                y: this.y,
                speed:{min: -100,max:100},
                gravityY: 0,
                quantity: 100,
                frameRate : 2,
                duration: 500
            }
        );
    }
    destroyEnemy(){
        this.destroy();
    }
}
export default Enemy;