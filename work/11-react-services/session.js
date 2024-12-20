import { randomUUID as uuid } from 'crypto';

const sessions = {};

function createSession() {
  const sid = uuid();
  sessions[sid] = { created: Date.now() };
  return sid;
}

function getSession(sid) {
  return sessions[sid];
}

function deleteSession(sid) {
  delete sessions[sid];
}

export default {
  createSession,
  getSession,
  deleteSession,
};