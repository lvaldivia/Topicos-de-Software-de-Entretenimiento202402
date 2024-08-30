import Phaser from "phaser";

class MenuScene extends Phaser.Scene{
    constructor(){
        super("MenuScene");
    }
    create(){
        //console.log('llegue al menu');
        this.background = this.add.sprite(0,0,'background');
        this.background.setOrigin(0,0);
        this.title = this.add.text(0,0,'BIENVENIDA',{
            font: "40px Arial",
            fill : "#FFFFFF"
        });
        this.title.x = 75;
        this.title.setInteractive();
        this.title.on("pointerdown",function(){
            this.scene.start("GameScene");
        },this);
        this.logo= this.add.sprite(0,0,'logo');
        this.logo.x=this.game.config.width*0.5;
        this.logo.y=this.game.config.height*0.5;
        //this.logo.setScale(5);
    }
}
export default MenuScene;