let canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;
let ctx = canvas.getContext('2d');
let isRunning = true;

// VARIABLES
const player = new Player();
let POINTS = 0;
let obstacles = [];

let timePassed = 0;
let lastSpawn = 0;
let lastFrame = 0;


// BACKGORUND VARIABLES
let obstacleImg = new Image();
obstacleImg.src = "./assets/pipe-green.png";

let back = new Image();
back.src = "./assets/background-day.png";
let floor = new Image();
floor.src = "./assets/base.png";

const pointSound = new Audio("./sounds/point.ogg");
pointSound.volume = 0.5;

let backX = 0;
let floorX = 0;
const speedF = 1;
const speedB = 0.5;
//---------------------------


function init() {
    window.addEventListener('keydown', e => {
        if ([" ", "w", "W"].includes(e.key)) {
            player.jump();
        }
    });
    loop(0);
}

function loop(currentTime) {
    if (!isRunning) return

    let deltaTime = currentTime - lastFrame;
    lastFrame = currentTime;

    update(deltaTime);
    draw();
    requestAnimationFrame(loop);
}

function update(deltaTime) {
    deltaTime /= 1000;

    player.update(canvas);
    obstacles.forEach(e => e.update());

    // Collision
    obstacles.forEach(obstacle => {
        if (player.checkCollisions(obstacle)) {
            isRunning = false;
            setTimeout(()=>{
                location.reload();
            }, 3000);
            return;
        }
    });

    // Point
    obstacles.forEach(obstacle => {
        if (player.passObstacle(obstacle)) {
            pointSound.play();
            POINTS += 1;
            obstacle.passed = true;
        }
    });

    // Dissapear
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // New Obstacles
    timePassed += deltaTime;
    let newInterval = Math.max(2, 4 - (timePassed/10));

    if (timePassed - lastSpawn >= newInterval) {
        obstacles.push(new Obstacle(canvas, timePassed / 100, obstacleImg));
        lastSpawn = timePassed;
    }
}


function draw() {
    drawBack();
    player.draw(ctx);
    obstacles.forEach(e=>e.draw(ctx));
    drawPoints();
}

function drawBack() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // BackGround
    ctx.drawImage(back, backX, 0, canvas.width, canvas.height);
    ctx.drawImage(back, backX + canvas.width-0.5, 0, canvas.width, canvas.height);
    
    // Floor
    ctx.drawImage(floor, floorX, canvas.height * 0.9, canvas.width, 50);
    ctx.drawImage(floor, floorX + canvas.width, canvas.height * 0.9, canvas.width, 50);
    
    // Speed
    backX -= speedB;
    floorX -= speedF;
    if (backX <= -canvas.width) {
        backX = 0;
    }
    if (floorX <= -canvas.width) {
        floorX = 0;
    }
}

const digitImages = {};

function preloadDigits(callback) {

    for (let i = 0; i <= 9; i++) {
        const img = new Image();
        img.src = `./assets/numbers/${i}.png`;
        digitImages[i] = img;
    }
    console.info("IMAGES LOADED SUCCESFULLY");
    callback();
}

function drawPoints() {
    const points = POINTS.toString();
    for (let i = 0; i < points.length; i++) {
        let img = digitImages[parseInt(points[i])];
        ctx.drawImage(img, 50+i*25, 50, 25, 40);   
    }
}

preloadDigits(() => {
    init();
});

