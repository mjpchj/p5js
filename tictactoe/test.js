let g = 3;
let count;
let length = 500;

function make2DArray(cols, rows) { //creates generic 2D array

	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;

}

function setup() {
    
    createCanvas(windowWidth, windowHeight); //creates canvas

	grid = make2DArray(g, g); //create 2D array
}

function draw() {

    background(130, 130, 230); //fills background purple

    stroke(210);
	strokeWeight(2);
	line(0, windowHeight/2, windowWidth, windowHeight/2);
	line(windowWidth/2, 0, windowWidth/2, windowHeight);


 //    let px = (windowWidth/2)-(length/g); //centering
	// let py = (windowHeight/2)-(length/g); //centering
	// let symsize = length/(2*g); //symbol size

 //    //DRAWS GRID
	// for (let i = 1; i < g; i++) {

	// 	let incr = (length/g)*(i-1) //moves on to next line coordinates

	// 	//horizontal line
 //        stroke(210);
 //        strokeWeight(12);
 //        strokeCap(SQUARE);
 //        line(px-symsize, py+symsize+incr, px+length-symsize, py+symsize+incr);
      
 //        //vertical line
 //        stroke(210);
 //        strokeWeight(12);
 //        strokeCap(SQUARE);
 //        line(px+symsize+incr, py-symsize, px+symsize+incr, py+length-symsize);
      
 //    }


 		//top left point of grid

 		let symsize = length/(2*g); //symbol size

 		let pointX = (windowWidth/2) + symsize - (length/2);
 		let pointY = (windowHeight/2) + symsize - (length/2);


 		//DRAWS GRID
		for (let i = 1; i < g; i++) {

		let incr = (length/g)*(i-1) //moves on to next line coordinates

		//horizontal line
        stroke(210);
        strokeWeight(12);
        strokeCap(SQUARE);
        line(pointX-symsize, pointY+symsize+incr, pointX+length-symsize, pointY+symsize+incr);
      
        //vertical line
        stroke(210);
        strokeWeight(12);
        strokeCap(SQUARE);
        line(pointX+symsize+incr, pointY-symsize, pointX+symsize+incr, pointY+length-symsize);
      
    }

}

function windowResized() { //dynamically resizes canvas to window size
 
 	resizeCanvas(windowWidth, windowHeight);
}
