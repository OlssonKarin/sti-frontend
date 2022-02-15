// selecting canvas
const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.heigt = innerHeight

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stopGame();
})

// variable & constants

const c = canvas.getContext("2D");
const scoreEl = document.getElementById("scoreEl");
const highestEl = document.getElementById("highestEl");
const startGamebtn = document.getElementById("statGameBtn")
const modelEl = document.getElementById("medelEl");
const bigScoreEl = document.getElementById("bigScoreEl");
const friction = 0.98;
let x = canvas.width /2;
let y = canvas.heigt /2;
let projectiles = [];
let enemies = [];
let particles = [];
let score = 0;
let highest = localStorage.getItem("highest") || 0;
let animatedId;
let spanEnemiesInterval;
let spawnTime = 1000;
highestEl.innerHTML = highest;

//Starting ball Class

class Ball {
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false)
        c.fillStyle = this.color;
        c.fill();
    }
}

// shooter ball for movin ball
class Shooter extends Ball {
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color);
        this.velocity = velocity; 
    }
    
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

// Particle for exploding Shooter ball
class Particle extends Shooter {
    constructor(x, y, radius, color, velocity){
        super(x, y, radius, color, velocity)
        this.alpha = 1
    }
    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, 0, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x * 2
        this.y = this.y + this.velocity.y * 2
        this.alpha -= 0.01
    }
}

function updateScore(times = 1) {
    spawnTime *= 0.9995
    score += 100 * times
    scoreEl.innerHTML = score
}

// calculate velocity from center (x, y) to (x1, y1)

function calculateVelocity(
    x,
    y,
    x1 = canvas.width / 2,
    y1 = canvas.height / 2
  ) {
    const angle = Math.atan2(y1 - y, x1 - x)
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
  
    return velocity
  }


