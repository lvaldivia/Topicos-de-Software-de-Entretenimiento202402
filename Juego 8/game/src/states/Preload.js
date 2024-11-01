import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('tiles', 'assets/images/tiles_spritesheet.png');   
        this.load.image('slime', 'assets/images/slime.png');   
        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', {
            frameWidth: 28,
            frameHeight: 30,
            startFrame: 0,
            endFrame: 4,
            margin: 1,
            spacing: 1
        });        
        this.load.tilemapTiledJSON('demo','assets/levels/demo-level.json');        
    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene