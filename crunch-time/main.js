
var energyDrinkImg;
var energyDrink;
var liquid;
var liquidImg;
var canGroup;

var compImg, compSprite;
var windSprite;
var faceImg, figureSprite;
var gulpSound, screamSound;

var dumbSprite = [];

var Y_AXIS = 1;
var X_AXIS = 2;

var c1, c2, shiftVar;

var alphaa;

var basicAnim;

var system;

var drinkPoints = 0;
var previousPoints = 0;
var timeRate = 1000;
var canAmount = 100;

var gravity = 0.3;


function preload(){
	energyDrinkImg = loadImage('assets/energyDrink1.png');
	compImg = loadImage('assets/laptop.png');
	faceImg = loadImage('assets/face.png');
	faceImg = loadImage('assets/figureTired.png');
	faceImg = loadImage('assets/figureTired2.png');
	faceImg = loadImage('assets/figureTired3.png');
	faceImg = loadImage('assets/figureTired4.png');
	faceImg = loadImage('assets/figureTired5.png');
  liquidImg = loadImage('assets/tempLiquid.png');


  basicAnim = loadAnimation("assets/figureTired.png","assets/figureTired2.png","assets/figureTired3.png",  "assets/figureTired4.png",  "assets/figureTired5.png");
  
	gulpSound = loadSound('assets/gulp.wav');
	screamSound = loadSound('assets/scream.mp3');

}

function setup() {
  createCanvas(displayWidth, displayHeight);  
  stroke(255);    
  frameRate(120);
  system = new ParticleSystem(createVector(mouseX, height/5));

  canGroup = new Group();

  energyDrink = createSprite(0, -30);
  energyDrink.addImage(energyDrinkImg);
  energyDrink.scale =(0.1);
  energyDrink.rotation = 145;
  /*
  liquid = createSprite(0, 500);
  liquid.addImage(liquidImg);
  liquid.scale = 10;
  //liquid.setCollider("liquid");

  canGroup.add(liquid);
  */
  //canGroup.add(energyDrink);

  //canGroup.add(energyDrink);

  //windSprite = createSprite(width * 0.5, height * 0.25, width * 0.5, height * 0.75);


  //energyDrink.setCollider("energyDrink");
  energyDrink.attractionPoint(.9, mouseX, mouseY);
  //energyDrink.setCollider("energyDrink"); //old version of p5 play?
  energyDrink.setCollider("rectangle", 0, 0, energyDrink.width, energyDrink.height);
  //energyDrink.attractionPoint(.9, mouseX, mouseY);
  energyDrink.rotation = 135;

  //compSprite = createSprite(width/2, height * 0.7);
  //compSprite.addImage(compImg);
  //compSprite.scale =(0.9);



  figureSprite = createSprite(mouseX, mouseY);
  basicAnim.frameDelay = 1;
  figureSprite.addAnimation('basic', basicAnim);
  figureSprite.addImage(faceImg);

  //figureSprite.scale =(0.25);
 // figureSprite.setCollider("player");
 figureSprite.setCollider("circle", 0, 0, figureSprite.width);
  figureSprite.scale =(0.3);
  figureSprite.maxSpeed = 1;

}

function draw() { 
  //smooth(4);
  //console.log("player velocity.x = " + figureSprite.velocity.x);
  background(255,127,80);   
  //background(0, 255, 0, 50);
  

  //canGroup.collide(canGroup);
  canGroup.collide(figureSprite);
  

  edgeCollision();
  //draw all the sprites added to the sketch so far
  //the positions will be updated automatically at every cycle
  drawBackground();
  //drawForeground();

  for (var i = 0; i < canGroup.length; i++){
  	canGroup.get(i).velocity.y+= gravity;

	}
  if (drinkPoints-previousPoints > canAmount){
  	finishedDrink();
  	previousPoints = drinkPoints;
  }


  drawSprites();
  canMovement();
  playerControl();

  var mousePos = createVector(mouseX+(width/15), height/5);
  //system = new ParticleSystem(createVector(mouseX, height/5));
  //system = ParticleSystem(mousePos);
  system.addParticle(mousePos);
  system.run();
} 


function drawBackground(){
  background(255,127,80);   
	strokeWeight(30);
	stroke(0);
	fill(255);


	quad(0.25 * width,	0.75 * height, 
		0.75 * width,	0.75 * height, 
		width,			1.2 * height,
		0,						1.2 * height);


	//shiftVar =  (second() * 10) % 255;
	timeRate = 1000 - drinkPoints;
	shiftVar =  ((millis() / timeRate) * 10) % 255;
	//console.log(shiftVar)

	opacity = 255;

  	c1 = color(80,80, shiftVar, opacity);
  	c2 = color(255-shiftVar, 102, 153, opacity);

  	setGradient(0.25 * width, 	-100, 
				0.5 * width,		0.65 * height, 	c1, c2, Y_AXIS);


	noFill();
	stroke(0);
	strokeWeight(25);


	rect(0.24 * width, 	-100, 
		0.51 * width,		0.65 * height);

	strokeWeight(30);

	rect(0.2 * width, 	-100, 
		0.6 * width,		0.70 * height);

	imageMode(CENTER);
	image(compImg, width/2, height * .7, width * .4, height * .45);

}

function drawForeground(){
	//stroke(0);
	//noStroke();
	//opacity = 10;

  	//c1 = color(180,180, shiftVar, opacity);
  	//c2 = color(shiftVar, 202, 253, opacity);

  	c3 = color(80, 80, shiftVar, 25);
  	c4 = color(255-shiftVar, 102, 153, 25);

  	//c3 = color(255, 50, 255, 0);
  	//c4 = color(50, 50, 255, 100);
    //blendMode(BURN);
    //strokeWeight(1);
    strokeWeight(3);
  	 setGradient(0,				 	0, 
				 width,	height, 	c3, c4, X_AXIS);
  	//blendMode(BLEND);

	fill(red(c2), green(c2), blue(c2), 65);
	noStroke();
	//rect(0,0, width, height);

}


