const path = require('path');
const api = require('./api_users.js');
const api_friends = require('./api_friends.js');
const api_messages = require('./api_messages.js');

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db0.db');

// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);

express = require('express');
const app = express()
const session = require("express-session");
//app.set('trust proxy', 1) //  si HTTPS //

api_1 = require("./api_users.js");
api_2 = require("./api_friends.js");////////////

//stockage sessions dans bd serveur
//var mongoose = require('mongoose'); //TODO

app.use(session({
    secret: "abcdefghijklmnopqrstuvwxyz0123456789", // a changer
    //cookie: { maxAge: 2628000000 },
    resave: false,
    //saveUninitialized: false,
}));

app.use('/api', (req, res, next) => {
if (req.session.aboutme_views) {
req.session.aboutme_views += 1
console.log('-----views=', req.session.aboutme_views)
console.log(req.session.id)
console.log(req.session)
} else {
req.session.aboutme_views = 1
console.log('-----creation session  views=', req.session.aboutme_views)
console.log(req.session.id)
console.log(req.session.userid)
console.log(req.session)
}
next();
})

app.use('/api', api.default(db)); //on passe la db
app.use('/api', api_friends.default(db)); //on passe la db

// mongo DB
const Datastore = require("nedb")
let db_nosql = new Datastore("db1.db")
db_nosql.loadDatabase()
//api_3 = require("./api_messages.js");////////////
app.use('/api', api_messages.default(db_nosql)); //on passe la db_nosql pour les messages
/*
const fullDate = Date()
console.log(fullDate)
db_nosql.insert(fullDate)
*/
//console.log(db_nosql) /// affichage db_nosql

//
// Démarre le serveur
app.on('close', () => {
});
exports.default = app;

