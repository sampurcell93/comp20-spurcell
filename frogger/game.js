$(document).ready(function() {

	board = {
		maxDepth: 0,
		frogsSaved: 0,
		lives: 3,
		level: 1,
		score: 0,
		speed: 5,
		ten_thou: 0,
		slots: [
			{lo: 8, hi: 44, filled: 1},
			{lo: 95, hi: 129, filled: 1},
			{lo: 182, hi: 215, filled: 1},
			{lo: 263, hi: 301, filled: 1},
			{lo: 351, hi: 385, filled: false}
		],
		deadFrog: 'assets/dead_frog.png',
		cars:[
			{
				x: 40,
				y: 260,
				pos: 0,
				width: 30,
				alley: 465
			},
			{
				x:40,
				y: 295,
				pos: 50,
				width: 30,
				alley: 435
			},
			{
				x: 101,
				y: 289,
				pos: 50,
				width: 55,
				alley: 405
			},
			{
				x: 40,
				y: 260,
				pos: 0,
				width: 30,
				alley: 375
			},
			{
				x:40,
				y: 295,
				pos: 50,
				width: 30,
				alley: 345
			},
			{
				x: 101,
				y: 289,
				pos: 50,
				width: 55,
				alley: 315
			}
		],
		logs: [{
			x: 185,
			y: 165,
			pos: 10,
			width: 185,
			alley: 195
		},
		{
			x: 126,
			y: 192,
			pos: 140,
			width: 125,
			alley: 165
		},
		{
			x: 185,
			y: 165,
			pos: 50,
			width: 185,
			alley: 225
		},
		{
			x: 126,
			y: 192,
			pos: 220,
			width: 125,
			alley: 255
		},
		{
			x: 126,
			y: 192,
			pos: 220,
			width: 125,
			alley: 135
		},
		{
			x: 126,
			y: 192,
			pos: 100,
			width: 125,
			alley: 105
		}],
		init: function() {

			this.frog = {
				x: 185,
				y: 495,
				sprite: {
					x: 13,
					y: 367
				}
			}
			var canvas = document.getElementById('game');
			var ctx = canvas.getContext('2d');
			this.canvas = canvas;
			this.ctx = ctx;
			var sprite = new Image();
	  		sprite.src = 'assets/frogger_sprites.png';
	  		this.sprite = sprite;
	  		var that = this;
	  		sprite.onload = function(){
	  			that.draw();
	  		};
	  		return this;
		},
		clear: function() { 
			this.canvas.width = this.canvas.width;
	  		return this;
		},
		drawBg: function() {
			this.clear();
			var ctx = this.ctx;
			//draw water
	  		ctx.fillStyle = "#191970";
	  		ctx.fillRect(0,0,399,282);
	  		//draw logo and landing zone
			ctx.drawImage(this.sprite,0,0,399,118,0,0,399,118);
	  		//draw asphalt
	  		ctx.fillStyle = "#000";
	  		ctx.fillRect(0,279,399,292);
	  		ctx.fillStyle = "rgb(0,255,0)";
	  		ctx.font = "bold 28px Calibri";
	  		ctx.fillText("Level " + this.level , 100, 545);
	  		ctx.font = "bold 14px Calibri";
	  		ctx.fillText("Score: " + this.score, 0, 560);
	  		ctx.fillText("HighScore: 0 ",100, 560);
	  		return this;
		},
		draw: function() {
			this.drawBg();
			this.moveObjects();
			this.checkColissions();
			var ctx = this.ctx;
			var sprite = this.sprite;
			for (var i in this.logs)
    			ctx.drawImage(sprite, 0, this.logs[i].y, this.logs[i].width, 30, this.logs[i].pos, this.logs[i].alley, this.logs[i].width, 30 );
   
	  		//bank
	  		ctx.drawImage(sprite, 0, 110, 399, 45, 0, 270, 399, 45);
	  		//bank
	  		ctx.drawImage(sprite, 0, 110, 399, 45, 0, 480, 399, 45);
	  		//draw frog
    		ctx.drawImage(this.sprite,this.frog.sprite.x,this.frog.sprite.y,21,21,this.frog.x, this.frog.y, 21,21);
	
    		for (var i in this.cars){
				var car = this.cars[i];
    			ctx.drawImage(sprite, car.x, car.y, car.width, 30, car.pos, car.alley, car.width, 21 );
    		}
    		for (var j = 0; j < this.lives; j++)
	  			ctx.drawImage(sprite, 10, 335, 30, 30, 30*j, 525, 30, 30);
	  		var total = 0;
	  		for (var f in this.slots){
	  			var dSprite = {x: 81, y: 367};
	  			if (this.slots[f].filled){
	  				ctx.drawImage(this.sprite,dSprite.x,dSprite.y,21,21,this.slots[f].lo+5,75, 21,21);
	  				total++;
	  			}
	  		}
	  		if (total == 5)
	  			this.levelUp();
	  		//fix this
	  		if (this.lives < 4 && this.score >= 10000)
	  			this.lives++;
	  		return this;

		},
		moveObjects: function() {
			for (var i in this.logs){
				if (i % 2)
					this.logs[i].pos += this.speed;
				else 
					this.logs[i].pos -= this.speed;

				if (this.logs[i].pos >= this.canvas.width + this.logs[i].width)
					this.logs[i].pos = -this.logs[i].width;
				else if (this.logs[i].pos < -this.logs[i].width)
					this.logs[i].pos = this.canvas.width;
			}	
			for (var i in this.cars){
				var spd = this.speed;
				var car = this.cars[i];
				if (i % 2)
					car.pos += spd;
				else 
					car.pos -= spd;
				if (car.pos >= this.canvas.width + 30)
			  		car.pos = -20;
				else if(car.pos < -40)
					car.pos = this.canvas.width;
			}
	  		return this;
		},	
		moveFrog: function(dir) {
			var dirFun = {
				left: this.moveL, 
				right: this.moveR,
				up: this.moveU,
				down: this.moveD
			};
			dirFun[dir](this);
	  		return this;
		},
		moveL: function(that) {
			if (!that.checkBounds(that.frog.x - 28, that.frog.y))
				return;
			var lSprite = {x: 81, y: 334};
			that.frog.sprite = lSprite;
			that.frog.x -= 28;
	  		return this;
		},
		moveR: function(that) {
			if (!that.checkBounds(that.frog.x + 28, that.frog.y))
				return;
			var rSprite = {x: 13, y: 334};
			that.frog.x += 28;
			that.frog.sprite = rSprite;
	  		return this;
		},
		moveU: function(that) {
			if (!that.checkBounds(that.frog.x, that.frog.y - 30))
				return;
			that.score += 10;
			var uSprite = {x: 13 , y: 367};
			that.frog.sprite = uSprite;
			that.frog.y-=30;				
		},
		moveD: function(that) {
			if (!that.checkBounds(that.frog.x, that.frog.y + 30))
				return;
			that.score -= 10;
			var dSprite = {x: 81, y: 367};
			that.frog.sprite = dSprite;
			that.frog.y+=30;
	  		return this;
		},
		checkBounds: function(x,y) {
			var w = this.canvas.width;
			var h = this.canvas.height;
			return (x > w - 25 || x < 0 || y > h - 60|| y < 50) ? false : true;
		},
		checkColissions: function() {
			if (this.checkWin())
				return false;

			if (this.frog.y > 270){
				for (var i in this.cars){
					var car = this.cars[i];
					if (this.frog.x >= car.pos && this.frog.x <= car.pos+car.width && this.frog.y == car.alley)
						this.die();
				}
			}
			else {
				var flag = false;
				for (var i in this.logs){
					var log = this.logs[i];
					if (this.frog.x > log.pos && this.frog.x < log.pos+log.width && this.frog.y == log.alley){
						flag = true
						if ( i % 2)
							this.frog.x+=5;
						else 
							this.frog.x-=5;
					}
				}
				if (!flag) this.die();

	  		return this;
			}
		},
		die: function() {
			window.clearInterval(drawLoop);
			this.clear();
			var that = this;
			var dead = new Image();
			dead.src = this.deadFrog;
			dead.onload = function() {
				that.ctx.drawImage(this,0,0,28,29,that.frog.x-3,that.frog.y-30,28,29);
			}
			setTimeout(function() {
				that.lives--;
				if (!that.lives){
					$("canvas").fadeOut();
					$("body").append("<h1>You have lost. LOST.</h1>");
				}
				that.clear().init();
				drawLoop = window.setInterval(function() {
					that.draw();
				}, 60);
			}, 2000);
		},
		checkWin: function() {
			var x = this.frog.x;
			var y = this.frog.y;
			if (y == 75){
				for (var i in this.slots){
					if (x <= this.slots[i].hi && x >= this.slots[i].lo && !this.slots[i].filled){
						this.slots[i].filled = true;
						this.init();
						this.score+=50;
						return true;
					}
				}
				return this;
			}
		},
		levelUp: function() {
			for (var i in this.slots)
				this.slots[i].filled = false;
			this.level++;
			this.speed++;
			this.score += 1000;
		}
	};

	drawLoop = window.setInterval(function() {
		board.draw();
	}, 60);

}).on("keydown", function(e) {
	if (e.keyCode == 37)
		board.moveFrog("left");
	if (e.keyCode == 39)
		board.moveFrog("right");
	if (e.keyCode == 38)
		board.moveFrog("up");
	if (e.keyCode == 40)
		board.moveFrog("down");

});