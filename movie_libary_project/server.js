import express from 'express';
import cookieParser from 'cookie-parser';
import movies from './movies.js';
import sessions from './sessions.js';
import users from './users.js';
import comments from './comments.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('dist'));
app.use(express.json());

app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);
  users.getUserData(username);

  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

const movieList = movies.makeMovieList();
app.get('/api/v1/movies', (req, res) => {
  res.json(movieList.getMovies());
});

app.get('/api/v1/movies/:id', (req, res) => {
  const { id } = req.params;
  if (!movieList.contains(id)) {
    res.status(404).json({ error: 'noSuchId' });
    return;
  }
  res.json(movieList.getMovie(id));
});

app.post('/api/v1/movies', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const movieData = req.body;
  if (!movieData.title || !movieData.year) {
    res.status(400).json({ error: 'required-fields' });
    return;
  }
  const id = movieList.addMovie(movieData);
  res.json(movieList.getMovie(id));
});

app.delete('/api/v1/movies/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  const exists = movieList.contains(id);
  if (!exists) {
    res.status(404).json({ error: 'noSuchId' });
    return;
  }

  movieList.deleteMovie(id);
  res.json({});
});

app.get('/api/v1/movies/:id/comments', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id: movieId } = req.params;
  res.json(comments.getComments(movieId));
});

app.post('/api/v1/movies/:id/comments', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id: movieId } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: 'Invalid comment data' });
    return;
  }

  const timestamp = new Date().toISOString();
  const savedComment = comments.addComment({ movieId, username, content, timestamp });
  res.status(201).json(savedComment);
});

app.get('/api/v1/favorites', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userData = users.getUserData(username);
  res.json(userData.favorites);
});

app.post('/api/v1/favorites/:movieId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { movieId } = req.params;
  const userData = users.getUserData(username);

  if (!movieList.contains(movieId)) {
    res.status(404).json({ error: 'movie-not-found' });
    return;
  }

  if (!userData.favorites.includes(movieId)) {
    userData.favorites.push(movieId);
  }

  res.json(userData.favorites);
});

app.delete('/api/v1/favorites/:movieId', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { movieId } = req.params;
  const userData = users.getUserData(username);

  const index = userData.favorites.indexOf(movieId);
  if (index >= 0) {
    userData.favorites.splice(index, 1);
  }

  res.json(userData.favorites);
});

app.get('/api/v1/users/:username', (req, res) => {
  const { username } = req.params;
  if (!users.isValid(username)) {
    return res.status(404).json({ error: 'user-not-found' });
  }

  const userData = users.getUserData(username);
  res.json({ username, favorites: userData.favorites });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));