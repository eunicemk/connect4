var board = [[-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],		// -1 if nothing is in board
			 [-1, -1, -1, -1, -1, -1, -1],		// 0 if player 1 put something there
			 [-1, -1, -1, -1, -1, -1, -1]]; 	// 1 if player 2 put something there

var currentPlayer = 0;

function checkWinner(row,colNum)
{
	//check vertical
	var count = 0;
	for(var i = 0; i < 4; i++)
		{
			if(board[row+i][colNum] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}
	if(count >= 4)
		return true;
	else
		count = 0;

	//check horizontal
	for(var i = 0; i < 4; i++)
		{
			if(board[row][colNum-i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}

	for(var i = 0; i < 4; i++)
		{
			if(board[row][colNum+i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}
	if(count >= 4)
		return true;
	else
		count = 0;

	//check northeast pointing diagonal
	for(var i = 0; i < 4; i++)
		{
			if(board[row-i][colNum-i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}

	for(var i = 0; i < 4; i++)
		{
			if(board[row+i][colNum+i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}
	if(count >= 4)
		return true;
	else
		count = 0;

	//check northwest pointing diagonal
	for(var i = 0; i < 4; i++)
		{
			if(board[row+i][colNum-i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}

	for(var i = 0; i < 4; i++)
		{
			if(board[row-i][colNum+i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}
	if(count >= 4)
		return true;
	else
		return false;
}

function col(colNum){
	whiten(colNum);
	if(board[0][colNum] != -1){ //if the whole colum is filled
		//TODO!!
		return;
	}
	for(var r=0; r<6; r++){
		if(board[r][colNum] != -1){
			//call the drop token to start animating the drop
			dropToken(r-1, colNum);
			//update the internal board
			board[r-1][colNum] = currentPlayer%2;
			currentPlayer++;
			
			if(currentPlayer%2 == 0){//if its player 1
			document.getElementById('player').src = "player1.png";
			}				
			else{//if its player 2
			document.getElementById('player').src = "player2.png";
			}
			if(checkWinner(r-1,colNum))
				window.alert('Player ' + ((currentPlayer%2)) + ' has won');

			return;
		}
	}
	dropToken(5, colNum);
	board[5][colNum] = currentPlayer%2;
	currentPlayer++;
	if(currentPlayer%2 == 0){//if its player 1
			document.getElementById('player').src = "player1.png";
		}
	else{//if its player 2
		document.getElementById('player').src = "player2.png";
	}
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

	//fall animation
	document.getElementById("cell"+row+col).style.backgroundImage= color;
	//change fall from location depending on where it has to land on
	var location = (row+1)*(-67);
	document.documentElement.style.setProperty('--fall-var', location+"px");
	//start the animation
	document.getElementById("cell"+row+col).classList.add('fall');
	
}

function recolor(num){
	if(board[0][num] != -1){ //if the whole colum is filled
		document.getElementById("color"+num).style.backgroundImage= "url('redX.png')";
		return;
	}
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









