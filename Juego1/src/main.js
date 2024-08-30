import 'phaser'

class PlayGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    preload(){
        this.load.image('arrow',"assets/images/arrow.png");
        this.load.image('background',"assets/images/background.png");
        this.load.spritesheet("chicken",
            "assets/images/chicken_spritesheet.png",{
                frameWidth : 131,
                frameHeight: 200
            });
        this.load.spritesheet("horse",
            "assets/images/horse_spritesheet.png",{
                frameWidth : 212,
                frameHeight: 200
            });
        this.load.spritesheet("pig",
            "assets/images/pig_spritesheet.png",{
                frameWidth : 297,
                frameHeight: 200
            });
        this.load.spritesheet("sheep",
            "assets/images/sheep_spritesheet.png",{
                frameWidth : 244,
                frameHeight: 200
            });
        this.load.audio("chicken_sound","assets/audio/chicken.mp3");
        this.load.audio("horse_sound","assets/audio/horse.mp3");
        this.load.audio("pig_sound","assets/audio/pig.mp3");
        this.load.audio("sheep_sound","assets/audio/sheep.mp3");
    }
    create(){
        this.animals = ['chicken','horse','pig','sheep'];
        this.index = 0;
        this.clickStart = false;
        this.background = this.add.image(0,0,'background');
        this.background.setOrigin(0,0);
        this.rightArrow = this.add.sprite(0,0,'arrow');
        this.rightArrow.x = this.game.config.width 
                            - (this.rightArrow.width*0.5);
        this.rightArrow.y = this.game.config.height*0.5;
        this.leftArrow = this.add.sprite(0,0,'arrow');
        this.leftArrow.x = (this.rightArrow.width*0.5);
        this.leftArrow.y = this.game.config.height*0.5;
        this.leftArrow.setScale(-1);
        this.leftArrow.setInteractive();
        this.rightArrow.setInteractive();
        this.leftArrow.on("pointerdown",function(pointer){
            this.moveArrow('left');
        },this);
        this.rightArrow.on("pointerdown",function(pointer){
            this.moveArrow('right');
        },this);
        this.current_animal = this.add.sprite(0,0,this.animals[this.index]);
        this.current_animal.x = this.game.config.width*0.5;
        this.current_animal.y = this.game.config.height*0.5;
        this.anims.create({
            key:'animation',
            frames: this.anims.generateFrameNumbers(
                this.animals[this.index],
                {frames:[0,1,2,1,0]}
            ),
            frameRate: 3,
            repeat: 1
        });
        this.current_animal.play('animation');
    }
    moveArrow(direction){
        if(this.clickStart){
            return;
        }
        this.clickStart = true;
        if(direction == "left"){
            this.leftArrow.alpha = 0.5;
            this.index = this.index == 0 ? this.animals.length-1 : this.index -1;
            this.new_animal = this.add.sprite(0,0,this.animals[this.index]);
            this.new_animal.x = this.game.config.width + this.new_animal.width;
            this.new_animal.y = this.game.config.height * 0.5;
            this.tweens.add({
                targets:this.current_animal,
                x:-this.current_animal.width,
                duration: 400
            });
            this.tweens.add({
                targets:this.new_animal,
                x:this.game.config.width *0.5 ,
                duration: 400,
                onComplete:function(){
                    this.completeTween();
                },
                callbackScope: this
            });
        }else{
            this.rightArrow.alpha = 0.5;
            this.index = this.index == this.animals.length-1 ? 0 : this.index + 1;
            this.new_animal = this.add.sprite(0,0,this.animals[this.index]);
            this.new_animal.x = -this.new_animal.width;
            this.new_animal.y = this.game.config.height * 0.5;
            this.tweens.add({
                targets:this.current_animal,
                x:this.game.config.width + this.current_animal.width,
                duration: 400
            });
            this.tweens.add({
                targets:this.new_animal,
                x:this.game.config.width *0.5 ,
                duration: 400,
                onComplete:function(){
                    this.completeTween();
                },
                callbackScope: this
            });
        }
    }
    completeTween(){
        this.clickStart = false;
        this.leftArrow.alpha = 1;
        this.rightArrow.alpha = 1;
        this.current_animal = this.new_animal;
        /*this.anims.create({
            key:'animation',
            frames: this.anims.generateFrameNumbers(
                this.animals[this.index],
                {frames:[0,1,2,1,0]}
            ),
            frameRate: 3,
            repeat: 1
        });
        this.current_animal.play('animation');*/
        this.new_animal = null;
        this.animal_audio = this.sound.add(this.animals[this.index]+"_sound");
        this.animal_audio.play();
    }
}

let config = {
    width: 640,
    height: 360,
    scene : PlayGame
};
new Phaser.Game(config);