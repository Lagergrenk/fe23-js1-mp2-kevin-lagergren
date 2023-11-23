// Max Score for game, can be changed to any number
const MAX_SCORE = 3;

// Global Variables
let playerScore = 0;
let computerScore = 0;
let playerSelection = null;
let playerName = "";

// Variables for containers in UI for game, form and winner popup, check index.html for classes
const gameContainer = document.querySelector(".main__game-container");
const formContainer = document.querySelector(".main__form-container");
const winnerPopup = document.querySelector(".main__middle-popup-container");
const roundWinnerDisplay = document.querySelector(".main__middle-container-vs");
const gameWinnerDisplay = document.querySelector(".main__middle-popup-winner");

// Event listener for start game
const startGameButton = document.querySelector(".main__form-container-button");
startGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  startGame();
});

// Function for starting game, hides form and displays game
function startGame() {
  console.log("Started game");
  let playerName = getPlayerName();
  let playerNameDisplay = document.querySelector(".main__top-player-name");
  playerNameDisplay.innerText = playerName;
  displayElement(gameContainer);
  hideElement(formContainer);
  playerSelection = getPlayerChoice();
}

// --------------------- UI functions ---------------------
function displayElement(element) {
  element.style.display = "block";
}

function hideElement(element) {
  element.style.display = "none";
}

// Displays winner popup
const displayWinnerPopup = () => {
  hideElement(gameContainer);
  displayElement(winnerPopup);
  winnerPopup.style.display = "flex";

  playerScore > computerScore
    ? (gameWinnerDisplay.innerText = `${playerName} wins!`)
    : (gameWinnerDisplay.innerText = "Computer wins!");

  playAgain();
};

// Changes VS to winner of round
function displayWinnerRound(winner) {
  console.log(winner);
  winner == "Tie"
    ? (roundWinnerDisplay.innerHTML = "<h2>It is a tie !!!</h2>")
    : (roundWinnerDisplay.innerHTML = `<h2>${winner} wins this round !!!</h2>`);
    

  //Show winner for 3 secs
  setTimeout(() => {
    roundWinnerDisplay.innerHTML = `<h2>VS</h2>`;
  }, 3000);
}

// Updates score on UI
const updateScore = () => {
  let playerScoreDisplay = document.querySelector(
    ".main__top-container-player-points"
  );
  let computerScoreDisplay = document.querySelector(
    ".main__top-container-computer-points"
  );
  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
};

// ---------------------  Game Logic ---------------------

// Logic for determining round winner, returns string ( player, computer or tie )
const determineRoundWinner = (player, computer) => {
  let playerName = getPlayerName();

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
const hasWonGame = () => {
  return playerScore === MAX_SCORE || computerScore === MAX_SCORE;
};

// Checking for win Round, if true, updates score and false returns string "tie"
const hasWonRound = (winner) => {
  let playerName = getPlayerName();
  if (winner === playerName) {
    playerScore++;
  } else if (winner === "Computer") {
    computerScore++;
  }
  displayWinnerRound(winner);
  updateScore();
};

function playRound(player, computer)  {
  const winner = determineRoundWinner(player, computer);
  hasWonRound(winner);
  if (hasWonGame()) {
    displayWinnerPopup();
  }
};

function playAgain() {
  let playAgainButton = document.querySelector(
    ".main_middle-popup-container-button.btn"
  );
  playAgainButton.addEventListener("click", () => {
    resetGame();
  });
}

// Reset Game Function
const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  updateScore();
  hideElement(winnerPopup);
  displayElement(formContainer);
};

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
  document
    .querySelector(".main_middle-container-option.rock.btn")
    .addEventListener("click", () => {
      playerSelection = "rock";
      handlePlayerChoice(playerSelection);
    });
  document
    .querySelector(".main_middle-container-option.paper.btn")
    .addEventListener("click", () => {
      playerSelection = "paper";
      handlePlayerChoice(playerSelection);
    });
  document
    .querySelector(".main_middle-container-option.scissors.btn")
    .addEventListener("click", () => {
      playerSelection = "scissors";
      handlePlayerChoice(playerSelection);
    });
}

// Function for handling player choice, sends choice to playRound
function handlePlayerChoice(choice) {
  let computerSelection = getComputerChoice();
  playerSelection = choice;

  playRound(playerSelection, computerSelection);
}
