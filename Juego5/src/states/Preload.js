import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('space', 'assets/images/space.png');    
        this.load.image('player', 'assets/images/player.png');    
        this.load.image('bullet', 'assets/images/bullet.png')
    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene