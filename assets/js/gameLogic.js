//Fighter Details
var xwing = {
	name: "X-Wing",
	hp: 100,
	attack: 10,
	speed: 7,
	imgURL: "<img src='assets/images/xwing.png' width='100px'>"
}

var tiefighter = {
	name: "Tie Fighter",
	hp: 50,
	attack: 5,
	speed: 10,
	imgURL: "<img src='assets/images/tiefighter.png' width='100px'>"
}

//Test to place images
for (var i = 0; i < 6; i++) {
	$("#heroes").append(xwing.imgURL);
}

for (var i = 0; i < 6; i++) {
	$("#darkside").append(tiefighter.imgURL);
}