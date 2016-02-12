function Database() {
	
	///////////////////////////////////////////////////
	// initialization
    var db = window.openDatabase("Rank_DB", "1.0", "Rank DB", 200000); //will create database Dummy_DB or open it
    tx.executeSql('CREATE TABLE IF NOT EXISTS Rank (id INTEGER PRIMARY KEY AUTOINCREMENT, Value INTEGER NOT NULL)');
    
    var value;
    
    this.executeUpdate = function (_value){
    	value = _value;
        db.transaction(updateDb, errorCB, successCB);
    }
    
    this.executeQuery = function (){
    	//db.transaction(queryDb, );
    }
    
    function queryDb(tx){
    	tx.executeSql('SELECT Value FROM Rank order by Value desc');
    	
    }
    
    //create table and insert some record
    function updateDb(tx) {
    	tx.executeSql('INSERT INTO SoccerPlayer(Value) VALUES ("'+value+'")');

    }
 
    //function will be called when an error occurred
    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }
 
    //function will be called when process succeed
    function successCB() {
        alert("success!");
        //db.transaction(queryDB,errorCB);
    }
 
    //select all from SoccerPlayer
    function queryDB(tx){
        tx.executeSql('SELECT * FROM SoccerPlayer',[],querySuccess,errorCB);
    }
 
    function querySuccess(tx,result){
        $('#SoccerPlayerList').empty();
        $.each(result.rows,function(index){
            var row = result.rows.item(index);
            $('#SoccerPlayerList').append('<li><a href="#"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc">Club '+row['Club']+'</p></a></li>');
        });
 
        $('#SoccerPlayerList').listview();
    }
}