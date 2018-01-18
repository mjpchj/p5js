let grid;
let length = 500;
let currentSymbol = 0;
let symbolText = 'Noughts'; 
let sumRow;
let sumCol;
let sumDiagTop;
let sumDiagBot;
let full = 0;  

function make2DArray(cols, rows) { //creates generic 2D array

	let arr = new Array(cols);
	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(rows);
	}
	return arr;
}

function symbols(s, x, y) { //function to draw symbols

	let symsize = length/(2*g); //symbol size

    //top left position
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

function mousePressed() {

    clicked(); //runs clicked() on mouse press
}

function clicked() {

    if(params.g >= 3 && params.g <= 6) { //option to set grid size through URL parameter
        g = params.g;
    } else {
        g = 4; //default to for is ULR parameter 3>g<6, or not defined
    }

    let cols = g;
    let rows = g;
 
    let px = (windowWidth/2)-(length/2) //initial left x position
    let py = (windowHeight/2)-(length/2) //initial left y position

	if (mouseX > px && mouseX < px+length && mouseY > py && mouseY < py+length) { //within grid

        full += 1;

        xlocation = floor((mouseX-px)/(length/g)) //converts where mouse is on grid to integer 
       	ylocation = floor((mouseY-py)/(length/g)) //converts where mouse is on grid to integer

        if (grid[xlocation][ylocation] == 0 || grid[xlocation][ylocation] == 1){ //prevents new symbol being written to array if one is already there
            //do nothing
        } else {
            grid[xlocation][ylocation] = currentSymbol; //puts current symbol into array at location of click

                //ALTERNATE SYMBOLS
        if (currentSymbol == 0){
                currentSymbol = 1;
                symbolText = 'Noughts';
        }   else if (currentSymbol == 1){
                    currentSymbol = 0;
                    symbolText = 'Crosses';
            }
        }

        if(sumRow >= g || sumCol >= g || sumDiagTop >= g || sumDiagBot >= g) { //clear array is game was won on last click
            grid = make2DArray(cols, rows);
            full = 0;
        } 

        if (full >= (g*g)+1) {
            grid = make2DArray(cols, rows);
            full = 0;
        } 
   
        //CHECK FOR WINNING CRITERIA

        sumRow = 0; //as game not won, resets counter
        sumCol = 0; //as game not won, resets counter
        sumDiagTop = 0; //as game not won, resets counter
        sumDiagBot = 0; //as game not won, resets counter

        //add one  to sum for each symbol that matches current symbol in same row
        for (let i = 0; i < cols; i++) {
            if(grid[i][ylocation] == currentSymbol) {
                sumRow += 1    
            }    
        }

        //add one  to sum for each symbol that matches symbol in same column
        for (let i = 0; i < rows; i++) {
            if(grid[xlocation][i] == currentSymbol) {
                sumCol += 1;    
            }    
        }

        //add one  to sum for each symbol that matches symbols diagonally top-to-bottom
        for (let i = 0; i < g; i++) {
            if(grid[i][i] == currentSymbol) {
                sumDiagTop += 1    
                }    
            }
        
        //add one  to sum for each symbol that matches symbols diagonally bottom-to-top
        
        let k = g;

        for (let i = 0; i < g; i++) {
            k -=1
            if(grid[i][k] == currentSymbol) {
                sumDiagBot += 1    
                }    
            }      

    

    //Status of counters for debugging    
    // print('NEW TURN');
    // print('sumRow = ' + sumRow);
    // print('sumCol = ' + sumCol);
    // print('sumDiagTop = ' + sumDiagTop);
    // print('sumDiagBot = ' + sumDiagBot);

    }
} // END OF CLICKED()
        
function setup() {
    createCanvas(windowWidth, windowHeight); //creates canvas

	let params = getURLParams();

    if(params.g >= 3 && params.g <= 6) { //option to set grid size through URL parameter
        g = params.g;
    } else {
        g = 4; //default to for is ULR parameter 3>g<6, or not defined
    }

    let cols = g;
    let rows = g;
    
    grid = make2DArray(cols, rows); //create 2D array
 
}

function draw() {
    background(130, 130, 230); //fills background purple



    if (sumRow == g || sumCol == g || sumDiagTop == g || sumDiagBot == g) { //alerts of win
        textSize(36); 
        strokeWeight(1);
        fill(210);
        textAlign(CENTER);
        text(symbolText + ' WIN!', windowWidth/2, 100);
        textSize(20); 
        text('Click to reset.', windowWidth/2, 126);
    }

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

    //DRAWS SYMBOLS FROM ARRAY VALUES
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            
            let x = i * (length/g);
            let y = j * (length/g);
            symbols(grid[i][j], x, y);

        }

    } 
}

function windowResized() { //dynamically resizes canvas to window size
 
 	resizeCanvas(windowWidth, windowHeight);
}
