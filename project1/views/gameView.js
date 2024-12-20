const gameView = {
    renderGamePage: function (username, gameState, words, leaderboard, userStats, errorMessage = '') {
        const { guesses, guessCount, isGameWon } = gameState;
    
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <link rel="stylesheet" href="/game.css">
                    <title>Word Guess</title>
                </head>
                <body class="game-page">
                    <h1 class="title">Welcome ${username}</h1>
                    <div class="main-content">
                        ${gameView.leaderboardSection(leaderboard)}
                        ${gameView.middleSection(words, guessCount, guesses, isGameWon, errorMessage)}
                        ${gameView.userStatsSection(userStats)}
                    </div>
                </body>
            </html>
        `;
    },

    leaderboardSection: function (leaderboard) {
        return `
            <div class="left-column">
                <h2 class="subtitle">Leaderboard</h2>
                <ol class="leaderboard">
                    ${leaderboard.map(entry => `<li class="leaderboard-item">${entry.username}: ${entry.personalBest} guesses</li>`).join('')}
                </ol>
            </div>
        `;
    },

    middleSection: function (words, guessCount, guesses, isGameWon, errorMessage) {
        return `
            <div class="middle-column">
                <h2 class="subtitle">Possible Words</h2>
                <ul class="word-list">
                    ${words.map(word => `<li class="word-item">${word}</li>`).join('')}
                </ul>
                <p class="guess-count">Number of guesses: ${guessCount}</p>
                <p class="previous-guesses-title">Previous guesses:</p>
                <ul class="guess-list">
                    ${guesses.map(guess => `<li class="guess-item">${guess.word} (${guess.matched} letters matched)</li>`).join('')}
                </ul>
                ${isGameWon ? '<p class="celebration">You have won the game! Click New Game to Start</p>' : ''}
                ${errorMessage ? `<p class="error-message">${errorMessage}</p>` : ''}
                ${gameView.guessForm()}
                ${gameView.actionButtons()}
            </div>
        `;
    },

    userStatsSection: function (userStats) {
        return `
            <div class="right-column">
                <h2 class="subtitle">Your Statistics</h2>
                <p class="user-stats">Games Played: ${userStats.gamesPlayed}</p>
                <p class="user-stats">Personal Best: ${userStats.personalBest === Infinity ? 'N/A' : userStats.personalBest} guesses</p>
                <p class="user-stats">Average Guesses: ${userStats.averageGuesses === 0 ? 'N/A' : userStats.averageGuesses}</p>
            </div>
        `;
    },

    guessForm: function () {
        return `
            <form class="guess-form" action="/guess" method="POST">
                <input class="form-input" type="text" name="guess" placeholder="Enter your guess from above WORDS" required>
                <button class="btn" type="submit">Submit Guess</button>
            </form>
        `;
    },

    actionButtons: function () {
        return `
            <form class="action-form" action="/new-game" method="POST">
                <div class="button-box">
                    <button class="btn" type="submit" formaction="/new-game">Start New Game</button>
                    <button class="btn" type="submit" formaction="/logout">Logout</button>
                </div>
            </form>
        `;
    },
};

module.exports = gameView;