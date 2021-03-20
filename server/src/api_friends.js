const express = require("express");
const Friends = require("./entities/friends.js");
const Users = require("./entities/users.js");

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
    
    const friends = new Friends.default(db);
    const users = new Users.default(db);

    //----------------------- add friend ----------------------
    router
        .route("/friends/:user_id(\\d+)")
        .post(async (req, res) => {
            try{
                const { id_to } = req.body; //id de l'ami à ajouter
                
                console.log(`add friend: req.body= ${JSON.stringify(req.body)}`) ///////test

                if (! id_to ) {
                    res.status(400).json({message:"add friend: Missing fields"});
                    return;
                }

                // TODO: récuperer l'id user de la session (cookies) //
                //

                if(! await users.exists(login)) { //creer une fonction exists avec id user
                    res.status(400).json({
                        //status: 400, //dupliquation !
                        message: "User not found"
                    });
                    return;
                }

                /*
                if (  ) { //TODO verifier si utilisateur connecté
                    res.status(400).send("User not connected");
                    return;
                    
                }
                */
               //TODO
                friends.add(from, to) //utiliser  x = await fonction... aulieu des .then 
                    .then((added) => res.status(201).send({ id: added })) //pas la peine de retourner l'id, le status suffit
                    .catch((err) => res.status(500).send(err));
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (e || "Erreur inconnue").toString()
                })
            }
        });

    


    return router;
}
exports.default = init;