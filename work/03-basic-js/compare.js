"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

  const lowerWord = word.toLowerCase();
  const lowerGuess = guess.toLowerCase();

  const letterCount = {};

  for (let char of lowerWord) {
    if (letterCount[char]) {
      letterCount[char]++;
    } else {
      letterCount[char] = 1;
    }
  }

  let matchCount = 0;
  for (let char of lowerGuess) {
    if (letterCount[char] && letterCount[char] > 0) {
      matchCount++;
      letterCount[char]--;
    }
  }
   
  return matchCount;
}
