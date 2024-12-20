const crypto = require('crypto');

const sessions = {};

function addSession(username) {
  const sid = crypto.randomUUID();
  sessions[sid] = { username, createdAt: new Date().toISOString() };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getAllSessions() {
  return { ...sessions };
}

module.exports = { addSession, getSessionUser, deleteSession, getAllSessions };