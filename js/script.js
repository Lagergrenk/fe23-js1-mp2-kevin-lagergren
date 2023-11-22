// Max Score for game, can be changed to any number
const MAX_SCORE = 3;

// Global Variables for score for player and computer
let playerScore = 0;
let computerScore = 0;

// Variables for computer and player choice
let computerSelection = getComputerChoice();
let playerSelection = getPlayerChoice();

// Variables for containers in UI for game, form and winner popup, check index.html for classes
let gameContainer = document.querySelector(".main__game-container");
let formContainer = document.querySelector(".main__form-container");
let winnerPopup = document.querySelector(".main__middle-popup-container");

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
  displayGame();
}

// --------------------- UI functions ---------------------
const displayGame = () => {
  gameContainer.style.display = "block";
  hideForm();
};

const hideGame = () => (gameContainer.style.display = "none");

const displayForm = () => (formContainer.style.display = "block");

const hideForm = () => (formContainer.style.display = "none");

// Displays winner popup
const displayWinnerPopup = () => {
  hideGame();
  winnerPopup.style.display = "flex";
  let winner = document.querySelector(".main__middle-popup-winner");

  playerScore > computerScore
    ? (winner.innerText = `${getPlayerName()} wins!`)
    : (winner.innerText = "Computer wins!");
};

// Changes VS to winner of round
function displayWinnerRound(winner) {
  let winnerDisplay = document.querySelector(".main__middle-container-vs");
  winnerDisplay.innerText = winner;
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
  if (player === computer) {
    return "tie";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "player";
  } else {
    return "computer";
  }
};

// Checking for win Game Returns Boolean
const hasWonGame = () => {
  return playerScore === MAX_SCORE || computerScore === MAX_SCORE;
};

// Checking for win Round, if true, updates score and false returns string "tie"
const hasWonRound = (winner) => {
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  } else {
    return "tie";
  }
  displayWinnerRound(winner);
  updateScore();
};

const playRound = (player, computer) => {
  let winner = determineRoundWinner(player, computer);
  hasWonRound(winner);
  if (hasWonGame()) {
    displayWinnerPopup();
  }
};

// Reset Game Function
const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  winnerPopup.style.display = "none";
};

// Computers Choice Function Returns String ( rock, paper or scissors )
function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

// Fetching player name and returns string with name
function getPlayerName() {
  let playerName = document.querySelector(".main__form-container-input").value;
  if (playerName === "") {
    playerName = "Du skrev inget namn, mupp";
  }
  return playerName;
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
    .querySelector(".main_middle-container-option.scissor.btn")
    .addEventListener("click", () => {
      playerSelection = "scissors";
      handlePlayerChoice(playerSelection);
    });
}

// Function for handling player choice, sends choice to playRound
function handlePlayerChoice(choice) {
  playerSelection = choice;
  playRound(playerSelection, computerSelection);
}
