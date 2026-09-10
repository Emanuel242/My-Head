
const game = document.getElementById("game");
const ball = document.getElementById("ball");
const play = document.getElementById("play");
const pause = document.getElementById("pause");

const player = document.createElement("div");
const enemy = document.createElement("div");
const playerScore = document.createElement("span");
const enemyScore = document.createElement("span");

player.id = "player";
enemy.id = "enemy";

playerScore.id = "player-score";
enemyScore.id = "enemy-score";

game.appendChild(player);
game.appendChild(enemy);
game.appendChild(playerScore);
game.appendChild(enemyScore);

let ballX = 385;
let ballY = 225;

let ballSpeedX = 5;
let ballSpeedY = 4;

let playerY = 180;
let enemyY = 180;

let scorePlayer = 0;
let scoreEnemy = 0;

let gameRunning = false;

const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

play.addEventListener("click", () => {
    gameRunning = true;
});

pause.addEventListener("click", () => {
    gameRunning = false;
});

function resetBall() {
    ballX = 385;
    ballY = 225;

    ballSpeedX = ballSpeedX > 0 ? -5 : 5;
    ballSpeedY = Math.random() > 0.5 ? 4 : -4;
}

function updatePlayer() {
    if (keys["w"] || keys["W"] || keys["ArrowUp"]) {
        playerY -= 7;
    }

    if (keys["s"] || keys["S"] || keys["ArrowDown"]) {
        playerY += 7;
    }

    if (playerY < 0) {
        playerY = 0;
    }

    if (playerY > game.clientHeight - 100) {
        playerY = game.clientHeight - 100;
    }
}

function updateEnemy() {
    const centerEnemy = enemyY + 50;

    if (centerEnemy < ballY) {
        enemyY += 4;
    }

    if (centerEnemy > ballY) {
        enemyY -= 4;
    }

    if (enemyY < 0) {
        enemyY = 0;
    }

    if (enemyY > game.clientHeight - 100) {
        enemyY = game.clientHeight - 100;
    }
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0) {
        ballY = 0;
        ballSpeedY *= -1;
    }

    if (ballY >= game.clientHeight - 48) {
        ballY = game.clientHeight - 48;
        ballSpeedY *= -1;
    }

    const playerCollision =
        ballX <= 60 &&
        ballX >= 35 &&
        ballY + 48 >= playerY &&
        ballY <= playerY + 100;

    const enemyCollision =
        ballX + 48 >= game.clientWidth - 60 &&
        ballX + 48 <= game.clientWidth - 35 &&
        ballY + 48 >= enemyY &&
        ballY <= enemyY + 100;

    if (playerCollision && ballSpeedX < 0) {
        ballSpeedX *= -1;
        ballX = 60;
    }

    if (enemyCollision && ballSpeedX > 0) {
        ballSpeedX *= -1;
        ballX = game.clientWidth - 108;
    }

    if (ballX < -50) {
        scoreEnemy++;
        updateScore();
        resetBall();
    }

    if (ballX > game.clientWidth + 50) {
        scorePlayer++;
        updateScore();
        resetBall();
    }
}

function updateScore() {
    playerScore.textContent = scorePlayer;
    enemyScore.textContent = scoreEnemy;
}

function draw() {
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    player.style.top = `${playerY}px`;
    enemy.style.top = `${enemyY}px`;
}

function gameLoop() {
    if (gameRunning) {
        updatePlayer();
        updateEnemy();
        updateBall();
        draw();
    }

    requestAnimationFrame(gameLoop);
}

updateScore();
draw();
gameLoop();

