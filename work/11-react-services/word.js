const userWords = {};

function getWord(username) {
  return userWords[username] || '';
}

function setWord(username, word) {
  userWords[username] = word;
}

export default {
  getWord,
  setWord,
};