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
let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    wrongUserGuesses = 0,
    correctLetters = 0;


// DOM Variables
let gameButton = document.getElementById("game-button"),
    guessingDiv = document.getElementById("guessing-div"),
    introDiv = document.getElementById("intro-div"),
    gameDiv = document.getElementById("game-div"),
    resultsDiv = document.getElementById("results-div"),
    lettersDiv = document.getElementById("letters-div"),
    letters = document.getElementById("letters-div").cloneNode(true),
    answersDiv = document.getElementById("answers-div"),
    answersLetters = document.getElementById("answers-div").cloneNode(true);

introDiv.style.display = "none";
// resultsDiv.style.display = "inline-block";
// guessingDiv.style.display = "none";
gameButton.style.display = "none"; // temporary, remove when done

// make the play game button do something
gameButton.addEventListener("click", function() {
  gameButton.style.display = "none";
  gameDiv.style.display = "block";
});

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

    if (!correctAnswer) {
      // add another guess if the type of is a string meaning it hasn't been guessed
      if (typeof(alphabet[letter]) === "string") {
        wrongUserGuesses++; 
        }
    } else if (correctLetters == parseInt(wordToGuess.length)) {
      guessingDiv.style.display = "none";
      resultsDiv.getElementsByTagName("h2")[0].innerText = wordToGuess;
      resultsDiv.style.display = "block";
      console.log("winner!");
    }

    alphabet[letter] = 0; // zero out spot in alphabet
    console.log("Wrong guessels: " + wrongUserGuesses);
    console.log("Correct guesses: " + correctLetters);

    // check if user has guessed wrong too many times
    if (wrongUserGuesses > 10) {
      console.log("You lost!");
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

function generateCountry() {
  let countryToGuess = randomCountry({full: true});
}

generateCountry();
