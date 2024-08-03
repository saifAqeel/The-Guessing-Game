let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const startOver = document.querySelector('.resultParas');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const p = document.createElement('p');

let bgChanger;
let prevGuess = [];
let numGuess = 0;
let playGame = true;
let chancesLeft = 10;

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
    if (chancesLeft === 0) {
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
    //Background color changing effect
    bgChanger= setInterval(function(){
      const randomColor = function(){
        const hex = '0123456789ABCDEF';
        let color ='#'
        for(let i =0;i<6;i++){
          color+=hex[Math.floor(Math.random()*16)]
        }
        return color;
      }
      document.body.style.backgroundColor = randomColor()
    },500)
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
  chancesLeft = 10 - numGuess;
  remaining.innerHTML = chancesLeft;
}
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}


function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    e.preventDefault();
    clearInterval(bgChanger);
    document.body.style.backgroundColor= '#212121';
    lowOrHi.innerHTML = ``;
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

