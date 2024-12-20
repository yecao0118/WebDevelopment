const words = require('../words'); 
const games = {};                 
const userStats = {};             
const leaderboard = [];            

function startNewGame(username) {
    const secretWord = words[Math.floor(Math.random() * words.length)];
    games[username] = {
        secretWord,
        guesses: [],
        guessCount: 0,
        isGameWon: false,
    };
    console.log(`New game started for ${username}. Secret word: ${secretWord}`);
}

function getGameState(username) {
    return games[username];
}

function processGuess(username, guess) {
    const gameState = games[username];
    const lowerGuess = guess.toLowerCase();

    if (!words.includes(lowerGuess)) return null;
    if (gameState.guesses.some(g => g.word === lowerGuess)) return null;

    const matchedLetters = getMatchedLetters(lowerGuess, gameState.secretWord);
    gameState.guesses.push({ word: lowerGuess, matched: matchedLetters });
    gameState.guessCount++;

    if (lowerGuess === gameState.secretWord.toLowerCase()) {
        gameState.isGameWon = true;
        updateUserStats(username, gameState.guessCount);
    }

    return matchedLetters;
}

function getMatchedLetters(guess, secretWord) {
    let count = 0;
    const guessedLetters = {}; 

    for (const letter of guess) {
        if (!guessedLetters[letter] && secretWord.includes(letter)) {
            count++;
            guessedLetters[letter] = true;
        }
    }
    return count;
}

function updateUserStats(username, guesses) {
    if (!userStats[username]) {
        userStats[username] = {
            gamesPlayed: 0,
            totalGuesses: 0,
            personalBest: Infinity,
            averageGuesses: 0,
        };
    }

    userStats[username].gamesPlayed++;
    userStats[username].totalGuesses += guesses;
    userStats[username].personalBest = Math.min(
        userStats[username].personalBest,
        guesses
    );

    userStats[username].averageGuesses = (
        userStats[username].totalGuesses / userStats[username].gamesPlayed
    ).toFixed(2);

    updateLeaderboard(username, userStats[username].personalBest);
}


function updateLeaderboard(username, personalBest) {
    const entry = leaderboard.find((e) => e.username === username);

    if (entry) {
        if (personalBest < entry.personalBest) {
            entry.personalBest = personalBest;
        }
    } else {
        leaderboard.push({ username, personalBest });
    }

    leaderboard.sort((a, b) => a.personalBest - b.personalBest);

    if (leaderboard.length > 10) {
        leaderboard.length = 10;
    }
}


function getUserStats(username) {
    return userStats[username] || {
        gamesPlayed: 0,
        totalGuesses: 0,
        personalBest: 'N/A',
        averageGuesses: 'N/A',
    };
}

function getLeaderboard() {
    return leaderboard;
}

module.exports = {
    startNewGame,
    getGameState,
    processGuess,
    getUserStats,
    getLeaderboard,
};