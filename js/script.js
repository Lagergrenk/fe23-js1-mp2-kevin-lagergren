// Max Score for game, can be changed to any number
const MAX_SCORE = 3;

// Global Variables
let playerScore = 0;
let computerScore = 0;
let playerSelection = null;
let playerName = "";

// Variables for containers in UI for game check index.html for classes
const gameContainer = document.querySelector(".main__game-container");
const formContainer = document.querySelector(".main__form-container");
const winnerPopup = document.querySelector(".main__middle-popup-container");
const roundVsDisplay = document.querySelector(".main__middle-container-vs");
const playerScoreDisplay = document.querySelector(
  ".main__top-container-player-points"
);
const playerNameDisplay = document.querySelector(".main__top-player-name");
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

function createH2Element(parent, text) {
  let h2 = document.createElement("h2");
  h2.innerText = text;
  parent.appendChild(h2);
  return h2;
}

// Displays winner popup
const displayWinnerPopup = () => {
  hideElement(gameContainer);
  displayElement(winnerPopup);
  winnerPopup.style.display = "flex";

  playerScore > computerScore
    ? createH2Element(winnerPopup, `${playerName} wins!`)
    : createH2Element(winnerPopup, "Computer wins!");

  playAgain();
};
function playerSelectionVSComputerSelection(player, computer) {
  roundVsDisplay.innerHTML = `<h2><-- ${player} VS ${computer} --></h2>`;
}

// Changes VS to winner of round
function displayWinnerRound(winner) {
  winner == "Tie"
    ? createH2Element(roundVsDisplay, "It is a tie !!!")
    : createH2Element(roundVsDisplay, `${winner} wins this round !!!`);
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
    return "Computer";
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
  } else if (winner === "Computer") {
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

// Event listener for DOMContentLoaded to start game when page is loaded
document.addEventListener("DOMContentLoaded", getPlayerChoice);
