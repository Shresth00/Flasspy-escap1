var bird, candy, Gcandy, rock, ground;
var birdanm, candyanm, Gcandyanm, Rockanm, backgroundanm; 
var candyGroup, GcandyGroup, RockGroup;
var score = 0;
var lives = 3;
var gamestate = "start";

function preload() {
birdanm = loadAnimation("Bird 1.png", "bird 2.png", "bird 4.png");
birdanm2 = loadAnimation("Bird 1.1.png","Bird 2.2.png", "Bird 4.4.png");
candyanm = loadImage("candy for bird.png");
backgroundanm = loadImage("BG for Flasppy.jpg");
Gcandyanm = loadImage("GCandy.png");
Rockanm = loadImage ("Rock.png")
} 

function setup() {
  createCanvas(displayWidth, displayHeight);
  bird = createSprite(displayWidth/2, displayHeight/2, 50, 50);
  //bird.debug = true;
  bird.setCollider("rectangle", 0, 0, 100, 100);
  bird.addAnimation("bird1", birdanm);
  bird.addAnimation("bird2", birdanm2);
  candyGroup = new Group();
  GcandyGroup = new Group();
  RockGroup = new Group();
}

function draw() {
  background(backgroundanm);
  
  if (gamestate === "start"){
  if(keyDown(LEFT_ARROW)){
    bird.changeAnimation("bird2", birdanm2);
   bird.x = bird.x - 10;
  }

  if(keyDown(RIGHT_ARROW)){
    bird.changeAnimation("bird1", birdanm);
    bird.x = bird.x + 10;
   }

   spawncandy();
   for(var i = 0; i< candyGroup.length; i++){ 
    if(candyGroup.get(i).isTouching(bird)){
      score += 1;
        candyGroup.get(i).destroy();}   
        
    }

    spawnGcandy();
    for(var i = 0; i< GcandyGroup.length; i++){ 
     if(GcandyGroup.get(i).isTouching(bird)){
       score += 5;
         GcandyGroup.get(i).destroy();}   
         
     }

     spawnRock();
    for(var i = 0; i< RockGroup.length; i++){ 
     if(RockGroup.get(i).isTouching(bird)){
       score -= 10;
       lives -= 1;
         RockGroup.get(i).destroy();}   
         
     }
    
     if (lives === 0){
       textSize (40);
       text ("Game Over", 400, 200); 
       gamestate = "end";
     }
    }
    else if(gamestate === "end"){
       textSize (40);
       fill("red");
       text ("Game Over", 300, 200);
       candyGroup.setlifeTimeEach(0);
       GcandyGroup.setlifeTimeEach(0);
       RockGroup.setlifeTimeEach(0);
       score = 0;

    }

  drawSprites();
  textSize(30);
  text("score:"+score, 50, 60);
  text ("lives:"+lives, 50, 80);
  
}

function spawncandy(){
  if(World.frameCount% 60 === 0){
    var r = Math.round(random( 100, displayWidth-100))
    candy = createSprite (r, 0);
    //candy.debug = true;
    candy.setCollider ("rectangle", 0, 0, 70, 70);
    candy.addImage("candy", candyanm);
    candy.velocityY = 2;
    candy.scale = 0.5  ;
    candyGroup.add(candy);
  }
}function spawnGcandy(){
  if(World.frameCount% 200 === 0){
    var r = Math.round(random(100, displayWidth-100))
    Gcandy = createSprite (r, 0);
    //Gcandy.debug = true;
    Gcandy.setCollider ("rectangle", 0, 0, 70, 70);
    Gcandy.addImage("Gcandy", Gcandyanm);
    Gcandy.velocityY = 2;
    Gcandy.scale = 0.5  ;
    GcandyGroup.add(Gcandy);
  }
}

function spawnRock(){
  if(World.frameCount% 200 === 0){
    var r = Math.round(random(100, displayWidth-100))
    Rock = createSprite (r, 0);
    //Rock.debug = true;
    Rock.setCollider ("rectangle", 0, 0, 70, 70);
    Rock.addImage("Rock", Rockanm);
    Rock.velocityY = 12;
    Rock.scale = 1  ;
    RockGroup.add(Rock);
  }
}
