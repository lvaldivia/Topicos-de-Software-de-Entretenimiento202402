import Phaser from "phaser";

class PreloaderScene extends Phaser.Scene{
    constructor(){
        super("PreloaderScene")
    }

    preload(){
        this.load.image("background","assets/images/backyard.png");
		this.load.image("apple","assets/images/apple.png");
		this.load.image("arrow","assets/images/arrow.png");
		this.load.image("bar","assets/images/bar.png");
		this.load.image("candy","assets/images/candy.png");
		this.load.image("logo","assets/images/logo.png");
		this.load.image("rotate","assets/images/rotate.png");
		this.load.image("rubber_duck","assets/images/rubber_duck.png");
        this.load.spritesheet('pet', 'assets/images/pet.png',{
            frameWidth : 97,
            frameHeight: 83
        });
    }

    create(){
        //this.add.text(100,100,"Preloader");
        this.scene.start("MenuScene");
    }
}
export default PreloaderScene;