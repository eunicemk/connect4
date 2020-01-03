var board = [[-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],		// -1 if nothing is in board
			 [-1, -1, -1, -1, -1, -1, -1],		// 0 if player 1 put something there
			 [-1, -1, -1, -1, -1, -1, -1]]; 	// 1 if player 2 put something there

var currentPlayer = 0;
var player1score = 0;
var player2score = 0;

function checkWinner(row,colNum)
{
	//check vertical
	var count = 0;
	console.log(board);
	for(var i = 0; i < 4; i++)
		{
			if(row+i < 6 && board[row+i][colNum] == (currentPlayer+1)%2)
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
			if(colNum-i >= 0 && board[row][colNum-i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}
	for(var i = 1; i < 4; i++)
		{
			if(colNum+i < 7 && board[row][colNum+i] == (currentPlayer+1)%2)
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
			if(row-i>=0 && colNum+i>=0 && board[row-i][colNum+i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}

	for(var i = 1; i < 4; i++)
		{
			if(row+i<6 && colNum-i>=0 && board[row+i][colNum-i] == (currentPlayer+1)%2)
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
			if(row+i<6 && colNum+i<7 && board[row+i][colNum+i] == (currentPlayer+1)%2)
				count++;
			else
				break;
		}

	for(var i = 1; i < 4; i++)
		{
			if(row-i >=0 && colNum-i>=0 && board[row-i][colNum-i] == (currentPlayer+1)%2)
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
			document.getElementById('player').src = "PVPImages/player1.png";
			}				
			else{//if its player 2
			document.getElementById('player').src = "PVPImages/player2.png";
			}
			if(checkWinner(r-1,colNum)){
				if(currentPlayer%2 == 1){
					document.getElementById('restartPic').src = "PVPImages/P1Win.png";
					document.getElementById('player').src = "PVPImages/player1.png";
					player1score++;
					document.getElementById('p1scoreVal').innerHTML = player1score;
				}
				else{
					document.getElementById('restartPic').src = "PVPImages/P2Win.png";
					player2score++;
					document.getElementById('player').src = "PVPImages/player2.png";
					document.getElementById('p2scoreVal').innerHTML = player2score;
				}
        		document.getElementById('restartOverlay').style.display = 'block';
			}
			for(var x = 0; x<7; x++){
				if(board[0][x] == -1)
					return;
			}
			//TIE GAME
			document.getElementById('restartPic').src = "PVPImages/playAgain.png";
			document.getElementById('restartOverlay').style.display = 'block';
        		
			return;
		}
	}
	dropToken(5, colNum);
	board[5][colNum] = currentPlayer%2;
	currentPlayer++;
	if(currentPlayer%2 == 0){//if its player 1
			document.getElementById('player').src = "PVPImages/player1.png";
	}
	else{//if its player 2
		document.getElementById('player').src = "PVPImages/player2.png";
	}
	if(checkWinner(r-1,colNum)){
		if(currentPlayer%2 == 1){
			document.getElementById('restartPic').src = "PVPImages/P1Win.png";
			player1score++;
			document.getElementById('p1scoreVal').innerHTML = player1score;
		}
		else{
			document.getElementById('restartPic').src = "PVPImages/P2Win.png";
			player2score++;
			document.getElementById('p2scoreVal').innerHTML = player2score;
		}
		document.getElementById('restartOverlay').style.display = 'block';
	}
	return;
}



function dropToken(row, col){
	var color;
	if(currentPlayer%2 == 0){ //if its player 1
		color = "url('../GameImages/unicorn.png')";
	}
	else{ //if its player 2
		color = "url('../GameImages/Wolf.png')";
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
		document.getElementById("color"+num).style.backgroundImage= "url('../GameImages/redX.png')";
		return;
	}
	if(currentPlayer%2 == 0){ //if its player 1
		document.getElementById("color"+num).style.backgroundImage= "url('../GameImages/unicorn.png')";
	}
	else{ //if its player 2
		document.getElementById("color"+num).style.backgroundImage = "url('../GameImages/Wolf.png')";
	}
}

function whiten(num){
	document.getElementById("color"+num).style.backgroundImage = "";
	document.getElementById("color"+num).style.backgroundColor = "transparent";
}


function restartGame(){
	board = [[-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],		// -1 if nothing is in board
			 [-1, -1, -1, -1, -1, -1, -1],		// 0 if player 1 put something there
			 [-1, -1, -1, -1, -1, -1, -1]];
	//TODO: WINNER STARTS THE GAME
	//TODO: reset scores if player presses no!
	currentPlayer--;

	for(var row = 0; row<6; row++){
		for(var col = 0; col<7; col++){
			document.getElementById("cell"+row+col).classList.remove('fall');
			document.getElementById("cell"+row+col).style.backgroundImage= "";
		}
	}

	document.getElementById('restartOverlay').style.display = 'none';

}

function restartHover(btn){
	var name;
	if(btn == "restart"){
		name = "PVPImages/yesHover.png"
	}
	else{
		name = "PVPImages/noHover.png"
	}
	document.getElementById(btn).src = name;
}

function resetHover(btn){
	var name;
	if(btn == "restart"){
		name = "PVPImages/yesButton.png"
	}
	else{
		name = "PVPImages/noButton.png"
	}
	document.getElementById(btn).src = name;
}








