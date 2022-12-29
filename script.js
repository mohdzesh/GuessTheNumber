'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close-window');

const closeWindow = function () {
  popup.classList.add('hidden');
  overlay.classList.add('hidden');
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};
const backgroundColor = function (bgcolor) {
  document.querySelector('body').style.backgroundColor = bgcolor;
};
const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  //  if there is no value in textbox
  if (!guess) {
    displayMessage('No Value!');
  } else if (guess < 0) {
    displayMessage(`⚠️ Please enter above 0`);
  } else if (guess > 20) {
    displayMessage(`⚠️ Please enter below 21`);
  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number');
    displayNumber(secretNumber);
    backgroundColor('#60b347');
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      localStorage.setItem('highscore', highscore);
      let persistedScore = Number(localStorage.getItem('highscore'));
      document.querySelector('.highscore').textContent = persistedScore;

      if (highscore >= 15) {
        popup.classList.remove('hidden');
        overlay.classList.remove('hidden');

        close.addEventListener('click', closeWindow);
        overlay.addEventListener('click', closeWindow);

        document.addEventListener('keydown', function (event) {
          if (event.key == 'Escape' && !popup.classList.contains('hidden')) {
            closeWindow();
          }
        });
      }
      // localStorage.setItem(
      //   'highscore',
      //   (document.querySelector('.highscore').textContent = highscore)
      // );
      // localStorage.getItem('highscore');
    }
  }

  // when entered value is not equal to secret number
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too High' : '📉 Too Low');
      score--;
      displayScore(score);
    } else {
      displayMessage('💥 Oops You have Lost');
      displayScore(0);
      backgroundColor('#FF0000');
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  displayScore(20);
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  displayNumber('?');
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';

  backgroundColor('#222');
  document.querySelector('.number').style.width = '15rem';
});
