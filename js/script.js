// Max Score for game, can be changed to any number
const MAX_SCORE = 3;

// Global Variables
let playerScore = 0;
let computerScore = 0;
let playerSelection = null;
let playerName = "";
const computerName = "Computer"; // Can be changed to any name

// Variables for containers in UI for game check index.html for classes
const gameContainer = document.querySelector(".main__game-container");
const formContainer = document.querySelector(".main__form-container");
const winnerPopup = document.querySelector(".main__middle-popup-container");
const roundVsDisplay = document.querySelector(".main__middle-container-vs");
const playerScoreDisplay = document.querySelector(
  ".main__top-container-player-points"
);
const playerNameDisplay = document.querySelector(".main__top-player-name");
const computerNamedisplay = document.querySelector(".main__top-computer-name");
const computerScoreDisplay = document.querySelector(
  ".main__top-container-computer-points"
);
const playAgainButton = document.querySelector(
  ".main_middle-popup-container-button.btn"
);

// Event listener for start game
const startGameButton = document.querySelector(".main__form-container-button");
startGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  startGame();
});

// Function for starting game, hides form and displays game
function startGame() {
  playerName = getPlayerName();
  playerNameDisplay.innerText = playerName;
  computerNamedisplay.innerText = computerName;
  displayElement(gameContainer);
  hideElement(formContainer);
}

// --------------------- UI functions ---------------------
function displayElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

// Creates button and returns button, Variables: HTMLparent(required), class(optional), text(required)
function createButton(parent, className, text) {
  let newButton = document.createElement("button");
  if(className){
    newButtonbutton.className = className;
  }
  newButton.innerText = text;
  parent.appendChild(button);
  return button;
}

// Creates element and returns element, variables: HTMLparent(required), element, class(optinal), text(optional)
function createElement(parent, element, className, text) {
  let newElement = document.createElement(element);
  if(className){
    newElement.className = className;
  }
  if (text){
    newElement.innerText = text;
  }
  parent.appendChild(newElement);
  return newElement;
}

// Removes element from DOM
function removeElement(className) {
  let element = document.querySelector(`.${className}`);
  element.remove();
}

// Adds style to element
function addStyle(element, style) {
  element.style.style = style;
}


// Displays winner popup
const displayWinnerPopup = () => {
  hideElement(gameContainer);
  displayElement(winnerPopup);
  winnerPopup.style.display = "flex";

  playerScore > computerScore
    ? createElement(winnerPopup, "h2", "winner", `${playerName} WINS!`)
    : createElement(winnerPopup, "h2", "winner", "Computer WINS!")

  playAgain();
};
function playerSelectionVSComputerSelection(player, computer) {
  roundVsDisplay.innerHTML = `<h2><-- ${player} VS ${computer} --></h2>`;
}

// Changes VS to winner of round
function displayWinnerRound(winner) {
  winner == "Tie"
    ? createElement(roundVsDisplay, "h2", "winner", "It is a tie")
    : createElement(roundVsDisplay, "h2", "winner", `${winner} wins this round`);
}

// Updates score on UI
const updateScore = () => {
  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
};

// ---------------------  Game Logic ---------------------

// Logic for determining round winner, returns string ( player, computer or tie )
const determineRoundWinner = (player, computer) => {
  if (player === computer) {
    return "Tie";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return playerName;
  } else {
    return computerName;
  }
};

// Checking for win player or computer, returns true if points = max_score Returns false if not
function hasWonGame() {
  return playerScore === MAX_SCORE || computerScore === MAX_SCORE;
}

// Checking for win Round, if true, updates score and false returns string "tie"
function hasWonRound(winner) {
  if (winner === playerName) {
    playerScore++;
  } else if (winner === computerName) {
    computerScore++;
  }
  displayWinnerRound(winner);
  updateScore();
}

function playRound(player, computer) {
  const winner = determineRoundWinner(player, computer);
  hasWonRound(winner);
  if (hasWonGame()) {
    displayWinnerPopup();
  }
}

// PLay again
function playAgain() {
  playAgainButton.addEventListener("click", () => {
    resetGame();
    removeElement("winner");
  });
}

// Reset Game Function
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  hideElement(winnerPopup);
  displayElement(formContainer);
  roundVsDisplay.innerHTML = "";
}

// Computers Choice Function Returns String ( rock, paper or scissors )
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// Fetching player name and returns string with name
function getPlayerName() {
  let playerNameInput = document.querySelector(
    ".main__form-container-input"
  ).value;
  return playerNameInput || "Player";
}

//Fetching player choice and sends choice to handlePlayerChoice
function getPlayerChoice() {
  document.querySelector(".rock.btn").addEventListener("click", () => {
    playerSelection = "rock";
    handlePlayerChoice(playerSelection);
  });
  document.querySelector(".paper.btn").addEventListener("click", () => {
    playerSelection = "paper";
    handlePlayerChoice(playerSelection);
  });
  document.querySelector(".scissors.btn").addEventListener("click", () => {
    playerSelection = "scissors";
    handlePlayerChoice(playerSelection);
  });
}

// Function for handling player choice, sends choice to playRound
function handlePlayerChoice(choice) {
  let computerSelection = getComputerChoice();
  playerSelection = choice;
  playerSelectionVSComputerSelection(playerSelection, computerSelection);
  playRound(playerSelection, computerSelection);
}

// Event listener for DOMContentLoaded to start game when page is loaded(fixed bug, where 1 click coutned as 2)
document.addEventListener("DOMContentLoaded", getPlayerChoice);
