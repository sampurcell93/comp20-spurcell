var board = {

	init: function() {

		var canvas = document.getElementById('game');
		var ctx = canvas.getContext('2d');
		this.canvas = canvas;
		this.ctx = ctx;
		this.frogX = 188;
		this.frogY= 530;
		this.lives = 3;
		var sprite = new Image();
  		sprite.src = 'assets/frogger_sprites.png';
  		this.sprite = sprite;
  		var that = this;
  		sprite.onload = function(){
  			//draw logo and landing zone
    		ctx.drawImage(sprite,0,0,399,118,0,0,399,118);
    		//draw frog
    		ctx.drawImage(sprite,13,364,25,25,that.frogX, that.frogY, 25,25);
    		//draw log
    		ctx.drawImage(sprite,0,165,185,25,200,200,185,25);
	  		//bank
	  		ctx.drawImage(this, 0, 110, 399, 45, 0, 270, 399, 45);
	  		//bank
	  		ctx.drawImage(this, 0, 110, 399, 45, 0, 480, 399, 45);
	  		//car1
	  		ctx.drawImage(this, 40, 260, 40, 30, 50, 375, 40, 30);
	  		//car2
	  		ctx.drawImage(this, 40, 295, 32.5, 30, 230, 425, 32.5, 30);
	  		ctx.drawImage(this, 10, 335, 30, 30, 0, 525, 30, 30);
	  		ctx.drawImage(this, 10, 335, 30, 30, 30, 525, 30, 30);
	  		ctx.drawImage(this, 10, 335, 30, 30, 60, 525, 30, 30);
  		}
  		//draw water
  		ctx.fillStyle = "#191970";
  		ctx.fillRect(0,0,399,282);
  		//draw asphalt
  		ctx.fillStyle = "#000";
  		ctx.fillRect(0,279,399,292);
  		ctx.fillStyle = "rgb(0,255,0)";
  		ctx.font = "bold 28px Calibri";
  		ctx.fillText("Level", 100, 545);
  		ctx.font = "bold 14px Calibri";
  		ctx.fillText("Score: 0", 0, 560);
  		ctx.fillText("HighScore: 0 ",100, 560);
	},
	clear: function() { 

		this.canvas.width = this.canvas.width;

	},
	moveFrog: function(toX, toY)  {

			this.clear();
    		this.ctx.drawImage(this.sprite,13,364,25,25,toX, toY, 25,25);

	}

};


