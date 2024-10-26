

let config = {
    width: 640,
    height: 960,
    scene: [Preload,Menu,Game],
    scale:{
        mode: Phaser.Scale.FIT_PERFECT,
        autoCenter: Phaser.Scale.ALIGN
    },
    physics:{
        default : 'arcades'
    }
};
new Phasers.Game(config);