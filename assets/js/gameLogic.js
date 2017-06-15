var xwingFleet = [];
var tieFighterFleet = [];
var beginGame;
var heroInArena;
var darksideInArena;

function writeHeroInfo(shipNum){

	heroInArena = shipNum;
	$("#xwingContent").append("<ul class='heroesArenaContent' id='xwingList'>");

	for (var key in xwingFleet[shipNum]) {

	    if (xwingFleet[shipNum].hasOwnProperty(key)) {
	        if(key!=="imgURL"){
	        	$("#xwingList").append("<li>"+key.toUpperCase() + " : " + xwingFleet[shipNum][key]+"</li>")
	        }
	    }
	}	    
}

function writeDarksideInfo(shipNum){

	darksideInArena = shipNum;
	$("#tiefighterContent").append("<ul class='darksideArenaContent' id='tiefighterList'>");

	for (var key in tieFighterFleet[shipNum]) {

	    if (tieFighterFleet[shipNum].hasOwnProperty(key)) {
	        if(key!=="imgURL"){
	        	$("#tiefighterList").append("<li>"+key.toUpperCase() + " : " + tieFighterFleet[shipNum][key]+"</li>")
	        }
	    }
	}   
}

function transferToArena(shipType, shipNum){

	if(shipType==="xwing"){
		$("#xwingDIV"+shipNum).remove();
		$("#xwingImage").html("<img src='"+xwingFleet[shipNum].imgURL+"' id='xwing"+ shipNum + "' class='heroesArenaContent'>");
	}else{
		$("#tiefighterDIV"+shipNum).remove();
		$("#tiefighterImage").html("<img src='"+tieFighterFleet[shipNum].imgURL+"' id='tiefighter"+ shipNum + "' class='darksideArenaContent'>");
	}
}

function fight(){

	if(heroInArena === -1 || darksideInArena === -1) return;
	
	var heroFight = Math.floor(Math.random() * xwingFleet[heroInArena].speed);
	var darksideFight = Math.floor(Math.random() * tieFighterFleet[darksideInArena].speed);

	if (heroFight < darksideFight) {

		console.log("xwing: " + heroFight + " vs tiefighter: " + darksideFight);
		console.log("xwing before: " + xwingFleet[heroInArena].hp);
		xwingFleet[heroInArena].hp -= tieFighterFleet[darksideInArena].attack;
		console.log("xwing after: " + xwingFleet[heroInArena].hp);

	}else if (heroFight > darksideFight) {

		console.log("tiefighter: " + darksideFight + " vs xwing: " + heroFight);
		console.log("tie-fighter before: " + tieFighterFleet[darksideInArena].hp);
		tieFighterFleet[darksideInArena].hp -= xwingFleet[heroInArena].attack;
		console.log("tie-fighter after: " + tieFighterFleet[darksideInArena].hp);

	}else{
		console.log("SAME VALUE");
	}

	$("#xwingList").remove();
	writeHeroInfo(heroInArena);

	$("#tiefighterList").remove();
	writeDarksideInfo(darksideInArena);

	checkDamage()
}

function checkDamage(){
	if(xwingFleet[heroInArena].hp <= 0){
		console.log("XWING DOWN");
		removeHeroFromArena(false);
		checkWinner();
	}else if (tieFighterFleet[darksideInArena].hp <= 0) {
		console.log("TIE FIGHTER DOWN");
		removeDarksideFromArena();
		checkWinner();
	}else{
		return;
	}
}

function checkWinner(){
	var darksideHP = 0;
	var heroesHP = 0;

	for (var i = 0; i < xwingFleet.length; i++) {
		heroesHP += xwingFleet[i].hp;
	}

	for (var i = 0; i < tieFighterFleet.length; i++) {
		darksideHP += tieFighterFleet[i].hp;
	}

	if(heroesHP === 0){
		darksideWin();
	}else if(darksideHP === 0){
		heroesWin();
	}else{
		return;
	}
}

function darksideWin(){
	$("#darksideArena").html("<img src='assets/images/darksideWin.gif' style='width: 100%''>");
}

function heroesWin(){
	$("#heroesArena").html("<img src='assets/images/heroesWin.gif' style='width: 100%'>");
}

//Removes image and list from arena and adds the dead xwing back to the list
function removeHeroFromArena(retreat){
	$(".heroesArenaContent").remove();

	if(retreat){
		var tempHP = xwingFleet[heroInArena].hp;
		var tempNum = heroInArena;
		$("#heroes").append("<div class='xIMG' id='xwingDIV" + heroInArena + "'>");
		$("#xwingDIV" + heroInArena).append("<img src='"+xwingFleet[heroInArena].imgURL+"' id='xwing"+ heroInArena + "'>");
		$("#xwingDIV"+tempNum).append("<div class='displayHP'>"+tempHP+"</div>")
	}else{
		xwingFleet[heroInArena].imgURL = "assets/images/xwingDead.png";
		$("#heroes").append("<div class='xIMG' id='xwingDIV" + heroInArena + "'>");
		$("#xwingDIV" + heroInArena).append("<img src='"+xwingFleet[heroInArena].imgURL+"' id='xwing"+ heroInArena + "'>");
	}
		
	
	heroInArena = -1;
}

//Removes image and list from arena and adds the dead tiefighter back to the list
function removeDarksideFromArena(){
	$(".darksideArenaContent").remove();
	tieFighterFleet[darksideInArena].imgURL = "assets/images/tiefighterDead.png"
	
	$("#darkside").append("<div class='tieIMG' id='tiefighterDIV" + darksideInArena + "'>");
	$("#tiefighterDIV" + darksideInArena).append("<img src='"+tieFighterFleet[darksideInArena].imgURL+"' id='tiefighter"+ darksideInArena + "'>");
	darksideInArena = -1
}


function start(){

	if(xwingFleet.length > 0){
		
		if(heroInArena >= 0){
			removeHeroFromArena(false);
		}

		if (darksideInArena >= 0) {
			removeDarksideFromArena();
		}
		
		$(".xIMG").remove();
		$(".tieIMG").remove();
	}

	beginGame = true;
	xwingFleet = [];
	tieFighterFleet = [];

	//Setup x-wing fleet
	for(var i=0; i<3; i++){
		xwingFleet.push({
			name: "X-Blue " + i,
			hp: 100,
			attack: 10,
			speed: 7,
			imgURL: "assets/images/xwing.png"
		});
	}

	//Setup tie-fighter fleet
	for(var i=0; i<6; i++){
		tieFighterFleet.push({
			name: "Tie-Red " + i,
			hp: 50,
			attack: 5,
			speed: 25,
			imgURL: "assets/images/tiefighter.png"
		});
	}

	//Place the ship images on either side
	for (var i = 0; i < xwingFleet.length; i++) {
		$("#heroes").append("<div class='xIMG' id='xwingDIV" + i + "'>");
		$("#xwingDIV" + i).append("<img src='"+xwingFleet[i].imgURL+"' id='xwing"+ i + "'>");
	}

	for (var i = 0; i < tieFighterFleet.length; i++) {
		$("#darkside").append("<div class='tieIMG' id='tiefighterDIV" + i + "'>");
		$("#tiefighterDIV" + i).append("<img src='"+tieFighterFleet[i].imgURL+"' id='tiefighter"+ i + "'>");
	}

	return;
}

start();