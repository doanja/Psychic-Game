// counters used in script
let lives, maxLives, wins, losts, currentWord, guessedLetters, dictionary;

// references to HTML elements
let currentWordText,
  guessedLettersText,
  livesText,
  winsText,
  lostsText,
  healthBarInfill;

// references to HTML sound elements
let winSound, badGuessSound, loseSound;

// array containing available words the player can guess
const wordBank = [
  'lion',
  'elephant',
  'giraffe',
  'tiger',
  'monkey',
  'bear',
  'panda',
  'gorilla',
  'lemur',
  'rhinoceros',
  'penguin',
  'hippopotamus',
  'otter',
  'leopard',
  'sloth',
  'kangaroo',
  'zebra',
  'orangutan',
  'koala',
  'meerkat',
  'crocodile',
  'camel',
  'capybara',
  'peacock',
  'emu',
  'chimpanzee',
  'aligator',
  'snake',
  'turtle',
  'flammingo'
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
  lostsText = document.getElementById('lostsText');

  // get references to the html sound elements
  winSound = document.getElementById('winSound');
  badGuessSound = document.getElementById('badGuessSound');
  loseSound = document.getElementById('loseSound');

  healthBarInfill = document.getElementById('healthBarInfill');

  wins = 0;
  winsText.textContent = 'Wins: 0';
  losts = 0;
  lostsText.textContent = 'Losts: 0';

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
 * @param letter, the letter the function is checking for
 * function to update guessedLetters model and view
 */
const updateGuessedLetters = letter => {
  guessedLetters.push(letter); // add to guessedLetters
  guessedLettersText.textContent += letter + ' '; // update guessedLettersText with keyPressed
};

/*
 * @param key, the letter the player guessed
 * function to handle what happens when the player guesses the right letter
 */
const onRightGuess = key => {
  // loop through each character form currentWord
  for (let i = 0; i < currentWord.length; i++) {
    // if the keyPressed matches one of the letters from the currentWord
    if (dictionary[i][0] === key) {
      dictionary[i][1] = key; // set the second value of the key from ' _' to keyPressed
      currentWordText.textContent = 'Current Word: '; // clears currentWordText

      // loop through each character of currentWord
      for (let j = 0; j < currentWord.length; j++) {
        currentWordText.textContent += dictionary[j][1]; // update the currentWordText with the keyPressed
      }
    }
  }
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

// function used to handle what happens when the player guesses the wrong character
const onWrongGuess = () => {
  lives--; // decrement lives
  livesText.textContent = 'Lives: ' + lives; // update livesText
  playAudio(badGuessSound); // plays sound
  updateHealthBar(lives); // update healthbar
};

/*
 * @param sample, the sound sample to be played
 * function to play a sound sample
 */
const playAudio = sample => {
  sample.play();
};

/*
 * @param num, number of current lives
 * function used to calculate and update healthBarInfill
 */
const updateHealthBar = num => {
  healthBarInfill.style.width = (num / maxLives) * 100 + '%';
};

// function used to update counters when player runs out of lives
const gameOver = () => {
  losts++; // increment losts
  lostsText.textContent = 'Losts: ' + losts; // updates lostsText
  playAudio(loseSound);
  initializeGame();
};

/*
 *   @param e, the event
 *   function that handles what happens when the player presses a key
 */
document.onkeyup = e => {
  const keyPressed = e.key.toLowerCase();

  // checks to see if keyPressed is a valid letter in letterbank
  if (checkArrLetter(letterBank, keyPressed)) {
    // when the keyPressed wasn't already guessed AND keyPressed matches a letter in the currentWord
    if (
      !checkArrLetter(guessedLetters, keyPressed) &&
      checkDictionary(keyPressed)
    ) {
      updateGuessedLetters(keyPressed); // add the guessed letter to the array
      onRightGuess(keyPressed); // player made the right guess

      // check win condition
      checkWinCondition();
    }

    // kwhen the keyPressed wasn't already guessed AND keyPressed DOES NOT match a letter in the currentWord
    else if (
      !checkArrLetter(guessedLetters, keyPressed) &&
      !checkDictionary(keyPressed)
    ) {
      updateGuessedLetters(keyPressed); // add the guessed letter to the array
      onWrongGuess(); // player made a wrong guess

      // if the player runs out of lives, call gameOver
      if (lives === 0) {
        gameOver();
      }
    }

    // keyPressed already exist in guessedLetters
    else {
      alert(
        'The letter has been guessed already. Try again with a different letter.'
      );
    }
  }
};

// function called when 'Restart Game' is pressed or when the webpage is loaded
const initializeGame = () => {
  // initialize script variables
  maxLives = 9;
  lives = maxLives; // counter for lives, used to determine how many chances the player has get before a gameover
  guessedLetters = []; // array to keep track of each leter guessed
  dictionary = {}; // initialize empty object
  currentWord = wordBank[Math.floor(Math.random() * wordBank.length)]; // retrieve a random word from the wordBank
  numberOfGuesses = 0;

  healthBarInfill.style.width = Math.floor(lives / maxLives) * 100 + '%';

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
