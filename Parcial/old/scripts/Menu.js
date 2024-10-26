Menu = function(game){
	this.bg = null;
	this.title = null;
	this.btnStart - null;
	this.cover = null;
}

Menu.prototype = {
	create:function(){
		this.bg = this.add.sprite(0,0,'background');
		this.title = this.add.sprite(0,0,'title');
		this.cover = this.add.sprite(0,0,'monster-cover');
		this.cover.y = Global.HEIGHT-this.cover.height;
		this.btnStart = this.add.button(0,0,'button-start',this.startGame,this,1,0,2);
		this.btnStart.x = Global.WIDTH - this.btnStart.width;
		this.btnStart.y= Global.HEIGHT-this.btnStart.height;
	},
	startGame:function(){
		this.state.start('Game')
	}
}