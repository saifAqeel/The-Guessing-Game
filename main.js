let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const startOver = document.querySelector('.resultParas');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number!!');
  } else if (guess > 100) {
    alert('The number must be below 100');
  } else if (guess < 1) {
    alert('The number must be above 1');
  } else {
    prevGuess.push(guess);
    if (numGuess >= 10) {
      displayGuess(guess);
      displayMessage(`Game Over!! The Answer was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      evaluateGuess(guess);
    }
  }
}
function evaluateGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You Guessed It Right!!`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Your guess is LOW!`);
  } else if (guess > randomNumber) {
    displayMessage(`Your guess is HIGH!`);
  }
}
function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}  `;
  numGuess++;
  remaining.innerHTML = `${10 - numGuess}`;
}
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}
// function newGame() {
//   const newGameButton = document.querySelector('#newGame');
//   newGameButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     randomNumber = parseInt(Math.random() * 100 + 1);
//     prevGuess = [];
//     numGuess = 1;
//     guessSlot.innerHTML = '';
//     remaining.innerHTML = `${10 - numGuess}`;
//     userInput.removeAttribute('disabled');
//     startOver.removeChild(p);
//     playGame = true;
//   });
// }
// function endGame() {
//   userInput.value = ``;
//   userInput.setAttribute('disabled', '');
//   p.classList.add('button');
//   p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
//   startOver.appendChild(p);
//   playGame = false;
//   console.log(ended)
//   newGame();
// }
//chatGPT
function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    e.preventDefault();
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${10 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(newGameButton);
    playGame = true;
  });
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  const newGameButton = document.createElement('button');
  newGameButton.id = 'newGame';
  newGameButton.classList.add('button');
  newGameButton.textContent = 'Start New Game';
  startOver.appendChild(newGameButton);
  playGame = false;
  newGame();
}

