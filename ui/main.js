const canvas = document.getElementById('canvas1')

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x: 0,
    y: 0,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 3,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = 'assets/img/pirate_m2.png';
const background = new Image();
background.src = 'assets/img/background.png';

// Events

window.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});

window.addEventListener("keyup", function (e) {
    delete keys[e.key];
    player.moving = false
})

// Logic
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
}

function movePlayer() {
    if (keys['ArrowDown'] && player.y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true
    }
    if (keys['ArrowUp'] && player.y > 0){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true
    }
    if (keys['ArrowLeft'] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true
    }

}
function moveFrameX(){
    if (player.moving) {
        player.frameX = (player.frameX + 1) % 4
    }
}

// Animation

let fpsInterval, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    animate()
}
function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)

        ctx.clearRect(0,0, canvas.width-100, canvas.height)
        const currentFrameX = player.width * player.frameX;
        const currentFrameY = player.height * player.frameY;
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, currentFrameX, currentFrameY, player.width, player.height, player.x, player.y, player.width, player.height)
        movePlayer();
        moveFrameX();
    }
}

startAnimating(50);