const path = require('path');
const api_users = require('./api_users.js');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(':memory:');

//console.log("app")
//console.log(db)

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
api_users_1 = require("./api_users.js");
const session = require("express-session");

app.use(session({
    secret: "technoweb rocks"
}));

app.use('/api_users', api_users.default(db)); //dabord /api puis api/default...

// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

