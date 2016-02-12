function BlockManager(){
	
	var that = this;
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//
	var cols 	=	3;
	var rows	=	3;
	var colWidth;
	var rowHeight;
	var windowWidth;
	var windowHeight;
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	//
	var blocks =[];
	
	var makeRandomBlockInterval;

	var levelInterval;
	
	var clickedBlock=1;
	
	var level=1;
	var timer;
	
	var dis;
	
	this.init = function (_windowWidth, _windowHeight){
		colWidth 	= 	_windowWidth/cols;
		rowHeight 	= 	_windowHeight/rows;
		
		windowWidth 	= 	_windowWidth;
		windowHeight 	= 	_windowHeight;
		makeRandomBlockInterval = setInterval(that.makeRandomBlock, 500);
		
	}
	
	this.update = function (_gameTime){
		
		if(blocks.length >0){
			for(var i = blocks.length -1 ; i >= 0 ; --i ){
				blocks[i].update(_gameTime);
				if(blocks[i].removeIt){
					blocks.splice(i,1);
				}	
			}		
		}
		
		timer = (40 - _gameTime/1000).toFixed(3);
		
		that.timerCheck();
		that.levelUp();
		
	};
	
	this.render = function (_ctx){
		//that.drawGrid(_ctx);
		that.drawBlocks(_ctx);
		that.drawTimer(_ctx);
		
	};
	
	this.drawGrid = function (_ctx){
		
		_ctx.strokeStyle = 'black';
		
		for(var _x = 0; _x <cols; ++_x ){
			for(var _y = 0 ; _y <rows ; ++_y){
				
				_ctx.strokeRect(_x*colWidth, _y*rowHeight, colWidth -1, rowHeight-1);
			}
		}
	};
	
	this.drawBlocks = function (_ctx) {
		
		for(var i = 0 ; i < blocks.length ; ++i){
			blocks[i].render(_ctx);
		}
	}
	
	this.drawTimer = function (_ctx){
		_ctx.font="30px Verdana";
		// Create gradient
		var gradient=_ctx.createLinearGradient(windowWidth/2-20,0,windowWidth+20,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		_ctx.fillStyle=gradient;
		_ctx.fillText(timer,windowWidth/2 - 20,40);
	}
	
	this.timerCheck = function (){
		if(timer <=0){
			
			gameOver();
		}
		
	}
	
	this.makeRandomBlock = function () {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight, "black"));
		that.checkGameOver();
	}
	
	this.makeRandomBlock2 = function () {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		var color = Math.round(Math.random()*6);
		if(color <= 1){
			color = "red";
		}else {
			color = "black";
		}
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight,color));
		that.checkGameOver();
	}
	
	this.makeRandomBlock3 = function () {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		var blockType = Math.round(Math.random()*6);
		var color;
		if(blockType <= 1){
			
			randomColor = Math.round(Math.random() *6);
			switch(randomColor)
			 {
			 case 0:
				 color = 'blue';
				 break;
			 case 1:
				 color = 'orange';
				 break;
			 case 2:
				 color = 'green';
				 break;
			 case 3:
				 color = 'red';
				 break;
			 case 4:
				 color = 'magenta';
				 break;
			 case 5:
				 color = 'cyan';
				 break;
			 case 6:
				 color = 'yellow';
				 break;
			 }
		}else {
			color = "black";
		}
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight,color));
		that.checkGameOver();
	}

	this.makeRandomBlock4 = function () {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		var blockType = Math.round(Math.random()*6);
		var color;
		if(blockType <= 1){
			color = "random";
		}else {
			color = "black";
		}
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight,color));
		that.checkGameOver();
	}


	
	this.touchEvent = function (_e) {
		
		var collision = false;
		
		if(blocks.length >0){
			for(var i = blocks.length -1 ; i >= 0 ; --i ){
				if(blocks[i].checkCollision(_e)){
					blocks.splice(i,1);
					clickedBlock++;
					collision = true;
					break;
				}
			}
		}
		
		if(collision == false ){
			that.gameOver();
		}
		

	}
	
	
	this.levelUp = function() {
		if((clickedBlock%2)==0 && level < 9){
			clearInterval(makeRandomBlockInterval);
			makeRandomBlockInterval = setInterval(that.makeRandomBlock, 500-level*20);
			
			level++;
			clickedBlock++;
		}else if((clickedBlock%8)==0 && level >= 8 && level < 12){
			clearInterval(makeRandomBlockInterval);
			makeRandomBlockInterval = setInterval(that.makeRandomBlock2, 500-9*20 - level*8);
			level++;
			clickedBlock++;
		}else if((clickedBlock%8)==0 && level >= 11 && level < 15){
			clearInterval(makeRandomBlockInterval);
			makeRandomBlockInterval = setInterval(that.makeRandomBlock3, 500-12*20 - level*7);
			level++;
			clickedBlock++;
		}else if((clickedBlock%8)==0 && level >= 14 && level < 19){
			clearInterval(makeRandomBlockInterval);
			makeRandomBlockInterval = setInterval(that.makeRandomBlock4, 500-14*20 - level*3);
			level++;
			clickedBlock++;
		}

	}

	this.checkGameOver = function() {
		if(blocks.length ==9){
			that.gameOver();
		}
	}
	
	this.gameOver = function () {
		clearInterval(makeRandomBlockInterval);
	    alert("level : "+level+"\nscroe : "+clickedBlock);
	    location.href = "index.html?score="+clickedBlock;

	}
	
	this.checkRedBlock = function () {
		
	}
	
}