function setGradient(x, y, w, h, color1, color2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(color1, color2, inter);
      stroke(c);
      //console.log(alphaa(c));
      line(x, i, x+w, i);

  /*
    //  var mapI = map(i, y, y+h, )
    blendMode(LIGHTEST);
      stroke(red(c), green(c), blue(c), 10);
      line(0, inter * height, width, inter * height);
    blendMode(BLEND);
  */
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, Y_AXIS);
      var c = lerpColor(color1, color2, inter);
      //console.log("red is ");
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function edgeCollision(){

  //all sprites bounce at the screen edges
  for(var i=0; i<allSprites.length; i++) {
	  var s = allSprites[i];
	  if(s.position.x<0) {
	    s.position.x = 1;
	    s.velocity.x = abs(s.velocity.x);
	  }
	  
	  if(s.position.x>width) {
	    s.position.x = width-1;
	    s.velocity.x = -abs(s.velocity.x);
	    }
	  
	  if(s.position.y<0) {
	    s.position.y = 1;
	    s.velocity.y = abs(s.velocity.y);
	  }
	  
	  if(s.position.y>height) {
	    s.position.y = height-1;
	    s.velocity.y = -abs(s.velocity.y);
    } 
  }

  //keep figure sprite on the bottom
  if (figureSprite.position.y < (0.7 * displayHeight)){
  	figureSprite.position.y = 0.7 * displayHeight;
  	//console.log("sup");
  } else {
  	//console.log("hey");

  }

}

function playerControl(){
  //slow down the player by default -- they speed up by moving the mouse
  figureSprite.velocity.x *= 0.9;


}

function canMovement(){
  /*
  var canSpeed = 10 * random(-2, 2);

  for (var i = 0; i < canGroup.length; i++){
   canGroup[i].position.x += canSpeed;
  }

  */
  energyDrink.position = createVector(mouseX, 0);
  //energyDrink.position.x+= canSpeed;
  /*
    if (liquid.overlap(figureSprite)){
      console.log("liquid player contact");
    }
  */
}

function finishedDrink() {

  var count=dumbSprite.length;

  //energyDrink.attractionPoint(.9, mouseX, mouseY);


  dumbSprite[count] = createSprite(random(0,width),random(0,height));
  //dumbSprite[count].setCollider("dumbSprite[count]");
  dumbSprite[count].setCollider("rectangle", 0, 0, dumbSprite[count].width, dumbSprite[count].height);
  dumbSprite[count].setSpeed(random(2,3), random(0, 36000));
  dumbSprite[count].addImage(energyDrinkImg);
  dumbSprite[count].mass = 500;
  dumbSprite[count].scale =(random(.01, .1));
  dumbSprite[count].collide(dumbSprite[count]);
  //rotate(random(0, 3));
  dumbSprite[count].rotationSpeed = 0.5;
  canGroup.add(dumbSprite[count]);

}

function mouseMoved() {
  if (abs(figureSprite.velocity.x) > 5){

    if(mouseX < displayWidth/2){

      //console.log("setting attraction point to right");
      figureSprite.attractionPoint(300, displayWidth, 0.7 * displayHeight);
    } else {
      //console.log("setting attraction point to left");

      figureSprite.attractionPoint(300, 0, 0.7 * displayHeight);
    }
  } else {
  	figureSprite.attractionPoint(3, mouseX, height * 0.75);
  }
	//drawForeground();

    if (figureSprite.animation.frameDelay < 5){
     figureSprite.animation.frameDelay += 1;
     }
}


///////////// ORIGINAL PARTICLE SYSTEM FROM NATUREOFCODE

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.5);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 150.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;


  var threshold = width/10;
  	//console.log(dist(this.position, figureSprite.position ));
  	//console.log(figureSprite.position);
  if (threshold > dist(this.position.x, this.position.y, figureSprite.position.x, figureSprite.position.y )){
  	drinkPoints++;
    if (figureSprite.animation.frameDelay > 2){ //basicAnim.frameDelay>2){
          figureSprite.animation.frameDelay -= 1;
        }
    
    console.log("basicanim delay= " + figureSprite.animation.frameDelay);

  //figureSprite.addAnimation('basic', basicAnim);
  	//if (!gulpSound.isPlaying()){
  		//screamSound.stop();
  		//gulpSound.playMode('restart');
  		gulpSound.play();
  	//}
  	//console.log(drinkPoints);
  	this.lifespan = -1;
  	figureSprite.maxSpeed+= 0.1;
  } else {
  	screamSound.playMode('restart');
  	if (!screamSound.isPlaying()){
  		//screamSound.play();
  	}

  }


};

// Method to display
Particle.prototype.display = function() {
  fill(50, 220, 50, this.lifespan);

  var size = width/30;
  noStroke();
  //ellipse(this.position.x, this.position.y, size, size);
  stroke(50, 220, 50, this.lifespan);
  strokeWeight(5000 * (1/this.lifespan));
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(position) {
  this.particles.push(new Particle(position));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    var pPrevious = this.particles[i+1];
    var pNext = this.particles[i-1];

    if (i < this.particles.length-2){
    	pPrevious = this.particles[i+1];
    } else {
    	pPrevious = this.particles[i];
    }

    if (i > 0){
    	pNext = this.particles[i-1];
    } else {
    	pNext = this.particles[i];
    }

    p.run();


    line(p.position.x, p.position.y, pPrevious.position.x, pPrevious.position.y);
    line(p.position.x, p.position.y, pNext.position.x, pNext.position.y);
  
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
