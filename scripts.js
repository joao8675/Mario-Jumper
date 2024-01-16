const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jump = () => {
    mario.classList.add('jump')

    setTimeout(() => {

    mario.classList.remove('jump')

    }, 600)
}
function playJumpSound() {
    var jumpSound = new Audio('caminho/do/seu/arquivo.mp3');
    jumpSound.play();
}
const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 32) {
        playJumpSound();
        }
    });

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        
        mario.src = './Assets/images/game-over.png'
        mario.style.width = '75px'
        mario.style.marginLeft = "50px"

        clearInterval(loop);

    }

}, 10);

document.addEventListener('keydown', jump);

