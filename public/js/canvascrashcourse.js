const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* // fill Rectangle
ctx.fillStyle = "blue";
ctx.fillRect(20, 20, 150 ,100);
ctx.fillStyle = "black";
ctx.fillRect(200, 20, 150 ,100);

// Stroke Rectangle
ctx.lineWidht = 5;
ctx.strokeStyle = "red";
ctx.strokeRect(100, 200, 150, 100);

// clear rectangle
ctx.clearRect(25,25,140, 90);


// fill text, brukar användas till poäng
ctx.font= "30px, Arial";
ctx.fillStyle = "Purple";
ctx.fillText("Hello world", 400, 50);

// stoke text
ctx.lineWidht = 1;
ctx.strokeStyle = "Green";
ctx.strokeText("Hello World", 400, 100);
 */
//**************************************** */

//Paths

//Triangel
/* ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150,50);
ctx.lineTo(100, 200);
ctx.closePath(); //ctx.lineTo(50, 50);
ctx.fillStyle ="coral";
ctx.fill();//ctx.stroke();

ctx.beginPath();
ctx.moveTo(200, 50);
ctx.lineTo(150,200);
ctx.lineTo(250, 200);
ctx.closePath();
ctx.stroke();

//Rektangel
ctx.beginPath();
ctx.rect(300, 50 ,150, 100);
ctx.fillStyle="teal";
ctx.fill(); */

//****************************** */

// Arc (circles)
/* ctx.beginPath();

const centerX= canvas.width / 2
const centerY= canvas.height / 2

//Draw the head
ctx.arc(centerX, centerY, 200, 0, Math.PI*2);

//Move to mouth
ctx.moveTo(centerX + 100, centerY) //gör att linjerna mellan ögonen inte syns

// Draw the mouth
ctx.arc(centerX, centerY, 100, 0, Math.PI, false)

//move to left eye
ctx.moveTo(centerX -60, centerY - 80);

//draw left eye
ctx.arc(centerX -80, centerY -80, 20, 0, Math.PI*2);

// move to right eye
ctx.moveTo(centerX + 100, centerY - 80, 20);

//Draw right eye
ctx.arc(centerX +80, centerY -80, 20, 0, Math.PI*2);
ctx.stroke(); */

//*********************** */

//Animation 1 (funkar inte riktigt) 
/* const circle = {
  x: 200,
  y: 200,
  size: 30,
  dx: 5, //hastighet längs x-axeln, sidleds
  dy: 4 // hastighets längs y-axlen, nedåt
}

function drawCircle() {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
  ctx.fillStyle = "purple";
  ctx.fill();
}

function update() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.heigth);
  drawCircle(); //cirkelobjektet

  circle.x += circle.dx; //Ändrar position sidleds
  circle.y += circle.dy; // Ändrar positon nedåt

  //Detect side walls, 
  if(circle.x + circle.size > canvas.width || circle.x - circle.size < 0){
    circle.dx *= -1; 
  }

  // defect top and bottom walls
  if(circle.y + circle.size > canvas.heigth || circle.y - circle.size < 0){
    circle.dy *= -1;
  }

  requestAnimationFrame(update);
}

update(); //ritar om cirklen igen och igen. */

//************ */

//Animation 2 - character

const image = document.getElementById("source");

const player = {
  w: 50,
  h: 70,
  x: 20,
  y: 200,
  speed: 5,
  dx: 0,
  dx: 0,
};

function drawPlayer() {
  ctx.drawImage(image, player.x, player.y, player.w, player.h);

}

function clear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos(){
  player.x += player.dx;
  player.y += player.dy;

  detectWalls();
}

function detectWalls(){
  //left wall
  if (player.x < 0) {
    player.x = 0;  
  }

  //Right wall
  if (player.x + player.w > canvas.width) {
    player.x = canvas.width - player.w;
  }

  //Top wall
  if (player.y < 0) {
    player.y = 0;  
  }

  //Bottom wall
  if (player.y + player.h > canvas.height) {
    player.y = canvas.height - player.y;
  }

  
}

function update() {
  clear();
  drawPlayer();

  newPos();

  requestAnimationFrame(update);
}

function moveUp(){
  player.dy = -player.speed;
}
function moveDown(){
  player.dy = player.speed;
}
function moveRight(){
  player.dx = player.speed;
}
function moveLeft(){
  player.dx = -player.speed;
}



function keyDown(e){
  if (e.key === "ArrowRight" || e.key === "Right") {
    moveRight();
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    moveLeft();
  } 
  else if (e.key === "ArrowUp" || e.key === "Up") {
    moveLeft();
  } 
  else if (e.key === "ArrowDown" || e.key === "Down") {
    moveDown();
  } 

}
function keyUp(e){
  if (
    e.key == "Right" ||
    e.key == "ArrowRight" ||
    e.key == "Left" ||
    e.key == "ArrowLeft" ||
    e.key == "Up" ||
    e.key == "ArrowUp" ||
    e.key == "Down" ||
    e.key == "ArrowDown"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
}

update();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyUp", keyUp);

