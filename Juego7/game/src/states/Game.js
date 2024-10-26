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
        this.anims.create({
            key: 'walk',
            frames:this.anims.generateFrameNames('player',{
                prefix: 'robo_player_',
                start: 2,
                end: 3
            }),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames:this.anims.generateFrameNames('player',{
                prefix: 'robo_player_',
                start: 0,
                end: 0
            }),
            frameRate : 10,
        });
        this.anims.create({
            key: 'jump',
            frames:this.anims.generateFrameNames('player',{
                prefix: 'robo_player_',
                start: 1,
                end: 1
            }),
            frameRate : 10,
        });
        this.cursors = this.input.keyboard.createCursorKeys();
       /* this.physics.add.collider(this.player,this.spikes,this.playerHit,
            null,this
        );*/
        /*this.tweens.add({
            targets: this.player,
            y: 0,
            duration : 10000,
            repeat:5,*/
            /*Ease-in Comienza lento acelera al final*/
            /*Ease-in Comienza rapido desacelera al final*/
            /*Ease-In-Out Comienza lento acelera al medio termina lento*/
            /*Bounce Rebota al fina del tween*/
            /*Elastic Rebota al fina del tween*/
            //ease: 'Elastic'
        //});
    }
    update(){
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-200);
            if(this.player.body.onFloor()){
                this.player.play('walk',true);
            }
        }
        else if(this.cursors.right.isDown){
            this.player.setVelocityX(200);
            if(this.player.body.onFloor()){
                this.player.play('walk',true);
            }
        }else{
            this.player.setVelocityX(0);
            if(this.player.body.onFloor()){
                this.player.play('idle',true);
            }
        }

        if((this.cursors.space.isDown || this.cursors.up.isDown) 
            && this.player.body.onFloor()
        ){
            this.player.setVelocityY(-350);
            this.player.play('jump',true);
        }
        if(this.player.body.velocity.x > 0){
            this.player.setFlipX(false);
        } else if(this.player.body.velocity.x < 0) {
            this.player.setFlipX(true);
        }
    }
    playerHit(player,spike){
        this.player.setVelocity(0,0);
        this.player.setX(50);
        this.player.setY(300);
        this.player.play('idle',true);
        this.player.setAlpha(0);
        this.tweens.add({
            targets: this.player,
            alpha: 1,
            duration : 100,
            repeat:5
        });
    }
}
export default GameScene