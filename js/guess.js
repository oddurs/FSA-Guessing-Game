var answer = null,
    answerArr = [],
    userInput;
var statusId = document.getElementById("status"),
    inputId  = document.getElementById("input-box"),
    guessId  = document.getElementById("guess-count"),
    submitId = document.getElementById("submit-button"),
    prizeId  = document.getElementById("winner");

answerGen();

function answerGen() {
  answer = Math.ceil(100 * Math.random());
}

function newGame() {
  answerGen();
  answerArr = [];
  statusId.innerHTML = "The game has been reset.";
  inputId.disabled = false;
  submitId.disabled = false;
  guessId.innerHTML = "5 Guesses Remaining";
  prizeId.style.display = "none";
  inputId.value = "";
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
  }
  inputId.value = "";
}

function statusMessage(message) {
  statusId.style.display = "block";
  statusId.innerHTML = message;
  statusId.className = " bg-info";
}

function errorMessage(message) {
  statusId.style.display = "block";
  statusId.innerHTML = message;
  statusId.className = " bg-danger";
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
  prizeId.style.display = "none";
}

function winner() {
	inputId.disabled = true;
  submitId.disabled = true;
	statusMessage("Congratulations! The number is " + answer);
  prizeId.style.display = "block";
  document.getElementsByTagName("body").style.background = "#fff";
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