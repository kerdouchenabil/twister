const express = require("express");
const Messages = require("./entities/messages.js");

function init(db) {
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
    const messages = new Messages.default(db);

    //
    router
        .route("/messages")

        //--------------------------- POST message ----------------------------------
        .post(async (req, res) => {
            try{
                // utilisateur connecté ?
                if (! req.session.userid ) {
                    res.status(401).json({message:"post message: utilisateur non authentifié"});
                    return;
                }

                // récuperer l'id user de la session
                userid = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)

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

                messages.create(userid, text, file) //utiliser  x = await fonction... aulieu des .then 
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
        })


        //.route("/messages/:user_id(\\d+)")
        
        //TODO


    return router;
}

exports.default = init;