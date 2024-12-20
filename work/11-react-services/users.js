const users = {};

function isValidUsername(username) {
  return /^[A-Za-z0-9_]+$/.test(username);
}

function isValidWord(word) {
  return /^[A-Za-z]{1,20}$/.test(word);
}

export default {
  isValidUsername,
  isValidWord,
};