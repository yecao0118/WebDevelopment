"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const uuidv4 = require('crypto').randomUUID;

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(express.static('public')); 
const sessions = {}; 
const storedWords = {}; 


const checkSession = (req, res, next) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        req.username = sessions[sid].username;
        next();
    } else {
        next();
    }
};

app.use(checkSession);

app.get('/', (req, res) => {
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
                <h1>Meowtopia</h1>
                <form action="/login" method="POST">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username">
                    <button type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
        res.send(html);
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    if (!username) {
        return res.status(400).send('<h1>Invalid Username & Username Required</h1><a href="/">Go back</a>');
    }  
    if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).send('<h1>Invalid Username</h1><a href="/">Go back</a>');
    }
    if (username === 'dog') {
        return res.status(403).send('<h1>Not Permitted</h1><a href="/">Go back</a>');
    }


    const sid = uuidv4();
    sessions[sid] = { username };
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/update-word', (req, res) => {
    if (req.username) {
        storedWords[req.username] = req.body.storedWord;
        res.redirect('/');
    } else {
        res.status(403).send('<h1>Forbidden</h1>');
    }
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
