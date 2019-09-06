// counters used in script
let lives, wins, currentWord, guessedLetters, dictionary, numberOfGuesses;

// references to HTML elements
let currentWordText, guessedLettersText, livesText, winsText;

// references to HTML sound elements
let winSound, badGuessSound, loseSound;

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

  // get references to the html sound elements
  winSound = document.getElementById('winSound');
  badGuessSound = document.getElementById('badGuessSound');
  loseSound = document.getElementById('loseSound');

  wins = 0;
  winsText.textContent = 'Wins: 0';

  // initialize the game
  initializeGame();
};
/*
 * @param arr, the array to be checked
 * @param letter, the letter the function is checking for
 * @return returns true if letter was found in array, otherwise false
 * checks an array for a letter
 */
const checkArrLetter = (arr, letter) => {
  return arr.includes(letter);
};

/*
 * @param letter, the letter the function is checking for
 * function to update guessedLetters model and view
 */
const updateGuessedLetters = letter => {
  guessedLetters.push(letter); // add to guessedLetters
  guessedLettersText.textContent += letter + ' '; // update guessedLettersText with keyPressed
};

/*
 * @param dictionary, the object to check
 * @param letter, the letter the function is checking for
 * function to check if letter exists in the dictionary (the currentWord)
 */
const checkDictionary = letter => {
  // loop through each key in the dictionary
  for (let i = 0; i < Object.values(dictionary).length; i++) {
    // if the value matches the letter
    if (dictionary[i][0] === letter) {
      return true;
    }
  }
  return false; // returns false if the letter is not part of the dictionary
};

/*
 * function to check if the player has guessed all the letters of the
 * currentWord by building a string using the dictionary
 */
const checkWinCondition = () => {
  let word = ''; // model of the currentWord

  // loop through each key in the dictionary
  for (let i = 0; i < Object.values(dictionary).length; i++) {
    // build the word using the dictionary
    word += dictionary[i][1];

    // if the currentWord equals the word
    if (currentWord === word) {
      wins++; // increment winds
      winsText.textContent = 'Wins: ' + wins; // update text content
      playAudio(winSound);
      initializeGame(); // restart the game
    }
  }
};

const playAudio = sample => {
  sample.play();
};

/*
 *   @param e, the event
 *   function that handles what happens when the player presses a key
 */
document.onkeyup = e => {
  const keyPressed = e.key;

  // checks to see if keyPressed is a valid letter in letterbank
  if (checkArrLetter(letterBank, keyPressed)) {
    // when the keyPressed wasn't already guessed AND keyPressed matches a letter in the currentWord
    if (
      !checkArrLetter(guessedLetters, keyPressed) &&
      checkDictionary(keyPressed)
    ) {
      console.log('case 1: letter guessed part of the word');
      updateGuessedLetters(keyPressed); // add the guessed letter to the array

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
      // check win condition
      checkWinCondition();
    }

    // kwhen the keyPressed wasn't already guessed AND keyPressed DOES NOT match a letter in the currentWord
    else if (
      !checkArrLetter(guessedLetters, keyPressed) &&
      !checkDictionary(keyPressed)
    ) {
      console.log('case 2: letter guessed not part of the word');

      updateGuessedLetters(keyPressed); // add the guessed letter to the array

      lives--; // decrement lives
      livesText.textContent = 'Lives: ' + lives; // update livesText
      playAudio(badGuessSound);

      // re-initializes the game if lives equals zero
      if (lives === 0) {
        playAudio(loseSound);
        initializeGame();
      }
    }

    // keyPressed already exist in guessedLetters
    else {
      console.log('case 3: duplicate guess');
      alert(
        'The letter has been guessed already. Try again with a different letter.'
      );
    }
  }
};

// function called when 'Restart Game' is pressed or when the webpage is loaded
const initializeGame = () => {
  console.log('GAME INITIALIZED');
  // initialize script variables
  lives = 5; // counter for lives, used to determine how many chances the player has get before a gameover
  guessedLetters = []; // array to keep track of each leter guessed
  dictionary = {}; // initialize empty object
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)]; // retrieve a random word from the wordBank
  numberOfGuesses = 0;

  console.log('currentWord:', currentWord);

  // update html elements
  currentWordText.textContent = 'Current Word: ';
  guessedLettersText.textContent = 'Guessed Letters: ';
  livesText.textContent = 'Lives: ' + lives;

  // loop and create an object using characters from the currentWord
  for (let i = 0; i < currentWord.length; i++) {
    dictionary[i] = [currentWord.charAt(i), ' _']; // object like: [id]:['currentWord's letter',' _']
    currentWordText.textContent += dictionary[i][1]; // updates text content with blanks
  }
};
