
var tip = [];
for(i = 0; i < 5; i++){
	tip.push({x:0, y:0});
}

var pitch = 0.55;
var bigness = 10;

var colors = chroma.scale(['yellow', 'red', 'black'])
    .mode('lch');
var colorScale = d3.scaleLinear()
		.domain([-1,1])
		.range([0,1]);

var sizeScale = d3.scaleLinear()
		.domain([-500,500])
		.range([100, 5]);


function setup() {
	createCanvas(displayWidth, displayHeight);
	$('canvas').attr('id', 'canvas');
	background(10, 10, 10);
	fill(0,0,255);	
}

function draw() {
	var color = colors(colorScale(pitch));
	color = color.rgb();
	color.push(10); //opacity
	fill(color);
	
	stroke(0,0,0,0);

	for(i = 0; i < tip.length; i++){
		ellipse(tip[i].x, tip[i].y, bigness, bigness );
	}

}


Leap.loop(function(frame) {
	if(frame.hands.length == 0){
		x = 0;
		y = 0;
		bigness = 0;
	}
  	frame.hands.forEach(function(hand, index) {
		var pos = hand.screenPosition();
		pitch = hand.pitch();
		bigness = sizeScale(pos[2]);
		x = pos[0];
		y = pos[1];

		hand.fingers.forEach(function(finger, index){
			var pos = finger.screenPosition();
			tip[index].x = pos[0];
			tip[index].y = pos[1];
		});
  });

}).use('screenPosition', {scale: 0.25});

$(document).click(function(){
	var canvas = document.getElementById('canvas');
	var dataURL = canvas.toDataURL();
});