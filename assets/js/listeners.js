//Document Ready
$(document).ready(function() {


	//When X-Wing 0 is clicked, remove it and place it in the arena.
	$("#xwing0").on("click", function(){
		console.log("hello");
		transferToArena("xwing",0);
		writeHeroInfo(0);
	});

	//When X-Wing 1 is clicked, remove it and place it in the arena.
	$("#xwing1").on("click", function(){
		console.log("hello");
		transferToArena("xwing",1);
		writeHeroInfo(1);
	});

	//When X-Wing 2 is clicked, remove it and place it in the arena.
	$("#xwing2").on("click", function(){
		console.log("hello");
		transferToArena("xwing",2);
		writeHeroInfo(2);
	});

	//When TieFighter 0 is clicked, remove it and place it in the arena.
	$("#tiefighter0").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",0)
		writeDarksideInfo(0);
	});

	//When TieFighter 1 is clicked, remove it and place it in the arena.
	$("#tiefighter1").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",1)
		writeDarksideInfo(1);
	});

	//When TieFighter 2 is clicked, remove it and place it in the arena.
	$("#tiefighter2").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",2)
		writeDarksideInfo(2);
	});

	//When TieFighter 3 is clicked, remove it and place it in the arena.
	$("#tiefighter3").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",3)
		writeDarksideInfo(3);
	});

	//When TieFighter 4 is clicked, remove it and place it in the arena.
	$("#tiefighter4").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",4)
		writeDarksideInfo(4);
	});

	//When TieFighter 5 is clicked, remove it and place it in the arena.
	$("#tiefighter5").on("click", function(){
		console.log("hello");
		transferToArena("tiefighter",5)
		writeDarksideInfo(5);
	});

});
