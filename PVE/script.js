var board = [[-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],
			 [-1, -1, -1, -1, -1, -1, -1],		// -1 if nothing is in board
			 [-1, -1, -1, -1, -1, -1, -1],		// 0 if player 1 put something there
			 [-1, -1, -1, -1, -1, -1, -1]]; 	// 1 if player 2 put something there

var currentPlayer = 0;
var playerscore = 0;
var aiscore = 0;

var AIWent = false; //program knows the AI went or not, calls AI for turn when it hasnt gone (false)

var playerToken;
var playerBanner;
var playerScoreImg;

var aiBanner = "../landingimages/placeholder.png"; // TODO: fill in url or src
var aiToken = "url('../landingimages/placeholder.png')"; // TODO: fill in url or src
var aiWinScreen = "../pvp/PVPImages/P2Win.png"; // TODO: fill in url or src
var playerWinScreen = "../pvp/PVPImages/P1Win.png"; // TODO: fill in url or src
var tieScreen = "../pvp/PVPImages/playAgain.png"; // TODO: fill in url or src


function Possible(BOARDC[], )
function aiturn()
{
	var boardcopy = board;
	var 
	return;
}


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
			document.getElementById('player').src = playerBanner;
			}				
			else{//if its ai
			document.getElementById('player').src = aiBanner;
			}
			if(checkWinner(r-1,colNum)){
				if(currentPlayer%2 == 1){
					document.getElementById('restartPic').src = playerWinScreen;
					document.getElementById('player').src = playerBanner;
					playerscore++;
					document.getElementById('p1scoreVal').innerHTML = playerscore;
				}
				else{
					document.getElementById('restartPic').src = aiWinScreen;
					aiscore++;
					document.getElementById('player').src = aiBanner;
					document.getElementById('p2scoreVal').innerHTML = aiscore;
				}
        		document.getElementById('restartOverlay').style.display = 'block';
			}
			if(!(AIWent)){
				AIWent = true;
				aiturn();
			}
			else
				AIWent = false;

			for(var x = 0; x<7; x++){
				if(board[0][x] == -1)
					return;
			}
			//TIE GAME
			document.getElementById('restartPic').src = tieScreen;
			document.getElementById('restartOverlay').style.display = 'block';
        		
			return;
		}
	}
	dropToken(5, colNum);
	board[5][colNum] = currentPlayer%2;
	currentPlayer++;
	if(currentPlayer%2 == 0){//if its player 1
			document.getElementById('player').src = playerBanner;
	}
	else{//if its player 2
		document.getElementById('player').src = aiBanner;
	}
	if(checkWinner(r-1,colNum)){
		if(currentPlayer%2 == 1){
			document.getElementById('restartPic').src = playerWinScreen;
			playerscore++;
			document.getElementById('p1scoreVal').innerHTML = playerscore;
		}
		else{
			document.getElementById('restartPic').src = aiWinScreen;
			aiscore++;
			document.getElementById('p2scoreVal').innerHTML = aiscore;
		}
		document.getElementById('restartOverlay').style.display = 'block';
	}
	if(!(AIWent)){
		AIWent = true;
		aiturn();
	}
	else
		AIWent =false;
	return;
}



function dropToken(row, col){
	var color;
	if(currentPlayer%2 == 0){ //if its player 1
		color = playerToken;
	}
	else{ //if its player 2
		color = aiToken;
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
		document.getElementById("color"+num).style.backgroundImage= playerToken;
	}
	else{ //if its player 2
		document.getElementById("color"+num).style.backgroundImage = aiToken;
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

function restartHover(btn){ // TODO: NEEDS TO CHANGE
	var name;
	if(btn == "restart"){
		name = "../pvp/PVPImages/yesHover.png"
	}
	else{
		name = "../pvp/PVPImages/noHover.png"
	}
	document.getElementById(btn).src = name;
}

function resetHover(btn){ // TODO: NEEDS TO CHANGE
	var name;
	if(btn == "restart"){
		name = "../pvp/PVPImages/yesButton.png"
	}
	else{
		name = "../pvp/PVPImages/noButton.png"
	}
	document.getElementById(btn).src = name;
}

function initializeGame(playernum){
	if (playernum == 1){
		playerBanner = "../pvp/PVPImages/player1.png";
		playerToken = "url('../GameImages/unicorn.png')";
		playerScoreImg = "../GameImages/uniscore.png";
	}
	else{
		playerBanner = "../pvp/PVPImages/player2.png";
		playerToken = "url('../GameImages/Wolf.png')";
		playerScoreImg = "../GameImages/WolfScore.png";
	}
	document.getElementById('player1score').src = playerScoreImg;
	document.getElementById('player').src = playerBanner;
	document.getElementById('chooseToken').style.display = 'none';
}






