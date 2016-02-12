function AppManager(){
	
	var db;
	
	var c;
	var ctx;
	var blockManager;
	var gameTime;

	
	this.setCanvas = function (_c) {
		c = _c;
	}

	this.getCanvas = function (){
		return c;
	}
	
	
	
	this.setCtx = function (_ctx){
		ctx = _ctx;
	}
	
	this.getCtx = function () {
		return ctx;
	}

	this.setBlockManager = function (_blockManager){
		blockManager = _blockManager;
	}
	
	this.getBlockManager = function (){
		return blockManager;
	}
	
	this.setGameTime = function (_gameTime) {
		gameTime = _gameTime;
	}
	this.getGameTime = function (){
		return gameTime;
	}
	
	this.setDb = function (_db) { db = _db;}
	this.getDb = function() { return db;}
}

var appManager = new AppManager();