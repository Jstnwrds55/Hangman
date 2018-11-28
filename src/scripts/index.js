//
// Hangman
// By Justin Edwards
//
// TODO: Implement hangman visuals
// TODO: Implement ability to start new game
// TODO: Allow user to choose max length of words
// TODO: Show results div when user guesses the word
// TODO: Change layout to flex box
//


import '../styles/index.scss';

var randomWords = require("random-word-by-length");
var randomCountry = require("random-country");

// Game variables
let alphabet,
    wrongUserGuesses,
    correctLetters;

function gameGeneration() {
  alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  wrongUserGuesses = 0,
  correctLetters = 0;

  // display game
  introDiv.style.display = "none";
  gameButton.style.display = "none";
  hangerDiv.style.display = "";
  guessingDiv.style.display = "";

  // alphabet generation
  lettersDiv.innerHTML = "";
  for (let letter in alphabet) {
    letters.getElementsByTagName("p")[0].innerText = alphabet[letter];
    lettersDiv.innerHTML += letters.innerHTML;
  };

  // generate word to guess and set answerDiv to nothing
  let wordToGuess = randomWords();
  answersDiv.innerHTML = "";
  console.log(wordToGuess);

  // MAIN GAME DRIVER
  // alphabet click action generation
  for (let letter in alphabet) {
    let letterToClick = document.getElementsByClassName("letter-box")[letter];
    letterToClick.addEventListener("click", function() {
      let correctAnswer = false;
      // loop through word to guess and see if it matches
      for (let index = 0; index < wordToGuess.length; index++) {

        // if the letter in the word to guess is equal to the one guessed, show it
        if (wordToGuess.charAt(index).toUpperCase() == letterToClick.innerText.charAt(0).toUpperCase()) {
          answersDiv.getElementsByTagName("p")[index].innerText = wordToGuess.charAt(index);
          answersDiv.getElementsByTagName("p")[index].style.textIndent = "0px";
          correctLetters++;
          correctAnswer = true;
        } else {
          
        }
      }

      // user guesses wrong
      if (!correctAnswer) {
        // add another guess if the type of is a string meaning it hasn't been guessed
        if (typeof(alphabet[letter]) === "string") {
          wrongUserGuesses++; 
          if (wrongUserGuesses < 9) {
            guessesRemaining.innerHTML = "Incorrect<br />Guesses<br />Remaining:<br />" +(8 - wrongUserGuesses);
          }
        }
      } else if (correctLetters == parseInt(wordToGuess.length)) {
        resultsDiv.getElementsByTagName("p")[0].innerText = "Congratulations, you guessed it! The word was: ";
        guessingDiv.style.display = "none";
        resultsDiv.getElementsByTagName("h2")[0].innerText = wordToGuess;
        resultsDiv.style.display = "";
        console.log("winner!");
      }

      alphabet[letter] = 0; // zero out spot in alphabet

      // user losing scenario
      if (wrongUserGuesses > 8) {
        guessingDiv.style.display = "none";
        resultsDiv.getElementsByTagName("p")[0].innerText = "Awwww, you took too many guesses! The word was: ";
        resultsDiv.getElementsByTagName("h2")[0].innerText = wordToGuess;
        resultsDiv.style.display = "inline-block";
        console.log("loser!");
      }

      letterToClick.style.opacity = ".2";

    });
  }

  // Generate answerDiv with placeholder letters and shift the letters
  for (let i = 0; i < wordToGuess.length; i++) {
    answersLetters.getElementsByTagName("p")[0].innerText = "A";
    answersDiv.innerHTML += answersLetters.innerHTML;
    answersDiv.getElementsByTagName("p")[i].style.textIndent = "-9999px";
  }
}

// DOM Variables
let gameButton = document.getElementById("game-button"),
    playAgainButton = document.getElementById("play-again-button"),
    introDiv = document.getElementById("intro-div"),
    gameDiv = document.getElementById("game-div"),
    hangerDiv = document.getElementById("hanger-div"),
    guessesRemaining = hangerDiv.getElementsByTagName("p")[0],
    guessingDiv = document.getElementById("guessing-div"),
    resultsDiv = document.getElementById("results-div"),
    lettersDiv = document.getElementById("letters-div"),
    letters = document.getElementById("letters-div").cloneNode(true),
    answersDiv = document.getElementById("answers-div"),
    answersLetters = document.getElementById("answers-div").cloneNode(true);

// default display
hangerDiv.style.display = "none";
resultsDiv.style.display = "none";
guessingDiv.style.display = "none";

// make the play game button do something
gameButton.addEventListener("click", function() {
  gameGeneration();
});

// play again button
playAgainButton.addEventListener("click", function() {
  resultsDiv.style.display = "none";
  gameGeneration();
});

function generateCountry() {
  let countryToGuess = randomCountry({full: true});
}

generateCountry();
