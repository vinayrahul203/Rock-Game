let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.player-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.player-paper-btn')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.player-scissors-btn')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    result = computerMove === 'rock' ? 'You lose.' :
             computerMove === 'paper' ? 'You win.' : 'Tie.';
  } else if (playerMove === 'paper') {
    result = computerMove === 'rock' ? 'You win.' :
             computerMove === 'paper' ? 'Tie.' : 'You lose.';
  } else if (playerMove === 'rock') {
    result = computerMove === 'rock' ? 'Tie.' :
             computerMove === 'paper' ? 'You lose.' : 'You win.';
  }

  if (result === 'You win.') score.wins++;
  else if (result === 'You lose.') score.losses++;
  else if (result === 'Tie.') score.ties++;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.result-text').innerHTML = result;

  document.querySelector('.moves-text').innerHTML = `You
  <img src="images/${playerMove}.png" class="move-icon">
  <img src="images/${computerMove}.png" class="move-icon">
  Computer`;
}

function updateScoreElement() {
  document.querySelector('.score-text')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  else if (randomNumber < 2 / 3) return 'paper';
  else return 'scissors';
}