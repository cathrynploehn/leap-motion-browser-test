

var x = 400, y = 300;
var w = 100, h = 100;
var tip = [];
var pitch = 0.55;

var colors = chroma.scale(['yellow', 'red', 'purple']);
var colorScale = d3.scaleLinear()
		.domain([-1,1])
		.range([0,1]);

for(i = 0; i < 5; i++){
	tip.push({x:0, y:0});
}

function setup() {
	createCanvas(displayWidth, displayHeight);
	background(0, 0, 0);
	fill(0,0,255);	
}

function draw() {
	var color = colors(colorScale(pitch)).alpha(0.5);
	color = color.rgb();
	background(0, 0, 0, 1);
	// console.log(color)
	// color = chroma.random().rgb();


	fill(color);
	stroke(0,0,0,0);

	for(i = 0; i < tip.length; i++){
		ellipse(tip[i].x, tip[i].y, 50, 50 );
	}

	// ellipse(x, y, w, h);

}


Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
		var pos = hand.screenPosition();
		pitch = hand.pitch();
		// console.log(pitch);
		x = pos[0];
		y = pos[1];
		hand.fingers.forEach(function(finger, index){
			var pos = finger.screenPosition();
			// console.log(pos);
			tip[index].x = pos[0];
			tip[index].y = pos[1];
		});
  });

}).use('screenPosition', {scale: 0.25});
