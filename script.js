function restartHover(btn){
	var name;
	if(btn == "pvpbtn"){
		name = "LandingImages/pvphover.png"
	}
	else{
		name = "LandingImages/pvAIhover.png"
	}
	document.getElementById(btn).src = name;
}

function resetHover(btn){
	var name;
	if(btn == "pvpbtn"){
		name = "LandingImages/pvp.png"
	}
	else{
		name = "LandingImages/pvAI.png"
	}
	document.getElementById(btn).src = name;
}

