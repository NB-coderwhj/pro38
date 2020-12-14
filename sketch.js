var monkey, monkey_running;
var banana, bananaGroup, bananaImg;
var obstacle, obstaclesGroup, obstacleImg;
var bg, bgImg;
var invisibleG;
var score = 0;
var gamestate;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bgImg = loadImage("jungle.jpg")

  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");

}



function setup() {
  createCanvas(displayWidth, displayHeight-185);

  monkey = createSprite(70, 320, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.25;

 /* bg = createSprite(displayWidth/2+100, 200, 400, 400);
  bg.addImage(bgImg);
  bg.scale = 1.45*/
  
  invisibleG = createSprite(displayWidth/2+100,500,1400,20);

  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  gamestate = "play"

}

function draw() {
  background(0);

  camera.position.x = monkey.x
  camera.position.y = displayHeight;

  imageMode(CENTER)
  image(bgImg,displayWidth*2,displayHeight,displayWidth*5,displayHeight)
 /* invisibleG.velocityX = -5;
  if (invisibleG.x < 590){
    invisibleG.x = 700;
  }*/
 // invisibleG.visible = false;

 // bg.velocityX = -7;
 /* if (bg.x < 560) {
    bg.x = /*bg.width/ 2700;
  }*/
  
  if(keyDown("space") && monkey.y > 300){
    monkey.velocityY = -16;
  }
  
  monkey.velocityY = monkey.velocityY +0.5;
  monkey.collide(invisibleG);
  
  if(bananaGroup.isTouching(monkey)){
    score = score+2;
    monkey.scale = monkey.scale +0.05;
    bananaGroup.destroyEach();
  }
  
  if (obstaclesGroup.isTouching(monkey)){
    score = score -1;
    monkey.scale = 0.2;
    obstaclesGroup.destroyEach();
  }

 // monkey.depth = bg.depth;
 // bg.depth = +1;
 
 spawnBananas();
 spawnObstacles();  
 monkeyScale();

  drawSprites();
  
  textSize (20);
  fill("white")
  text ("Score: "+score, 200,50);

  console.log(monkey.x)

}

function spawnObstacles() { 
  if (frameCount % 200 === 0) {
    obstacle = createSprite(displayWidth, 450, 20, 20);
    obstacle.addImage(obstacleImg);
    obstacle.scale = random(0.18, 0.28);
   // obstacle.velocityX = random(-4.5,-6.5);
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  /*  obstacle.depth = bg.depth;
    bg.depth = +1;*/
   // obstacle.debug = true;
    obstacle.setCollider("circle",0,0,obstacle.width/2-50)
  }
}

function spawnBananas() {
  if (frameCount % 300 === 0) {
    banana = createSprite(displayWidth, 200, 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.07;
  //  banana.velocityX = -3;
    banana.lifetime = 600;
    banana.y = Math.round(random(75, 250));
    bananaGroup.add(banana);
 /*   banana.depth = bg.depth
    bg.depth = +1*/
  }

}

function monkeyScale(){
  
  if (score%10 === 0 && score>0){
    monkey.scale = monkey.scale+0.05;
  }
}

function keyPressed(){
  if(keyIsDown(UP_ARROW)){
    monkey.x +=50
  }
}