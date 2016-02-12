function Stage() {

	
	this.makeRandomBlock = function (_blocks, _blockManager ) {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight, "black"));
		blockManager.checkGameOver();
	}
	
	this.makeRandomBlock2 = function (_blocks, _blockManager) {
		
		var rand_x, rand_y ; 
		
		rand_x = Math.round(Math.random() * (cols-1));
		rand_y = Math.round(Math.random() * (rows-1));
		
		
		for(var i = 0 ; i <blocks.length ; ++i ){
			if(blocks[i].getId() == rand_x*10 +rand_y){
				return that.makeRandomBlock();
			}
		}
		
		var color = Math.round(Math.random()*6);
		if(color <= 2){
			color = "red";
		}else {
			color = "black";
		}
		blocks.push(new Block(rand_x, rand_y, colWidth, rowHeight,color));
		blockManager.checkGameOver();
	}
	
}
