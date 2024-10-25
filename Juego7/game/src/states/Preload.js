import Phaser from "phaser"

class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene");
    }
    preload(){
        this.load.image('background', 'assets/background.png');    
        this.load.image('spike', 'assets/spike.png');   
        this.load.image('tiles', 'assets/platformPack_tilesheet.png');    
        this.load.atlas('player','assets/kenney_player.png',
                        'assets/kenney_player_atlas.json')
        this.load.tilemapTiledJSON('map','assets/mapa.json');        
    }
    create(){
        this.scene.start('GameScene');
    }
}
export default PreloadScene