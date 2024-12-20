const uuidv4 = require('crypto').randomUUID;
const sessions = {};

function createSession(username) {
  const sid = uuidv4();
  sessions[sid] = { username };
  return sid;
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

function isValidSession(sid) {
    return sessions[sid] !== undefined;
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  createSession,
  isValidUsername,
  isValidSession,
  deleteSession,
  sessions,
};