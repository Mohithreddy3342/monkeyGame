var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey,jungle, monkey_running,ground,banana;
var banana ,bananaImage,jungleImage,obstacle, obstacleImage,monkeyImage;
var FoodGroup, obstacleGroup
var score=0;
var Score=0;
var canvas;
function preload(){
  
monkeyImage=loadAnimation("sprite_0.png","sprite_1.png");  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage=loadImage("jungle.jpg")
}

function setup() {
canvas=createCanvas(displayWidth-40,displayHeight-120);  
jungle=createSprite(0,0,700,200);
jungle.addImage(jungleImage);  
jungle.scale=2;  
jungle.velocityX=-3; 
jungle.x=jungle.width/2;  
monkey=createSprite(80,330,20,20);  
monkey.addAnimation( "running",monkey_running); 
monkey.scale=0.1;  
  
ground=createSprite(0,400,2000,20);  
ground.velocityX=-4;
ground.x=ground.width/2;  
ground.visible=false;  
FoodGroup = createGroup();  
obstacleGroup=createGroup();  
  
 monkey.setCollider("rectangle",-50,-50,monkey.width,  monkey.height);
monkey.debug = true  
}


function draw() {
background("jungle");
 if(ground.x<0){
   ground.x=0;
 } 
switch(Score){
  case 10:monkey.scale=0.2,spawnObstacle.scale=0.4;
    break;
  case 20:monkey.scale=0.22,spawnObstacle.scale=0.5;
    break;
  case 30:monkey.scale=0.24,spawnObstacle.scale=0.53;
    break;
  case 40:monkey.scale=0.26,spawnObstacle.scale=0.55;
    break;
  default:break;  

}
 
monkey.collide(ground);  
 if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }  
monkey.velocityY = monkey.velocityY + 0.5;

spawnObstacle();  
  
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 170;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  } 
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
}  
function spawnObstacle(){
 if (frameCount % 150 === 0){
   var obstacle = createSprite(600,370,10,40);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX=-3;
   
    //generate random obstacles
    var rand = Math.round(random(1,350));
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 170;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}  
  if(monkey.isTouching(FoodGroup)){
    score=score+1;
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
console.log(gameState);
 drawSprites(); 
if(gameState === PLAY){
    
    if(monkey.isTouching( FoodGroup)){
       FoodGroup.visible=false;
       Score=Score+1;
       }
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival time:"+score,450,50);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+Score,500,70);
   
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    if(jungle.x < 0){
      jungle.x=jungle.width/2;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacle();  
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
     jungle.velocityX=0
     monkey.visible=false;
 stroke("black");
  textSize(20);
  fill("black");     
text("PRESS ENTER TO RESTART",300,200);     
if(keyDown("ENTER")){
  reset();
}  
text("SURVIVAL TIME:"+score,320,220);
text("SCORE:"+Score,380,240);     
ground.velocityX = 0;
monkey.velocityY=0;  
monkey.changeAnimation("running",monkeyImage);      
     
      //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     FoodGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);    
   }
    

}







