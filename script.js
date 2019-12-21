var board = [[-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],		// -1 if nothing is in board
			 [-1, -1, -1, -1, -1, -1, -1],		// 0 if player 1 put something there
			 [-1, -1, -1, -1, -1, -1, -1]]; 	// 1 if player 2 put something there

var currentPlayer = 0;



function col(colNum){
	whiten(colNum);
	if(board[0][colNum] != -1){ //if the whole colum is filled
		//TODO!!
		return;
	}
	for(var r=0; r<6; r++){
		if(board[r][colNum] != -1){
			dropToken(r-1, colNum);
			board[r-1][colNum] = currentPlayer%2;
			currentPlayer++;
			document.getElementById("player").innerHTML = "PLAYER " + ((currentPlayer%2)+1) + " TURN";
			return;
		}
	}
	dropToken(5, colNum);
	board[5][colNum] = currentPlayer%2;
	currentPlayer++;
	document.getElementById("player").innerHTML = "PLAYER " + ((currentPlayer%2)+1) + " TURN";
	return;
}



function dropToken(row, col){
	var color;
	if(currentPlayer%2 == 0){ //if its player 1
		color = "url('unicorn.png')";
	}
	else{ //if its player 2
		color = "url('Wolf.png')";
	}

	document.getElementById("cell"+row+col).style.backgroundImage= color;
	/*// "animating" the token dropping
	document.getElementById("cell"+0+col).style.backgroundImage=color;

	for(var i=1; i<=row; i++){
		//setTimeout(dropping(row, col, color), 1000);
		document.getElementById("cell"+(i-1)+col).style.backgroundColor = "#FFFFFF";
		document.getElementById("cell"+i+col).style.backgroundColor = color;
	}*/
	
}

function recolor(num){
	if(currentPlayer%2 == 0){ //if its player 1
		document.getElementById("color"+num).style.backgroundImage= "url('unicorn.png')";
	}
	else{ //if its player 2
		document.getElementById("color"+num).style.backgroundImage = "url('Wolf.png')";
	}
}

function whiten(num){
	document.getElementById("color"+num).style.backgroundImage = "";
	document.getElementById("color"+num).style.backgroundColor = "transparent";
}









