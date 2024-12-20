const users = {};

function isValid(username) {
  return !!username && /^[A-Za-z0-9_]+$/.test(username);
}

function isPermitted(username) {
  return username !== 'dog';
}

function getAllUsers() {
  return Object.keys(users);
}

function getUserData(username) {
  return users[username];
}

function addUserData(username) {
  if (!users[username]) {
    users[username] = { messages: [] };
  }
}

function addUserMessage(username, message) {
  if (users[username]) {
    users[username].messages.push({ message, timestamp: new Date().toISOString() });
  }
}

function getUserMessages(username) {
  return users[username] ? users[username].messages : [];
}


module.exports = {
  isValid,
  isPermitted,
  getUserData,
  addUserData,
  addUserMessage,
  getUserMessages,
  getAllUsers,
};