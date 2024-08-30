import Phaser from "phaser";

class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene");
    }
    create(){
        this.background = this.add.sprite(0,0,'background');
        this.background.setOrigin(0,0);
        this.keys = ['apple','candy','rotate','rubber_duck'];
       /* for (let index = 0; index < this.keys.length; index++) {
            let sprite = this.add.sprite(0,0,this.keys[index]);
            sprite.x = (index*sprite.width*2);
            sprite.setOrigin(0,0);
            sprite.y = this.game.config.height-(sprite.height*1.5); 
        }*/
       this.keys.forEach((element,index)=>{
        let sprite = this.add.sprite(0,0,element);
        sprite.x = (index*sprite.width*2);
        sprite.setOrigin(0,0);
        sprite.y = this.game.config.height-(sprite.height*1.5); 
        sprite.setInteractive();
        this.current_key = "";
        sprite.on('pointerdown',function(){
            this.clickElement(sprite.texture.key);
        },this);
       });
       this.character = this.add.sprite(0,0, "pet");
       this.character.x = this.game.config.width*0.5;
       this.character.y = this.game.config.height*0.5;
       this.anims.create({
            key:'animation',
            frames: this.anims.generateFrameNumbers(
                this.character,
                {frames:[0,1,2,1,0]}

            ),
            frameRate: 3,
            repeat: 1

       });
       this.background.setInteractive();
       this.background.on("pointerdown",this.cloneElement,this);
    }
    cloneElement(event){
        if(this.current_key != ""){
            let clone = this.add.sprite(0,0,this.current_key);
            clone.setOrigin(0,0);
            clone.x = event.downX;
            clone.y = event.downY;
        }
    }
    clickElement(key){
        this.current_key = key;
    }
    
}
export default GameScene;