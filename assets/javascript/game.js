// counters used in script
let /*numberOfGuesses,*/ lives,
  wins,
  currentWord,
  guessedLetters,
  correctGuesses,
  dictionary;

// references to HTML elements
let currentWordText, guessedLettersText, livesText, winsText;

// array containing available words the player can guess
const wordBank = [
  'moooooonkey',
  'beeear',
  'eleeeephant',
  'gorilla',
  'dog',
  'cat',
  'cow',
  'pig',
  'goat',
  'horse',
  'dinosaur'
];

// array containing every lowercase letter in the English alphabet
const letterBank = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// this function executed when the webpage loads
window.onload = () => {
  // re-initializes the game when restart is pressed
  document
    .getElementById('restartButton')
    .addEventListener('click', initializeGame);

  // get references to the html elements
  currentWordText = document.getElementById('currentWordText');
  guessedLettersText = document.getElementById('guessedLettersText');
  livesText = document.getElementById('livesText');
  winsText = document.getElementById('winsText');

  // initialize the game
  initializeGame();
};
/*
 * @param arr, the array to be checked
 * @param letter, the letter we are checking for
 * @return returns true if letter was found in array, otherwise false
 * checks an array for a letter
 */
const checkArrLetter = (arr, letter) => {
  return arr.includes(letter);
};

/*
 *   @param e, the event
 *   function that handles what happens when the player presses a key
 */
document.onkeyup = e => {
  const keyPressed = e.key;

  // checks to see if keyPressed is a valid letter in letterbank
  if (checkArrLetter(letterBank, keyPressed)) {
    // keyPressed does not exist in guessedLetters AND keyPressed matches a letter in the currentWord
    if (!checkArrLetter(guessedLetters, keyPressed)) {
      console.log(keyPressed);
      guessedLetters.push(keyPressed); // add to guessedLetters
      guessedLettersText.textContent += keyPressed + ' '; // update guessedLettersText with keyPressed

      // loop through each character form currentWord
      for (let i = 0; i < currentWord.length; i++) {
        // if the keyPressed matches one of the letters from the currentWord
        if (dictionary[i][0] === keyPressed) {
          dictionary[i][1] = keyPressed; // set the second value of the key from ' _' to keyPressed
          currentWordText.textContent = 'Current Word: '; // clears currentWordText
          // loop through each character of currentWord
          for (let j = 0; j < currentWord.length; j++) {
            currentWordText.textContent += dictionary[j][1]; // update the currentWordText with the keyPressed
          }
        }
      }

      //   console.log(dictionary);
    }

    // keyPressed already exist in guessedLetters
    else if (checkArrLetter(guessedLetters, keyPressed)) {
      console.log('letter has been guessed already');
    }

    // keyPressed does not exist in guessedLetter AND keyPressed DOES NOT match a letter in the currentWord
    else {
      lives--; // decrement lives
      livesText.textContent = 'Lives: ' + lives; // update livesText

      // re-initializes the game if lives equals zero
      if (lives === 0) {
        initializeGame();
      }
    }
  }
};

// function called when 'Restart Game' is pressed or when the webpage is loaded
const initializeGame = () => {
  // initialize script variables
  //   numberOfGuesses = 0; // counter for number of guesses
  lives = 2; // counter for lives, used to determine how many chances the player has get before a gameover
  guessedLetters = []; // array to keep track of each leter guessed
  //   correctGuesses = []; // arra to store
  dictionary = {}; // initialize empty object
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  console.log('currentWord:', currentWord);

  // update html elements
  currentWordText.textContent = 'Current Word: '; // resets currentWordText
  for (let i = 0; i < currentWord.length; i++) {
    dictionary[i] = [currentWord.charAt(i), ' _'];
    currentWordText.textContent += dictionary[i][1];
  }
  console.log(dictionary);
  guessedLettersText.textContent = 'Guessed Letters: ';
  livesText.textContent = 'Lives: 2';
  winsText.textContent = 'Wins: 0';
};
