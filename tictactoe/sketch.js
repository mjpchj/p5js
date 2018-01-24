function windowResized() { //dynamically resizes canvas to window size
 
 	resizeCanvas(windowWidth, windowHeight);
}

function make2DArray(cols, rows) { //creates generic 2D array

	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;

	let gameArray;

}

function mousePressed() {

	let g; 
   	let length;

 	//get g value from URL
	let params = getURLParams();
   
    if(params.g >= 3 && params.g <= 5) {

    	g = params.g;
    
    } else {

    	g = 3;

    }

    if (windowWidth > 700) {

    	length = windowWidth/2;
    
    } else {
    	
    	length = 350;
    
    }

    let symsize = length/(2*g); //symbol size relative to grid

    //top left position within grid
    let px = (windowWidth/2) + symsize - (length/2); 
    let py = (windowHeight/2) + symsize - (length/2);

    let full;
    let currentSymbol;
    
	if (mouseX > px && mouseX < px+length && mouseY > py && mouseY < py+length) { //within grid

        full += 1;

        let xlocation = floor((mouseX-px)/(length/g)) //converts where mouse is on grid to integer 
       	let ylocation = floor((mouseY-py)/(length/g)) //converts where mouse is on grid to integer

        if (gameArray[xlocation][ylocation] == 0 || gameArray[xlocation][ylocation] == 1){ //prevents new symbol being written to array if one is already there
            //do nothing
        } else {
            gameArray[xlocation][ylocation] = currentSymbol; //puts current symbol into array at location of click
        }

        if(sumRow >= g || sumCol >= g || sumDiagTop >= g || sumDiagBot >= g) { //clear array is game was won on last click
            gameArray = make2DArray(cols, rows);
            full = 0;
        } 

        if (full >= (g*g)+1) {
            grid = make2DArray(cols, rows);
            full = 0;
        } 
   
        //CHECK FOR WINNING CRITERIA

        let sumRow = 0; //as game not won, resets counter
        let sumCol = 0; //as game not won, resets counter
        let sumDiagTop = 0; //as game not won, resets counter
        let sumDiagBot = 0; //as game not won, resets counter

        //add one  to sum for each symbol that matches current symbol in same row
        for (let i = 0; i < cols; i++) {
            if(gameArray[i][ylocation] == currentSymbol) {
                sumRow += 1    
            }    
        }

        //add one  to sum for each symbol that matches symbol in same column
        for (let i = 0; i < rows; i++) {
            if(gameArray[xlocation][i] == currentSymbol) {
                sumCol += 1;    
            }    
        }

        //add one  to sum for each symbol that matches symbols diagonally top-to-bottom
        for (let i = 0; i < g; i++) {
            if(gameArray[i][i] == currentSymbol) {
                sumDiagTop += 1    
                }    
            }
        
        //add one  to sum for each symbol that matches symbols diagonally bottom-to-top
        
        let k = g;

        for (let i = 0; i < g; i++) {
            k -=1
            if(gameArray[i][k] == currentSymbol) {
                sumDiagBot += 1    
                }    
            }      


            //ALTERNATE SYMBOLS
        if (currentSymbol == 0){
                currentSymbol = 1;
                symbolText = 'Noughts';
        }   else if (currentSymbol == 1){
                    currentSymbol = 0;
                    symbolText = 'Crosses';
            }
    

    //Status of counters for debugging    
    // print('NEW TURN');
    // print('sumRow = ' + sumRow);
    // print('sumCol = ' + sumCol);
    // print('sumDiagTop = ' + sumDiagTop);
    // print('sumDiagBot = ' + sumDiagBot);

    }

}
           

function drawGrid(g, length) { //draws grid lines

	let symsize = length/(2*g); //symbol size

    let pointX = (windowWidth/2) + symsize - (length/2); //defines top left  x-coordinate of grid
    let pointY = (windowHeight/2) + symsize - (length/2); //defines top left y-coordinate of grid 
	
	for (let i = 1; i < g; i++) { //draws as as main lines as needed to complete internal lines of g x g grid

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

function symbols(g, s, x, y) { // g is grid size, s is which symbol, x and y are locations within the grid

	let symsize = length/(2*g); //symbol size relative to grid

    //top left position within grid
    let px = (windowWidth/2) + symsize - (length/2); 
    let py = (windowHeight/2) + symsize - (length/2);
	

   	if (s == 0) {
    	
    	//symbol O
    	stroke(210);
    	strokeWeight(12);
    	noFill();
    	ellipse (x+px, y+py, symsize, symsize);

  	} else if (s == 1) {
    	
    	//symbol X
    	stroke(210);
    	strokeWeight(12);
    	strokeCap(SQUARE);
    	line(x+px-(symsize/2), y+py-(symsize/2), x+px+symsize-(symsize/2), y+py+symsize-(symsize/2));
    	line(x+px-(symsize/2), y+py+symsize-(symsize/2), x+px+symsize-(symsize/2), y+py-(symsize/2));
  } 

}

function drawSymbols(g) {

	let cols = g;
	let rows = g;

	//DRAWS SYMBOLS FROM ARRAY VALUES
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            
            let x = i * (length/g);
            let y = j * (length/g);
            symbols(g, gameArray[i][j], x, y);

        }

	}

}

//p5 setup
function setup(){
  createCanvas(windowWidth,windowHeight);
	
	//get g value from URL
	let params = getURLParams();
   	let g; 
   
    if(params.g >= 3 && params.g <= 5) {

    	g = params.g;
    
    } else {

    	g = 3;

    }

 print(g);

  //create 2D array
  gameArray = make2DArray(g, g);

  
}//end setup

//p5 Draw function
function draw(){

	background(130, 130, 230); //fills background purple

 	let g; 
   	let length;

 	//get g value from URL
	let params = getURLParams();
   
    if(params.g >= 3 && params.g <= 5) {

    	g = params.g;
    
    } else {

    	g = 3;

    }

    if (windowWidth > 700) {

    	length = windowWidth/2;
    
    } else {
    	
    	length = 350;
    
    }

	drawGrid(g, length); 

	drawSymbols(g);

} //end p5 draw() function


