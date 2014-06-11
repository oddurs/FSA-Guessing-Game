var answer = null,
    answerArr = [],
    userInput;
var statusId = document.getElementById("status"),
    inputId  = document.getElementById("input-box"),
    guessId  = document.getElementById("guess-count"),
    submitId = document.getElementById("submit-button"),
    sandyId  = document.getElementById("sandy");

answerGen();

function answerGen() {
  answer = Math.ceil(100 * Math.random());
}

function newGame() {
  answerGen();
  answerArr = [];
  statusId.innerHTML = "Ok, let's play another one. I've already got a number in mind.";
  inputId.disabled = false;
  submitId.disabled = false;
  guessId.innerHTML = "5 Guesses Remaining";
  document.body.style.background="";
  inputId.value = "";
  sandyId.src = "img/sandy.png";
}

function numberVal() {
  userInput = parseInt(inputId.value, 10);
  if (duplicate() > 0) {
    errorMessage("Error: Duplicate input");
  } else if (userInput === answer) { // If correct guess
  	winner();
  } else if (userInput < 1 || userInput > 100) { // Else if number is too little / too large
    errorMessage("Error: Input is out of bounds");
  } else if (isNaN(userInput)) { // else if NaN
    errorMessage("Error: Input is not a number");
  } else { // else solid guess
    statusMessage("You are " + temperature() + highLow());
    answerArr.push(userInput);
    guessCount();
    sandyId.src = "img/sandy.png";
  }
  inputId.value = "";
}

function statusMessage(message) {
	var instructions = "Can you handle the heat? Guess the number between 1 and 100 to claim your prize. You have five turns to guess correctly, but you can always reveal the the answer by using a hint. Good luck!";
  statusId.style.display = "block";
  statusId.innerHTML = message;
}

function errorMessage(message) {
  statusId.style.display = "block";
  statusId.innerHTML = message;
  sandyId.src = "img/sandy-error.png";
}

function temperature() {
  var proximity = Math.abs(userInput - answer);
  if (proximity <= 5) {
    return "melting";
  } else if (proximity <= 10) {
    return "hot";
  } else if (proximity <= 15) {
    return "warm";
  } else if (proximity <= 25) {
    return "cold";
  } else {
    return "freezing";
  }
}

function highLow() {
  if (userInput < answer) {
    return ", guess higher.";
  } else {
    return ", guess lower.";
  }
}

function hint() {
  if (answerArr.length === 0) {
    errorMessage("Why don't you give it a try?");
  } else {
  	inputId.disabled = true;
  	submitId.disabled = true;
    statusMessage("The answer was " + answer + ".");
    guessId.innerHTML = "Press \'New Game\' to try again."
  }
}

function guessCount() {
  if (5 - answerArr.length === 1) {
    guessId.innerHTML = ("1 Guess Remaining")
  } else if (5 - answerArr.length > 1) {
    guessId.innerHTML = (5 - answerArr.length) + " Guesses Remaining.";
  } else {
    gameOver();
  }
}

function gameOver() {
  guessId.innerHTML = ("Game Over. The answer was " + answer);
  inputId.disabled = true;
  submitId.disabled = true;
  statusId.innerHTML = "";
}

function winner() {
	inputId.disabled = true;
  submitId.disabled = true;
	statusMessage("Congratulations! The number is " + answer);
  document.body.style.background="rgb(100, 143, 61)";
  sandyId.src = "img/sandy-win.png";

  if (answerArr.length < 1) {
  	guessId.innerHTML = "You guessed the number in " + (answerArr.length + 1) + " turn";
  } else {
  	guessId.innerHTML = "You guessed the number in " + (answerArr.length + 1) + " turns";
  }
}

function duplicate() {
  var duplicateCount = 0;
  for (var i = 0; i < answerArr.length; i++) {
    if (userInput == answerArr[i]) {
      duplicateCount += 1;
    } else {
      duplicateCount += 0;
    }
  }
  return duplicateCount;
}

function showPlay() {
	statusId.innerHTML = "I'm thinking of a number between 1 and 100. I bet you can't figure it out in five turns or less.";
	newGame();
}

function showInstructions() {
	statusId.innerHTML = "Can you handle the heat? Guess the number between 1 and 100 to claim your prize. You have five turns to guess correctly, but you can always reveal the the answer by using a hint. Good luck!";
}

function showAbout() {
	statusId.innerHTML = "The Guessing Game is a project by Oddur Sigurdsson. It was made as an exercise in DOM manipulation with JavaScript. If you're interested in seeing how it works, check out the code at GitHub.";
}

function showShare() {
	statusId.innerHTML = "Share this app with your friends on Twitter & Facebook";
}