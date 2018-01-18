//Global Variables

//p5 setup
function setup(){
  createCanvas(windowWidth,windowHeight);

  //setup code goes here
  
}//end setup

//p5 Draw function
function draw(){

	background(130, 130, 230);

	let h = hour();
	let m = minute();
	let s = second();

	let hw = (h/24)*windowWidth;
	let mw = (m/60)*windowWidth;
	let sw = (s/60)*windowWidth;


	fill(210);
	stroke(255);
	strokeWeight(0);
	rect(0, 0, hw, windowHeight*(1/3));
	fill(170);
	rect(0, windowHeight*(1/3), mw, windowHeight*(1/3));
	fill(130);
	rect(0, windowHeight*(2/3), sw, windowHeight);


	for(i = 0; i < 24; i++){

		let x = (i/24)*windowWidth;
		fill(0);
		strokeWeight(0);
		rect(x, 0, 10, 30);

	}

	for(i = 0; i < 60; i++){

		let x = (i/60)*windowWidth;
		fill(0);
		strokeWeight(0);
		rect(x, windowHeight/3, 5, 15);
		rect(x, windowHeight*(2/3), 5, 15);
	}

  //this code will run about 30 times a second

}//end p5 draw() function

function windowResized() { //dynamically resizes canvas to window size
 
 	resizeCanvas(windowWidth, windowHeight);
}
