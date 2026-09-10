
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
let rotation = 0;

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
    const enemyCenter = enemyY + 50;
    const ballCenter = ballY + 24;

    if (Math.random() > 0.08) {
        if (enemyCenter < ballCenter - 10) {
            enemyY += 3.2;
        }

        if (enemyCenter > ballCenter + 10) {
            enemyY -= 3.2;
        }
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

    const ballLeft = ballX;
    const ballRight = ballX + 48;
    const ballTop = ballY;
    const ballBottom = ballY + 48;

    const playerLeft = 16;
    const playerRight = 32;
    const playerTop = playerY;
    const playerBottom = playerY + 96;

    const enemyLeft = game.clientWidth - 32;
    const enemyRight = game.clientWidth - 16;
    const enemyTop = enemyY;
    const enemyBottom = enemyY + 96;

    const hitPlayer =
        ballLeft <= playerRight &&
        ballRight >= playerLeft &&
        ballBottom >= playerTop &&
        ballTop <= playerBottom;

    const hitEnemy =
        ballRight >= enemyLeft &&
        ballLeft <= enemyRight &&
        ballBottom >= enemyTop &&
        ballTop <= enemyBottom;

    if (hitPlayer && ballSpeedX < 0) {
        const hitPosition =
            (ballY + 24 - playerY) / 96;

        ballSpeedX = 5;
        ballSpeedY = (hitPosition - 0.5) * 10;

        ballX = playerRight;
    }

    if (hitEnemy && ballSpeedX > 0) {
        const hitPosition =
            (ballY + 24 - enemyY) / 96;

        ballSpeedX = -5;
        ballSpeedY = (hitPosition - 0.5) * 10;

        ballX = enemyLeft - 48;
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

function rotateBall() {
    rotation += 6;
    ball.style.transform = `rotate(${rotation}deg)`;
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
        rotateBall();
        draw();
    }

    requestAnimationFrame(gameLoop);
}

updateScore();
draw();
gameLoop();
