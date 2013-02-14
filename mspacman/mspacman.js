var board = {

	init: function() {

		var canvas = document.getElementById('mspacman');
		var ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.ctx = ctx;
		this.sprite = new Image();
		this.sprite.src = "pacman10-hp-sprite.png";
		this.sprite.onload =function() { 

			ctx.drawImage(this,321,10,465,135,0,0,300,155);
			ctx.drawImage(this,80,0,20,20,0,20,13,20);
			ctx.drawImage(this,0,140,20,20,20,20,13,20);

		};
	}
};