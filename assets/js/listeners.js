// // //Document Ready
$(document).ready(function() {


	//When an X-Wing is clicked, remove it and place it in the arena.
	$(document.body).on("click", ".xIMG" ,function(){
		
		if(heroInArena != -1){ //If there is already an xwing in the arena remove it first
			removeHeroFromArena(true);
		}

		r2d2.play();
		var num = $(this).attr("id");
		num = num.substring(num.length-1);
		$(this).animate({opacity: "0.05"});	
		transferToArena("xwing",num);
		writeHeroInfo(num);
	});


	//When TieFighter 0 is clicked, remove it and place it in the arena.
	$(".tieIMG").on("click" ,function(){
		tie.play();
		var num = $(this).attr("id");
		num = num.substring(num.length-1);

		transferToArena("tiefighter",num)
		writeDarksideInfo(num);
		console.log("hello" + num);
	});

});
