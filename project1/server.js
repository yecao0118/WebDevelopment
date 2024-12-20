const express = require('express');
const cookieParser = require('cookie-parser');
const { createSession, isValidUsername, isValidSession, deleteSession, sessions } = require('./models/loginModel');
const { 
    startNewGame, 
    getGameState, 
    processGuess, 
    getUserStats, 
    getLeaderboard 
} = require('./models/gameModel');
const { renderLoginPage } = require('./views/loginView');
const { renderGamePage } = require('./views/gameView');
const words = require('./words');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !isValidSession(sid)) {
        return res.send(renderLoginPage());
    }

    const username = sessions[sid].username;
    const gameState = getGameState(username);
    if (!gameState) {
        return res.redirect('/new-game');
    }

    const leaderboard = getLeaderboard(); 
    const userStats = getUserStats(username);
    res.send(renderGamePage(username, gameState, words, leaderboard, userStats));
});

app.post('/login', (req, res) => {
    const { username } = req.body;

    if (username.toLowerCase() === 'dog') {
        return res.status(403).send(renderLoginPage('Forbidden: Username "dog" is not allowed'));
    }

    if (!isValidUsername(username)) {
        return res.status(400).send(renderLoginPage('Invalid username. Use alphabetic and numeric characters only.'));
    }

    const sid = createSession(username);
    res.cookie('sid', sid, { httpOnly: true });

    if (!getGameState(username)) {
        startNewGame(username);
    }

    res.redirect('/');
});

app.post('/guess', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !isValidSession(sid)) {
        return res.status(401).send(renderLoginPage('Unauthorized: Please log in first.'));
    }
    
    const username = sessions[sid].username;
    const gameState = getGameState(username);

    if (gameState.isGameWon) {
        return res.redirect('/');
    }

    const guess = req.body.guess;
    const matchedLetters = processGuess(username, guess);

    if (!matchedLetters) {
        const leaderboard = getLeaderboard(); 
        const userStats = getUserStats(username);
        return res.status(400).send(renderGamePage(username, gameState, words, leaderboard, userStats, 'Invalid guess. Please try again.'));
    }

    res.redirect('/');
});

app.post('/new-game', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !isValidSession(sid)) {
        return res.status(401).send(renderLoginPage('Unauthorized: Please log in first.'));
    }
    const username = sessions[sid].username;

    startNewGame(username);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    if (sid) {
        deleteSession(sid);
    }
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
