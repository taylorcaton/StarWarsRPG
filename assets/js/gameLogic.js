var xwingFleet = [];
var tieFighterFleet = [];
var beginGame;
var heroInArena;
var darksideInArena;
var starDestroyerAlive;

function writeHeroInfo(shipNum){

	$("#xwingList").empty();

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

//Writes the info to the darkside arena
function writeDarksideInfo(shipNum){

	$("#tiefighterList").empty();

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

//Transfers the selected ship to the arena (This was implemented before I learned .attr)
function transferToArena(shipType, shipNum){

	if(shipType==="xwing"){
		$("#xwingDIV"+shipNum).remove();
		$("#xwingImage").html("<img src='"+xwingFleet[shipNum].imgURL+"' id='xwing"+ shipNum + "' class='heroesArenaContent'>");
	}else{
		$("#tiefighterDIV"+shipNum).remove();
		$("#tiefighterImage").html("<img src='"+tieFighterFleet[shipNum].imgURL+"' id='tiefighter"+ shipNum + "' class='darksideArenaContent img-responsive'>");
	}
}

//Triggered by the attack button, the speed determines the highest possible random number
function fight(){

	if(heroInArena === -1 || darksideInArena === -1) return;
	
	var heroFight = Math.floor(Math.random() * xwingFleet[heroInArena].speed);
	var darksideFight = Math.floor(Math.random() * tieFighterFleet[darksideInArena].speed);

	if (heroFight < darksideFight) {

		console.log("xwing: " + heroFight + " vs tiefighter: " + darksideFight);
		console.log("xwing before: " + xwingFleet[heroInArena].hp);
		xwingFleet[heroInArena].hp -= tieFighterFleet[darksideInArena].attack;
		console.log("xwing after: " + xwingFleet[heroInArena].hp);
		tieFire.play();

	}else if (heroFight > darksideFight) {

		console.log("tiefighter: " + darksideFight + " vs xwing: " + heroFight);
		console.log("tie-fighter before: " + tieFighterFleet[darksideInArena].hp);
		tieFighterFleet[darksideInArena].hp -= xwingFleet[heroInArena].attack;
		console.log("tie-fighter after: " + tieFighterFleet[darksideInArena].hp);
		xwingFire.play();

	}else{
		console.log("SAME VALUE");
	}

	$("#xwingList").remove();
	writeHeroInfo(heroInArena);

	$("#tiefighterList").remove();
	writeDarksideInfo(darksideInArena);

	checkDamage()
}

//Check to see if one of the ships in the arena has 0 hp and removes it
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

//Check to see if one of the fleets is out of HP
function checkWinner(){
	var darksideHP = 0;
	var heroesHP = 0;

	for (var i = 0; i < xwingFleet.length; i++) {
		heroesHP += xwingFleet[i].hp;
	}

	for (var i = 0; i < tieFighterFleet.length; i++) {
		darksideHP += tieFighterFleet[i].hp;
	}

	if(starDestroyerAlive && darksideHP <= 0) heroesWin();

	if(heroesHP <= 0){
		darksideWin();
	}else if(darksideHP <= 0){
		//heroesWin();
		starDestroyer();
		starDestroyerAlive = true;
	}else{
		return;
	}
}

//Shows a win gif
function darksideWin(){
	$("#darksideArena").html("<img src='assets/images/darksideWin.gif' style='width: 100%''>");
}

//Shows a win gif
function heroesWin(){
	music.stop();
	win.play();
	$("#heroesArena").html("<img src='assets/images/heroesWin.gif' style='width: 100%'>");
}

//Removes image and list from arena and adds the dead xwing back to the list
function removeHeroFromArena(retreat){
	$(".heroesArenaContent").remove();

	if(retreat && heroInArena != -1){
		var tempHP = xwingFleet[heroInArena].hp;
		var tempNum = heroInArena;
		$("#heroes").append("<div class='xIMG' id='xwingDIV" + heroInArena + "'>");
		$("#xwingDIV" + heroInArena).append("<img src='"+xwingFleet[heroInArena].imgURL+"' id='xwing"+ heroInArena + "'>");
		$("#xwingDIV"+tempNum).append("<div class='displayHP'>"+tempHP+"</div>");
		xwingFire.stop();
		retreatSound.play();
	}else if(heroInArena != -1){
		xwingFleet[heroInArena].imgURL = "assets/images/xwingDead.png";
		$("#heroes").append("<div class='xIMG' id='xwingDIV" + heroInArena + "'>");
		$("#xwingDIV" + heroInArena).append("<img src='"+xwingFleet[heroInArena].imgURL+"' id='xwing"+ heroInArena + "'>");
		xwingFire.stop();
		explode.play();
	}else{
		return;
	}	
	
	heroInArena = -1;	
}

//Removes image and list from arena and adds the dead tiefighter back to the list
function removeDarksideFromArena(){
	tieFire.stop();
	explode.play();
	$(".darksideArenaContent").remove();
	tieFighterFleet[darksideInArena].imgURL = "assets/images/tiefighterDead.png"
	
	$("#darkside").append("<div class='tieIMG' id='tiefighterDIV" + darksideInArena + "'>");
	$("#tiefighterDIV" + darksideInArena).append("<img src='"+tieFighterFleet[darksideInArena].imgURL+"' id='tiefighter"+ darksideInArena + "'>");
	darksideInArena = -1
}

//place StarDestroyer in arena
function starDestroyer(){
	tieFighterFleet.push({
		name: "Star Destroyer Adamant",
		hp: 200,
		attack: 20,
		speed: 5,
		imgURL: "assets/images/starDestroyer.png"
	});

	transferToArena("starDestroyer", tieFighterFleet.length-1);
	writeDarksideInfo(tieFighterFleet.length-1);
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
			speed: 10,
			imgURL: "assets/images/xwing.png"
		});
	}

	//Setup tie-fighter fleet
	for(var i=0; i<6; i++){
		tieFighterFleet.push({
			name: "Tie-Red " + i,
			hp: 50,
			attack: 5,
			speed: 12,
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

//Starts the game on load
start();

//Game Music and sfx
var music = new Howl({
    src: ['assets/music/battleMusic.mp3'],
    ext: ['mp3'],
    autoplay: true,
    html5: true,
    loop: true
});

var r2d2 = new Howl({
  src: ['assets/music/R2D2.mp3'],
  ext: ['mp3'],
  html5: true
});

var tie = new Howl({
  src: ['assets/music/tie.wav'],
  ext: ['wav'],
  html5: true
});

var explode = new Howl({
  src: ['assets/music/explode.mp3'],
  ext: ['mp3'],
  html5: true
});

var retreatSound = new Howl({
  src: ['assets/music/retreat.mp3'],
  ext: ['mp3'],
  html5: true
});

var tieFire = new Howl({
  src: ['assets/music/tieFire.mp3'],
  ext: ['mp3'],
  html5: true
});

var xwingFire = new Howl({
  src: ['assets/music/xwingFire.mp3'],
  ext: ['mp3'],
  html5: true
});

var win = new Howl({
  src: ['assets/music/heroesWin.mp3'],
  ext: ['mp3'],
  html5: true
});

var play = true;
function musicControl(){
	if(play){
		music.pause();
		Howler.mute(true);
		$("#musicBtn").attr("class", "fa fa-volume-off")
	}else{
		Howler.mute(false);
		music.play();
		$("#musicBtn").attr("class", "fa fa-volume-up")
	}
	play = !play;
}

