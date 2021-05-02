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
    const users = new Users.default(db);

    //connexion
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(401).json({
                    status: 401, //facultatif
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if (! await users.exists(login)) {
                res.status(400).json({
                    status: 400,
                    message: "User not found"
                });
                return;
            }

            let userid; //declaration en dehors du try
            try {
                userid = await users.checkpassword(login, password)
            } catch (e) {
                res.status(403).send("login et/ou le mot de passe invalide(s)");
                return; //ne pas oublier le return !
            }

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
                        let u_data

                        users.get(userid)
                            .then((data) => {
                                u_data = data; console.log("api_users--> u_data= ", u_data)
                                req.session.user_data = u_data;

                                console.log('session id=', req.session.id, '  créée pour session.user_data=', req.session.user_data) //test

                                res.status(200).json(
                                    data //renvoi les données de l'utilisateur
                                );
                            })
                            .catch((err) => { res.status(500).send(err); return })
                    }
                });
                return;
            }

            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                //status: 403,
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

    //---------------------- get user by id ----------------------------
    router
        .route("/user/:user_id(\\d+)")
        .get(async (req, res) => {

            try {
                let id = req.params.user_id
                if (req.params.user_id == 0) {
                    id = req.session.userid
                }
                const user = await users.get(id);

                if (!user)
                    res.sendStatus(404);
                else
                    res.status(200).send(user)
            }
            catch (e) {
                res.status(500).send(e);
            }
        })

        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));


    //---------------------- create user ----------------------------
    router.post("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("create user: Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });


    //---------------------- logout ------------------
    router.delete("/user/logout", async (req, res) => {
        try {
            //const { user_id } = req.body;
            const userid = req.session.userid
            //erreur ?
            if (!userid) {
                res.status(401).json({
                    //status: 400,
                    "message": "utilisateur non authentifié !"
                });
                return;
            }
            //on le deconnecte
            req.session.destroy();
            res.status(201).json({
                //status: 201,
                message: "déconnexion réussie",
                userid: userid
            })
            return;

        } catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });


    // --------------------- search user ------------------------
    router.get("/user/search/:string", async (req, res) => {
        const userid = req.session.userid
        //erreur ?
        if (!userid) {
            res.status(401).json({
                //status: 400,
                "message": "utilisateur non authentifié !"
            });
            return;
        }
        try {
            str = req.params.string
            if (str.indexOf(" ") == -1) {

                const ser = await users.search(str)
                console.log(str)
                if (!ser)
                    res.sendStatus(404);
                else
                    res.status(200).send(ser);
            }
        }
        catch (e) {

            res.status(500).send(e);
        }
    })

    return router;
}

exports.default = init;