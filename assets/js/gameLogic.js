var xwingFleet;
var tieFighterFleet;
var beginGame;
var heroInArena;
var darksideInArena;

function writeHeroInfo(shipNum){

	heroInArena = shipNum;
	$("#xwingContent").append("<ul class='heroesArenaContent' id='xwingList'>");

	for (var key in xwingFleet[shipNum]) {

	    if (xwingFleet[shipNum].hasOwnProperty(key)) {
	        console.log(key, xwingFleet[shipNum][key]);
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
	        console.log(key, tieFighterFleet[shipNum][key]);
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
	
	var heroFight = Math.random() * xwingFleet[heroInArena].speed;
	var darksideFight = Math.random() * tieFighterFleet[darksideInArena].speed;

	if (heroFight > darksideFight) {
		xwingFleet[heroInArena].hp -= tieFighterFleet[darksideInArena].attack;
	}else if (heroFight < darksideFight) {
		tieFighterFleet[darksideInArena].hp -= xwingFleet[heroInArena].attack;
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
	}else if (tieFighterFleet[darksideInArena].hp <= 0) {
		console.log("TIE FIGHTER DOWN");
		removeDarksideFromArena();
	}else{
		return;
	}
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
			speed: 10,
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
}

start();