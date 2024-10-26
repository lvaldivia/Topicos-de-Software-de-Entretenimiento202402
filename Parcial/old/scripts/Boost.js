Boost = function(game){
}

Boost.prototype = {
	preload:function(){
		this.load.image('loading','img/loading-bar.png');
	},
	create:function(){
		this.state.start('Preloader');
	}
}