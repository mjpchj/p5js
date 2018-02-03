

let grid;
let cols;
let rows;
let resolution = 150;
let initial = 2;

function make2DArray(cols, rows) { //creates 2D array
  let arr = new Array(rows);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function countEmpty() { //counts empty cells in array

	let counter = 0;

	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {

    		if(grid[i][j] == null) {

    			counter += 1;

    		}	

		}
	}

	return empty = counter; 

}

function fillArray() { //test function

	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {
  		
    	grid[i][j] = floor(random(10));

		}

	}

}

function starter() { //starts off with two of initial value

	for (let i = 0; i < rows; i++) {
    	for (let j = 0; j < cols; j++) {

    		grid[i][j] = null;	

    	}
    }	

	let a = floor(random(4));
	let b = floor(random(4));
	
	grid[a][b] = initial;

}

function newInitial() { //starts off with two of initial value

	let a = floor(random(4));
	let b = floor(random(4));
	
	if(grid[a][b] != null) {
		
		a = floor(random(4));
	 	b = floor(random(4));

	} else {

		grid[a][b] = initial;
	}

}

function drawGrid () {
	
	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {
     		let x = (i * resolution) + (windowWidth / 2) - (resolution * (cols / 2));
     		let y = (j * resolution) + (windowHeight / 2) - (resolution * (rows / 2));
      
        	fill(210);
        	stroke(175);
        	strokeWeight(5);
        	rect(x, y, resolution - 1, resolution - 1);
    }
  } //draws grid

}

function drawValues() {

	for (let i = 0; i < cols; i++) {
    	for (let j = 0; j < rows; j++) {

    	let x = (i * resolution) + (windowWidth / 2) - (resolution * (cols / 2));
     	let y = (j * resolution) + (windowHeight / 2) - (resolution * (rows / 2));


     	fill(0);
     	stroke(0);
     	strokeWeight(0);
     	textSize(50);
     	textAlign(CENTER, CENTER);

     	if(grid[i][j] == null){

		} else {
			text(grid[i][j], x, y, resolution + 15, resolution)
		}
    	
    	

   		}
   	}	 //draws values from array

}

function movement(xMove, yMove) {

	print(xMove);
	print(yMove);
	let newX;
	let newY;

	for (let i = 0; i < rows; i++) {
    	for (let j = 0; j < cols; j++) {

    			if(xMove != 0) {

					while (i > 0 && i < cols - 1){

    					i = i + xMove;
    				}

    				newX = i;
    			
    			} else {

    				newX = i;

    			}

    			if(yMove != 0) {

					while (j > 0 && j < rows - 1){

    					j = j + yMove;
    				}

    				newY = i;
    			
    			} else {

    				newY= i;

    			}


    			grid[newX][newY] = grid[i][j];
    			grid[i][j] = null;

    	}
    }

 }	

function keyPressed() {

	let xMove;
	let yMove;

  	if (keyCode === DOWN_ARROW) {
    	xMove = 0;
    	yMove = 1;   
	}

	if (keyCode === UP_ARROW) {
    	xMove = 0;
    	yMove = -1;   
	}

	if (keyCode === RIGHT_ARROW) {
    	xMove = 1;
    	yMove = 0;   
	}

	if (keyCode === LEFT_ARROW) {
    	xMove = -1;
    	yMove = 0;

	}

	movement(xMove, yMove);

	//newInitial();

	return 0;	
}



function setup() {
  
  	createCanvas(windowWidth, windowHeight);
  	
  	cols = 4;
  	rows = 4;

 	grid = make2DArray(cols, rows);

 	starter()

 	empty = countEmpty();

 	print('Empty: ' + empty);
  
}

function draw() {
  	
  	background(130, 130, 230);

  	drawGrid();

  	drawValues();

}