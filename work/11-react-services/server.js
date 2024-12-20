import express from 'express';
import cookieParser from 'cookie-parser';

import sessions from './session.js';
import users from './users.js';
import word from './word.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());


app.use(express.static('./dist'));


app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const session = sid ? sessions.getSession(sid) : null;

  if (!session) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const username = session.username;

  if (!username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});


app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'user-disallowed' });
    return;
  }

  const sid = sessions.createSession(); 
  sessions.getSession(sid).username = username;

  res.cookie('sid', sid, { httpOnly: true });
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;

  if (sid) {
    sessions.deleteSession(sid);
    res.clearCookie('sid');
  }

  res.json({ message: 'Logged out' });
});

app.get('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const session = sid ? sessions.getSession(sid) : null;

  if (!session) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const username = session.username;

  if (!username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const wordData = word.getWord(username);
  res.json({ word: wordData });
});

app.post('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const session = sid ? sessions.getSession(sid) : null;

  if (!session) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const username = session.username;

  if (!username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word: newWord } = req.body;

  if (!users.isValidWord(newWord)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  word.setWord(username, newWord);
  res.json({ word: newWord });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});