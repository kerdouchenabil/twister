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
                //const { id_to } = req.body; //id de l'ami à ajouter
                console.log("user _ id ==", req.params.user_id)
                const id_to  = req.params.user_id
                //console.log(`add friend: req.body= ${JSON.stringify(req.body)}`) ///////test

                if (! id_to ) {
                    res.status(400).json({message:"add friend: Missing fields"});
                    return;
                }

                // TODO: récuperer l'id user de la session (cookies) //
                id_from = 1 ////////////////////////////////////////////////////////////pour le moment
                //
                /*
                if(! await users.exists(login)) { //creer une fonction exists avec id user
                    res.status(400).json({
                        //status: 400, //dupliquation !
                        message: "User not found"
                    });
                    return;
                }
                */
                /*
                if (  ) { //TODO verifier si utilisateur connecté
                    res.status(400).send("User not connected");
                    return;
                    
                }
                */

                // verifié que le  user ne s'ajoute pas lui meme 

               //TODO
                await friends.add(id_from, id_to) //utiliser  x = await fonction... aulieu des .then 
                    .then((added) => res.status(201).send({ id: added })) //pas la peine de retourner l'id, le status suffit
                    .catch((err) => res.status(500).send(err));
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })
        .delete(async (req, res)=>{
            /*
            if (  ) { //TODO verifier si utilisateur connecté
                res.status(400).send("User not connected");
                return;
                
            }
            */
            try{
                const id_to  = req.params.user_id
                if (! id_to ) {
                    res.status(400).json({message:"delete friend: Missing fields"});
                    return;
                }
                id_from = 1
                await friends.delete(id_from,id_to)
                    .then((deleted) => res.status(200).send() )
                    .catch((err) => res.status(500).send(err))  
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })
        .get(async (req,res)=>{
            /*
            if (  ) { //TODO verifier si utilisateur connecté
                res.status(400).send("User not connected");
                return;
                
            }
            */
            try {
                const id_from = req.params.user_id
                if(! id_from ) {
                    res.status(400).json({message:"list friends: Missing fields"});
                    return;
                }
                await friends.list_friends(id_from)
                    .then((got) => res.status(200).send(got) )
                    .catch((err) => res.status(500).send(err))  
            }catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    status: 500,
                    message: "erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        });






        


    return router;
}
exports.default = init;