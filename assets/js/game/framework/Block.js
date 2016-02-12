function Block(_col, _row,_width, _height, color) {
	
	var that 	= this;

	var col		=	_col;
	var row		= 	_row;
	
	var x 		= 	col*_width;
	var y 		= 	row*_height;
	
	var width 	= 	_width;
	var height 	= 	_height;
	
	var color		=	color;
	this.removeIt 	= false;
	var bornTime 	= appManager.getGameTime();
	
	this.update = function (_gameTime){
		if(color !="black"){
			if( (_gameTime - bornTime) >1500 ){
				that.removeIt =true;
			}
		}
	}
	
	this.render = function (_ctx){
		if(color == "random"){
			randomColor = Math.round(Math.random() * (6));
			switch(randomColor)
			 {
			 case 0:
				 randomColor = 'blue';
				 break;
			 case 1:
				 randomColor = 'orange';
				 break;
			 case 2:
				 randomColor = 'green';
				 break;
			 case 3:
				 randomColor = 'red';
				 break;
			 case 4:
				 randomColor = 'magenta';
				 break;
			 case 5:
				 randomColor = 'cyan';
				 break;
			 case 6:
				 randomColor = 'yellow';
				 break;
			 }
			_ctx.fillStyle = randomColor;
			_ctx.fillRect(x, y, width-1, height-1);

		}else {
			_ctx.fillStyle = color;
			_ctx.fillRect(x, y, width-1, height-1);
		}

		
	}
	
	this.getId = function (){
		return col*10+row;
	}
	
	this.checkCollision = function (e) {
		var ex;
		var ey;
		
		var ex2 = -1;
		var ey2 = -1;
		
		var c = appManager.getCanvas();

		//when mobile 
		if (/android|ipad|iphone|ipod/i.test(navigator.userAgent)){
			ex = e.touches[0].clientX- c.offsetLeft;
			ey = e.touches[0].clientY- c.offsetTop;
		
			if(e.touches.length >1){
				ex2 = e.touches[1].clientX- c.offsetLeft;
				ey2 = e.touches[1].clientY- c.offsetTop;
			}
		
		}else {

			ex = e.x - c.offsetLeft ;//-document.body.scrollLeft;
			ey = e.y - c.offsetTop ;//-document.body.scrollTop;
	
		}
		
		if((x < ex && x+width > ex && y < ey && y+height >ey)
				||(x < ex2 && x+width > ex2 && y < ey2 && y+height >ey2)){		
			if(color != "black"){
				appManager.getBlockManager().gameOver();
			}
			return true;
		}
		false;

	}
}