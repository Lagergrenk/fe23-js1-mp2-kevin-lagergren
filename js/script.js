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
const mainMiddleContainer = document.querySelector(".main__middle-container");
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

// --------------------- UI Functions ---------------------
// Function for starting game, hides form and displays game
function startGame() {
  playerName = getPlayerName();
  playerNameDisplay.innerText = playerName;
  computerNamedisplay.innerText = computerName;
  displayElement(gameContainer);
  showRules();
  hideElement(formContainer);
}
function displayElement(element, style) {
  element.style.display = style || "block";
}
function hideElement(element) {
  element.style.display = "none";
}
// show rules creates rules container and displays rules
function showRules() {
  const rulesContainer = createElement(gameContainer, "div", "rules-container");
  createElement(rulesContainer, "h2", "rules-title", "Rules");
  createElement(
    rulesContainer,
    "p",
    "rules-text",
    "Rock beats scissors, scissors beats paper, and paper beats rock. First to 3 points wins the game."
  );
  const rulesButton = createButton(
    rulesContainer,
    "rules-button btn",
    "I understand"
  );
  //styling
  rulesContainer.style.display = "flex";
  rulesContainer.style.flexDirection = "column";
  rulesContainer.style.alignItems = "center";
  rulesButton.style.width = "100px";
  hideElement(mainMiddleContainer);
  rulesButton.addEventListener("click", () => {
    removeElement("rules-container");
    displayElement(mainMiddleContainer, "flex");
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

// --------------------- Element Functions ---------------------
// Creates button and returns button, Variables: HTMLparent(required), class(optional), text(optional)
function createButton(parent, className, text) {
  let newButton = document.createElement("button");
  if (className) {
    newButton.className = className;
  }
  if (text) {
    newButton.innerText = text;
  }
  parent.appendChild(newButton);
  return newButton;
}
// Creates element and returns element, variables: HTMLparent(required), element(required), class(optinal), text(optional)
function createElement(parent, element, className, text) {
  let newElement = document.createElement(element);
  if (className) {
    newElement.className = className;
  }
  if (text) {
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

// --------------------- Game Logic ---------------------
// Logic for determining round winner, returns string ( player, computer or tie )
function determineRoundWinner(player, computer) {
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
}
// Checking for win player or computer, returns true if points = max_score Returns false if not
function hasWonGame() {
  return playerScore === MAX_SCORE || computerScore === MAX_SCORE;
}
// Checking for win Round, if true, updates score and displays winner of round
function hasWonRound(winner) {
  if (winner === playerName) {
    playerScore++;
  } else if (winner === computerName) {
    computerScore++;
  }
  displayWinnerRound(winner);
  updateScore();
}
// Play round, sends player and computer choice to determineRoundWinner, sends winner to hasWonRound
function playRound(player, computer) {
  const winner = determineRoundWinner(player, computer);
  hasWonRound(winner);
  if (hasWonGame()) {
    displayWinnerPopup();
  }
}
// Computers Choice Function Returns String ( rock, paper or scissors )
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}
// Function for handling player choice, sends choice to playRound
function handlePlayerChoice(choice) {
  let computerSelection = getComputerChoice();
  playerSelection = choice;
  playerSelectionVSComputerSelection(playerSelection, computerSelection);
  playRound(playerSelection, computerSelection);
}

// --------------------- Player Functions ---------------------
// Fetching player name and returns string with name
function getPlayerName() {
  let playerNameInput = document.querySelector(
    ".main__form-container-input"
  ).value;
  return playerNameInput || "Player";
}
//Fetching player choice and sends choice to handlePlayerChoice
function getPlayerChoice() {
  const choiceButtons = document.querySelectorAll(
    ".main__middle-container-choices .btn"
  );
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      playerSelection = button.classList.contains("rock")
        ? "rock"
        : button.classList.contains("paper")
        ? "paper"
        : "scissors";
      handlePlayerChoice(playerSelection);
    });
  });
}

// --------------------- Display Functions ---------------------
// Displays winner popup
function displayWinnerPopup() {
  hideElement(gameContainer);
  displayElement(winnerPopup);
  winnerPopup.style.display = "flex";

  playerScore > computerScore
    ? createElement(winnerPopup, "h2", "winner", `${playerName} WINS!`)
    : createElement(winnerPopup, "h2", "winner", `${computerName} WINS!`);

  playAgain();
}
function playerSelectionVSComputerSelection(player, computer) {
  roundVsDisplay.innerHTML =
    `<h2> ${playerName} chose ${player}</h2>` +
    `<h2> ${computerName} chose ${computer}</h2>`;
  roundVsDisplay.style.display = "flex";
}
// Changes VS to winner of round
function displayWinnerRound(winner) {
  winner == "Tie"
    ? createElement(roundVsDisplay, "h2", "winner", "It is a tie")
    : createElement(
        roundVsDisplay,
        "h1",
        "winner",
        `${winner} wins this round`
      );
}
// Updates score on UI
function updateScore() {
  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
}
// PLay again
function playAgain() {
  const playAgainButton = document.querySelector(
    ".main_middle-popup-container-button.btn"
  );
  playAgainButton.addEventListener("click", () => {
    resetGame();
    removeElement("winner");
  });
}

// --------------------- Global Event Listeners ---------------------
// Event listener for DOMContentLoaded to start game when page is loaded(fixed bug, where 1 click coutned as 2)
document.addEventListener("DOMContentLoaded", getPlayerChoice);
// Event listener for start game
const startGameButton = document.querySelector(".main__form-container-button");
startGameButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents page from reloading, fixed bug
  startGame();
});
