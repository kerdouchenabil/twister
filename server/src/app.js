const path = require('path');
const api = require('./api_users.js');
const api_friends = require('./api_friends.js');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_1 = require("./api_users.js");
const session = require("express-session");

api_2 = require("./api_friends.js");////////////

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api', api.default(db)); //on passe la db
app.use('/api', api_friends.default(db)); //on passe la db

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

