"use strict";

const storedWords = {};


const renderHomePage = (req, res) => {
    if (req.username) {
        const storedWord = storedWords[req.username] || ''; 
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>Data Page</title>
            </head>
            <body>
                <h1>Hello, ${req.username}</h1>
                <h2>Your Stored Word: ${storedWord}</h2>
                <form action="/update-word" method="POST">
                    <label for="storedWord">Change Stored Word:</label>
                    <input type="text" id="storedWord" name="storedWord" value="${storedWord}">
                    <button type="submit">Update</button>
                </form>
                <form action="/logout" method="POST">
                    <button type="submit">Logout</button>
                </form>
            </body>
            </html>
        `;
        res.send(html);
    } else {
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>Login</title>
            </head>
            <body>
                <h1>Login</h1>
                <form action="/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <button type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
        res.send(html);
    }
};


const updateStoredWord = (req, res) => {
    if (req.username) {
        storedWords[req.username] = req.body.storedWord; 
        res.redirect('/'); 
    } else {
        res.status(403).send('<h1>Forbidden</h1>'); 
    }
};


module.exports = { renderHomePage, updateStoredWord };

