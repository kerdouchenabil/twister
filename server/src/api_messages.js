const express = require("express");
const Messages = require("./entities/messages.js");
const Users = require("./entities/users.js");
const Friends = require("./entities/friends.js");

function init(db_nosql, db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });

    const messages = new Messages.default(db_nosql, db);
    const users = new Users.default(db); //db ?
    const friends = new Friends.default(db);

    router
        .route("/messages")

        //--------------------------- POST message ----------------------------------
        .post(async (req, res) => {
            try {
                // utilisateur connecté ?
                if (!req.session.userid) {
                    res.status(401).json({ message: "post message: utilisateur non authentifié" });
                    return;
                }

                // récuperer l'id user de la session
                userid = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)
                let firstname = req.session.user_data.firstname
                let lastname = req.session.user_data.lastname

                console.log("post message: session.user_data= ", req.session.user_data)
                console.log('post message: session id=', req.session.id, '  session.userid=', req.session.userid) // test

                const { text, file } = req.body;
                // si pas de text ET pas de file
                if (!text && !file) {
                    res.status(404).json({
                        //status: 401, //facultatif
                        message: "Requête invalide : post vide !"
                    });
                    return;
                }

                messages.create(userid, firstname, lastname, text, file) //utiliser  x = await fonction... aulieu des .then 
                    .then((added) => res.status(201).send({ create_message: added })) //pas la peine de retourner l'id, le status suffit
                    .catch((err) => res.status(500).send(err));
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    //status: 500,
                    message: "post message: erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        });


    //----------------------- list messages --------------------------
    router.route("/messages/:max(\\d+):onlyfriends")
        .get(async (req, res) => { // pas de body, utiliser url query
            try {
                let max_time = req.params.max
                let friends_only = req.params.onlyfriends
                console.log("max_time=", max_time, "  friends_only", friends_only) //test

                // si pas de text ET pas de file
                if (!max_time && !friends_only) {
                    res.status(404).json({
                        //status: 401, //facultatif
                        message: "Requête invalide : choose max_time and friends_only values !"
                    });
                    return;
                }

                // voir si on va permettre aux non connectés de voir les messages, ici non
                // utilisateur connecté ?
                if (!req.session.userid) {
                    res.status(401).json({ message: "post message: utilisateur non authentifié" });
                    return;
                }

                // récuperer l'id user de la session
                userid = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)

                console.log('list messages: session id=', req.session.id, '  session.userid=', req.session.userid) // test
                let friends_list = []
                await friends.list_friends(userid).then((f) => friends_list = f).catch((err) => console.log("liste des friends introuvable !!!"))

                messages.list_all(max_time, friends_only, userid)
                    .then((msgs) => {

                        if (friends_only == ":true") {
                            try {
                                let f_ids = []
                                friends_list.forEach(element => f_ids.push(element.userid));
                                let friends_msgs = []
                                for (var i in msgs) {
                                    if (f_ids.includes(msgs[i].user)) {
                                        friends_msgs.push(msgs[i])
                                    }
                                };

                                res.status(200).send(friends_msgs) //renvoi la liste des friends
                                return
                            }
                            catch (err) {
                                console.log("--erreur dans friends only = :true")
                                res.status(500).send(err)
                            }

                        }
                        res.status(200).send(msgs)
                    })
                    .catch((err) => res.status(501).send(err));

            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    //status: 500,
                    message: "lsit messages: erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })

    //--------------------like message -------------------------
    router.route("/messages/like/:message_id")
        .put(async (req, res) => {
            try {
                // utilisateur connecté ?
                if (!req.session.userid) {
                    res.status(401).json({ message: "like message: utilisateur non authentifié" });

                    return;
                }

                const msg = await messages.like(req.params.message_id);

                if (!msg)
                    res.sendStatus(404);
                else
                    res.status(200).send(msg)
            } catch (error) {
                console.log("catch")
                res.status(500).send(error);
            }
        })

    //----------------------- delete messages --------------------------

    router.route("/messages/delete/:message_id")
        .delete(async (req, res) => {
            try {
                if (!req.session.userid) {
                    res.status(401).json({ message: "delete message: utilisateur non authentifié" });

                    return;
                }
                const msg = await messages.delete(req.params.message_id);
                if (!msg)
                    res.sendStatus(404);
                else
                    res.status(200).send(msg)
            } catch (error) {
                res.status(500).send(error);
            }
        })


    //----------------------- list messages of a user --------------------------
    router.route("/messages/of/:user(\\d+):max")
        .get(async (req, res) => { // pas de body, utiliser url query
            try {
                let user = req.params.user
                let max_time = req.params.max

                //enlever les ":" au debut
                const words = max_time.split(':');
                console.log("word 0  ", words[0]);
                console.log("word 1  ", words[1]);
                max_time = words[1]

                if (!max_time) {
                    max_time = 10000000000
                }

                console.log("api_message: max_time=", max_time, "  user=", user) //test

                // si pas de user 
                if (!user) {
                    res.status(404).json({
                        //status: 401, //facultatif
                        message: "Requête invalide : choose a user_id value !"
                    });
                    return;
                }

                // voir si on va permettre aux non connectés de voir les messages, ici non
                // utilisateur connecté ?
                if (!req.session.userid) {
                    res.status(401).json({ message: "post message: utilisateur non authentifié" });
                    return;
                }

                userid = user /// voir si suffisant (quand on aura  mongoose  pour les sessions)
                //si on user de la requete =0 on retourne my messages
                if (userid == 0) {
                    // récuperer l'id user de la session
                    userid = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)
                }
                // si user not exists
                try {
                    if (! await users.exists_id(userid)) {
                        res.status(404).json({
                            message: "api_message: user not found"
                        });
                        return;
                    }
                } catch (e) {
                    res.status(500).send(e)
                    return;
                }

                console.log('api_messages: list messages: session id=', req.session.id, '  session.userid=', req.session.userid) // test

                messages.list_of(userid, max_time) //utiliser  x = await fonction... aulieu des .then 
                    .then((msgs) => res.status(200).send(msgs)) //pas la peine de retourner l'id, le status suffit
                    .catch((err) => res.status(500).send(err));
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    //status: 500,
                    message: "lsit messages: erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })


    //----------------------- comment messages --------------------------
    router.route("/messages/comment/:message_id")
        .put(async (req, res) => {
            try {
                if (!req.session.userid) {
                    res.status(401).json({ message: "like message: utilisateur non authentifié" });
                    return;
                }

                msg_id = req.params.message_id
                const msg = req.body;
                const got = await messages.comment(msg_id, msg)
                if (!got)
                    res.sendStatus(404);
                else
                    res.status(200).send(got)
            } catch (error) {
                console.log("catch")
                res.status(500).send(error);
            }
        })

    return router;
}

exports.default = init;