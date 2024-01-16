const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpImage = './Assets/images/jump.png';
const jumpSound = new Audio('./Assets/audio/jumpSound.mp3');
const gameOverAudio = new Audio('./Assets/audio/GameOverAudio.mp3');

let allowJump = true; // Adiciona uma variável para controlar se o pulo é permitido
let gameOver = false; // Adiciona uma variável para controlar se o jogo acabou

function playJumpSound() {
    jumpSound.currentTime = 0;
    jumpSound.play();
}

const jump = () => {
    if (!allowJump || gameOver) return; // Retorna se o pulo não for permitido ou o jogo acabou
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

const loop = setInterval(() => {
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
    }
}, 10);

document.addEventListener('keydown', jump);