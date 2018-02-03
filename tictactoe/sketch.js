//Global Variables

function definitions() {

    //g is the dimensions of the grid (g by g)
    let g;
    let params = getURLParams(); //retrieves deisred size from URL

    if(params.g >= 3 && params.g <= 5) {  //if URL-defined g is between 3 and 5

            this.g = params.g; // sets g to URL-defined value
    
    } else {

            this.g = 3; //else g = 3
    } 

    //length is the size of every grid line
    let length;
    this.length =  windowWidth/2;

}

function definitions2() {

    let full;
    this.full = 0;
    
    let symbolText;
    this.symbolText = 'Noughts';

    let sumRow;
    this.sumRow = 0; //as game not won, resets counter

    let sumCol;
    this.sumCol = 0; //as game not won, resets counter

    let sumDiagTop; 
    this.sumDiagTop= 0; //as game not won, resets counter

    let sumDiagBot;
    this.sumDiagBot = 0; //as game not won, resets counter

}

function make2DArray() { //creates generic 2D array
    let arr = new Array(g);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(g);
    }
    return arr;
}

function windowResized() { //dynamically resizes canvas to window size
 
    resizeCanvas(windowWidth, windowHeight);
}

function win() {
    //CHECK FOR WINNING CRITERIA

        //add one  to sum for each symbol that matches current symbol in same row
        for (let i = 0; i < g; i++) {
            if(grid[i][ylocation] == currentSymbol) {
                sumRow += 1;  
                
            }    
        }

        //add one  to sum for each symbol that matches symbol in same column
        for (let i = 0; i < g; i++) {
            if(grid[xlocation][i] == currentSymbol) {
                sumCol += 1;    
            }    
        }

        //add one  to sum for each symbol that matches symbols diagonally top-to-bottom
        for (let i = 0; i < g; i++) {
            if(grid[i][i] == currentSymbol) {
                sumDiagTop += 1;    
                }    
            }
        
        //add one  to sum for each symbol that matches symbols diagonally bottom-to-top
        
        let k = g;

        for (let i = 0; i < g; i++) {
            k -=1
            if(grid[i][k] == currentSymbol) {
                sumDiagBot += 1;   
                }    
            }  
}

function alertWin() {

        if (sumRow == g || sumCol == g || sumDiagTop == g || sumDiagBot == g) { //alerts of win
            textSize(36); 
            strokeWeight(1);
            fill(210);
            textAlign(CENTER);
            text(symbolText + ' WIN!', windowWidth/2, 100);
            textSize(20); 
            text('Click to reset.', windowWidth/2, 126);
    } 
}

function clicked() {
 
    let pointX = (windowWidth/2)-(length/2) //initial left x position
    let pointY = (windowHeight/2)-(length/2) //initial left y position

    if (mouseX > pointX && mouseX < pointX + length && mouseY > pointY && mouseY < pointY+length) { //within grid

        full += 1;

        xlocation = floor((mouseX-pointX)/(length/g)) //converts where mouse is on grid to integer 
        ylocation = floor((mouseY-pointY)/(length/g)) //converts where mouse is on grid to integer

        if (grid[xlocation][ylocation] == 0 || grid[xlocation][ylocation] == 1){ //prevents new symbol being written to array if one is already there
            //do nothing
        } else {
            grid[xlocation][ylocation] = currentSymbol; //puts current symbol into array at location of click
        }  

        if(sumRow >= g || sumCol >= g || sumDiagTop >= g || sumDiagBot >= g) { //clear array is game was won on last click
            grid = make2DArray(g, g);
            full = 0;
        } 

        //rese
        if (full >= (g*g)+1) {
            grid = make2DArray(g, g);
            full = 0;
        } 
   
        win();

       //ALTERNATE SYMBOLS
        if (currentSymbol == 0){
                currentSymbol = 1;
                symbolText = 'Noughts';
        }   else {
                    currentSymbol = 0;
                    symbolText = 'Crosses';
        }

    }

} //end of clicked()

function mousePressed() {
    clicked();

}

function drawGrid () {

       let symsize = length/(2 * g);

        // x-coordinate of top left corner of whole grid space
        let pointX = (windowWidth/2) + symsize - (length/2); 

        // y-coordinate of top left corner of whole grid space
        let pointY = (windowHeight/2) + symsize - (length/2); 

        //draws g by g grid
        for (let i = 1; i < g; i++) {

            let incr = (length/g)*(i-1) //moves on to next line coordinates

            //horizontal line
            stroke(210);
            strokeWeight(12);
            strokeCap(SQUARE);
            line(pointX - symsize, pointY + symsize + incr, pointX + length - symsize, pointY + symsize + incr);
              
            //vertical line
            stroke(210);
            strokeWeight(12);
            strokeCap(SQUARE);
            line(pointX + symsize + incr, pointY - symsize, pointX + symsize + incr, pointY + length - symsize);
          
        }
    }


function symbols(s, x, y) { //function to draw symbols

    let symsize = length/(2*g); //symbol size

    //top left position
    let pointX = (windowWidth/2) + symsize - (length/2); 
    let pointY = (windowHeight/2) + symsize - (length/2);
    

    if (s == 0) {
    //symbol O
    stroke(210);
    strokeWeight(12);
    noFill();
    ellipse (x + pointX, y + pointY, symsize, symsize);
  } else if (s == 1) {
    //symbol X
    stroke(210);
    strokeWeight(12);
    strokeCap(SQUARE);
    line(x + pointX - (symsize / 2), y + pointY - (symsize / 2), x+ pointX + symsize - (symsize / 2), y + pointY + symsize - (symsize / 2) );
    line(x + pointX - (symsize / 2), y + pointY + symsize - (symsize / 2), x + pointX + symsize - (symsize / 2), y + pointY - (symsize / 2) );
  } 
}

function drawSymbols () { //draws in symbols from array values
    
    //DRAWS SYMBOLS FROM ARRAY VALUES
    for (let i = 0; i < g; i++) {
        for (let j = 0; j < g; j++) {
            
            let x = i * (length/g);
            let y = j * (length/g);
            symbols(grid[i][j], x, y);

        }
    }
}

//--------------------------------------------------------
// p5.js required functions
//--------------------------------------------------------

//p5 setup
function setup(){
  createCanvas(windowWidth,windowHeight);

  definitions();

  let currentSymbol;
  this.currentSymbol = 0;

  grid = make2DArray(g);
  
}//end setup

//p5 Draw function
function draw(){

    definitions();
    definitions2();
    
    background(130, 130, 230); //fills background purple

    drawGrid();

    drawSymbols();

    alertWin();

}//end p5 draw() function