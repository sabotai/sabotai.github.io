/*
var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;

function setup() {
  createCanvas(480, 120);
  stroke(0, 102);
}

function draw() {
  var targetX = mouseX;
  x += (targetX - x) * easing;
  var targetY = mouseY;
  y += (targetY - y) * easing;
  var weight = dist(x, y, px, py);
  strokeWeight(weight);
  line(x, y, px, py);
  py = y;
  px = x;
}


*/

var x, y; // translation x and y variables
var howManyLines = 1;

function setup(){
  createCanvas(600,400);
  stroke(255);
}

function draw(){
  background(0);
  //howManyLines = (mouseX / 1.5);
  howManyLines*=1.006;
  
  /*
  if (int(howManyLines%2) == 0){
   stroke(0, 200, 255); 
   strokeWeight(2);
  } else {
   stroke(100, 200, 50);
  strokeWeight(1); 
  }
  println(int(howManyLines%2));
  */
  
  
  translate(x,y);

  
  for ( var i = 0; i <= howManyLines; i++){
    
    var maxWeight = 3;
    
    var ii = i;
    var spacing = height / (howManyLines); 
    
    
    var percentComplete = i / howManyLines;
      //stroke(200 + (255 * percentComplete));
    var myWeight = percentComplete * maxWeight;
      
    
    if (i > howManyLines - i){ // causes it to expand in the middle
      ii = -i;
      myWeight = maxWeight - maxWeight * percentComplete; 
    } else {
    }
      strokeWeight( myWeight);
    
    var lineStart = width * percentComplete + ii;
    var lineEnd = (width - width*percentComplete) - ii;
   
    line(    lineStart       , spacing * i,     lineEnd    ,spacing * i);
    
  }
  
}

function mouseDragged(){
 x += mouseX-pmouseX;
 y += mouseY-pmouseY;

}