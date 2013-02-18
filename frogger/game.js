var board = {

	init: function() {

		var canvas = document.getElementById('game');
		var ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.ctx = ctx;
		var frogX = 188;
		var frogY = 530;
		var sprite;

		sprite = new Image();
  		sprite.src = 'assets/frogger_sprites.png';
  		this.sprite = sprite;
  		sprite.onload = function(){
    		ctx.drawImage(sprite,0,0,399,48,0,0,399,48);
    		ctx.drawImage(sprite,13,364,25,25,frogX, frogY, 25,25);
    		ctx.drawImage(sprite,5,160,180,29,100,100,180,29);

  		}
	},
	clear: function() { 

		this.canvas.width = this.canvas.width;

	},
	moveFrog: function(toX, toY)  {

    		this.ctx.drawImage(this.sprite,13,364,25,25,toX, toY, 25,25);

	}
};

