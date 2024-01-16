const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpImage = './Assets/images/jump.png';
const jumpSound = new Audio('./Assets/audio/jumpSound.mp3');
const gameOverAudio = new Audio('./Assets/audio/GameOverAudio.mp3');

let allowJump = true;
let gameOver = false;
let loop;

function playJumpSound() {
    jumpSound.currentTime = 0;
    jumpSound.play();
}

const jump = () => {
    if (!allowJump || gameOver) return;
    playJumpSound();
    mario.classList.add('jump');
    mario.src = jumpImage;
    mario.style.width = '120px';

    setTimeout(() => {
        mario.classList.remove('jump');
        mario.src = './Assets/images/mario.gif';
        mario.style.width = '150px';
    }, 600);
};

function playGameOverAudio() {
    gameOverAudio.currentTime = 0;
    gameOverAudio.play();
}

function restartGame() {

    allowJump = true;
    gameOver = false;


    document.querySelector('.game-over').style.display = 'none';


    clearInterval(loop);
    setupInitialState();
    loop = setInterval(updateGame, 10);
}

function setupInitialState() {



    mario.style.bottom = '0px';


    
    pipe.style.left = '90%';
    pipe.style.animation = 'pipe-animation 2s infinite linear';

}

function updateGame() {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
        playGameOverAudio();

        allowJump = false;
        gameOver = true;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './Assets/images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);


        document.querySelector('.game-over').style.display = 'block';


        localStorage.setItem('gameStatus', 'gameOver');
    }
}

document.addEventListener('keydown', jump);


document.querySelector('.yes').addEventListener('click', () => {
    restartGame();
});

document.querySelector('.no').addEventListener('click', () => {


});


window.onload = () => {
    const gameStatus = localStorage.getItem('gameStatus');
    if (gameStatus === 'gameOver') {
        document.querySelector('.game-over').style.display = 'block';
    } else {
        setupInitialState();
        loop = setInterval(updateGame, 10);
    }
};
