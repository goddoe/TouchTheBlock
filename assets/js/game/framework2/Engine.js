function Engine(){

	
	var that 	=	this;
	var db;
	
	var c;
	var ctx;
	var c_buffer;
	var ctx_buffer;
	
	var gameStartTime;
	var gameTime;
	
	var blockManager;
	
	var windowWidth		= 	document.documentElement.clientWidth;
	var windowHeight	=  	document.documentElement.clientHeight;
	
	this.init = function(id){
		
		//db = new Database();
		//appManager.setDb(db);
		
		c = document.getElementById(id);
		c.width = windowWidth;
		c.height = windowHeight;
		ctx = c.getContext("2d");
		
		c_buffer = document.createElement("canvas");
		c_buffer.width = c.width;
		c_buffer.height = c.height;
		ctx_buffer = c_buffer.getContext("2d");
		appManager.setCtx(ctx_buffer);
		appManager.setCanvas(c);
				
		blockManager = new BlockManager();
		blockManager.init(windowWidth, windowHeight);
		appManager.setBlockManager(blockManager);

		gameStartTime = Date.now();
				
		if (/android|ipad|iphone|ipod/i.test(navigator.userAgent)){
			c.addEventListener("touchstart", that.touchEvent ,false);
		}
		
		setInterval( that.loop, 40 );
		
	}

	this.loop = function(){
		

		gameTime = Date.now() - gameStartTime;
		appManager.setGameTime(gameTime);

		that.update(gameTime);
		that.render(ctx_buffer);
		ctx.drawImage(c_buffer, 0,0);
		
	}

	this.update = function (_gameTime){
		blockManager.update(gameTime);
	}

	this.render = function (_ctx){
		
		that.clear(_ctx);
		blockManager.render(_ctx);
		
	}
	
	this.clear = function (_ctx){
		_ctx.fillStyle = 'white';
		_ctx.strokeStyle = 'white';
		_ctx.fillRect(0,0,windowWidth, windowHeight);
	}
	
	this.touchEvent = function (e){
		blockManager.touchEvent(e);
	}
}