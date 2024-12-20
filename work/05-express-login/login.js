"use strict";

const crypto = require('crypto');
const sessions = {};


const loginUser = (req, res) => {
    const username = req.body.username.trim();
    

    if (!username || username === 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
        const status = username === 'dog' ? 403 : 400;
        return res.status(status).send(`<h1>${status === 400 ? 'Invalid Username' : 'Forbidden'}</h1><a href="/">Go back</a>`);
    }

    const sid = crypto.randomUUID();
    sessions[sid] = { username }; 
    res.cookie('sid', sid); 
    res.redirect('/'); 
};


const checkSession = (req, res, next) => {
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        req.username = sessions[sid].username; 
        next();
    } else {
        next();
    }
};


const logoutUser = (req, res) => {
    const sid = req.cookies.sid;
    delete sessions[sid]; 
    res.clearCookie('sid'); 
    res.redirect('/'); 
};


module.exports = { loginUser, checkSession, logoutUser };

