const express = require("express");
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
    //console.log(db)///////////////////////////
    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(! await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté"
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router
        .route("/user/:user_id(\\d+)") //regex: y'a rien après
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    router.post("/user", (req, res) => { //.post ?
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });

    //--------------------------

    //logout service
    router.delete("/user/logout", async (req, res) => {
        try {
            const { user_id } = req.body;
            //erreur ?
            if(!user_id){
                res.status(400).json({
                    status: 400,
                    "message": "Requete invalide : user_id nécessaire"
                });
                return;
            }
            //user_id n'existe pas? 
            if(! await users.exists(user_id)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            //est ce qu'il est conecté? non
            if(! (req.session.user_id === user_id)  ){ //ou == pour alléger
                res.status(400).json({
                    status: 400,
                    "message": "Utilisateur non connecté"
                });
                return;
            }
            //user_id valide et connecté -> on le deconnecte
            req.session.disconnect();
            res.status(201).json({
                status: 201,
                message: "déconnexion réussie"
            })
            return;

        } catch (error) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });


    //ajout d'un ami 
    router.post("user/add", async(req, res) =>{
        try{
            const{ user_id } = req.body;
            // if id incorrect
            if( ! user_id ){
                res.status(500).json({
                    status: 500,
                    "message": "Requete invalide : user_id invalide"
                });
                return;
            }

            // si user_id n'existe pas 
            if(! await users.exists(user_id)) {
                res.status(400).json({
                    status: 400,
                    message: "Utilisateur introuvable"
                });
                return;
            }

            // ajouter un ami. methode add_friend dans users.js ? ou creation friend.js ?
            //

        } catch (error) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    })

    //--------------------------

    
    console.log("- init va bien -")
    return router;
}
exports.default = init;

//console.log("- tout va bien -")