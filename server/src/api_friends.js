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
                const id_to  = req.params.user_id
                console.log("id_to ==", id_to)
                //console.log(`add friend: req.body= ${JSON.stringify(req.body)}`) ///////test

                if (! id_to ) {
                    res.status(400).json({message:"add friend: Missing fields"});
                    return;
                }

                // utilisateur connecté ?
                if (! req.session.userid ) {
                    res.status(401).json({message:"add friend: utilisateur non authentifié"});
                    return;
                }

                // récuperer l'id user de la session
                id_from = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)

                console.log('api_friends: session id=', req.session.id, '  session.userid=', req.session.userid) // test
                
                // friend existe ?
                try{
                    if(! await users.exists_id(id_to)) { 
                        res.status(400).json({
                            //status: 400, //dupliquation !
                            message: "api_friend: friend not found"
                        });
                        return;
                    }
                }catch(e){
                    res.status(500).send("friend not found !")
                    return;
                }

                // verifier que le  user ne s'ajoute pas lui meme 
                if(id_from == id_to){
                    res.status(500).json("api_friend: on ne peut pas s'ajouter soi-même en ami !")
                    return;
                }

                friends.add(id_from, id_to) //utiliser  x = await fonction... aulieu des .then 
                    .then((added) => res.status(201).send({ id: added })) //pas la peine de retourner l'id, le status suffit
                    .catch((err) => res.status(500).send(err));
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    //status: 500,
                    message: "api_friend: erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })

    //----------------------- DELETE friend ----------------------

        .delete(async (req, res)=>{
            try{
                const id_to  = req.params.user_id
                console.log("id_to ==", id_to)

                if (! id_to ) {
                    res.status(400).json({message:"delete friend: Missing fields"});
                    return;
                }

                // utilisateur connecté ?
                if (! req.session.userid ) {
                    res.status(401).json({message:"delete friend: utilisateur non authentifié"});
                    return;
                }

                // récuperer l'id user de la session
                id_from = req.session.userid /// voir si suffisant (quand on aura  mongoose  pour les sessions)
                
                // friend existe ? facultatif
                try{
                    if(! await users.exists_id(id_to)) { 
                        res.status(400).json({
                            //status: 400, //duplication !
                            message: "api_friend: friend not found"
                        });
                        return;
                    }
                }catch(e){
                    res.status(500).send("friend not found !")
                    return;
                }
                
                //delete the friendship, the function tests if it exists
                friends.delete(id_from,id_to)
                    .then((deleted) => res.status(200).send("friend deleted !") ) 
                    .catch( () => res.status(400).send("friendship not found !") )
                
            } catch (error) {
                // Toute autre erreur
                res.status(500).json({
                    //status: 500,
                    message: "api_friend: erreur interne",
                    details: (error || "Erreur inconnue").toString()
                })
            }
        })
  
        //--------------------- list friends of a user --------------------------//
        router.route("/friends/:user_id(\\d+)")
        .get(async (req,res)=>{
            try {
                let id_from = req.params.user_id
                // si id = 0 je renvoi le mien
                if(id_from == 0){
                    id_from = req.session.userid
                }
                
                if(! id_from ) {
                    res.status(400).json({message:"list friends: Missing fields"});
                    return;
                }

                // utilisateur connecté ?
                if (! req.session.userid ) {
                    res.status(401).json({message:"list friends: utilisateur non authentifié"});
                    return;
                }

                // user exists ?
                try{
                    if(! await users.exists_id(id_from)) { 
                        res.status(400).json({
                            //status: 400, //duplication !
                            message: "list friends: user not found"
                        });
                        return;
                    }
                }catch(e){
                    res.status(500).send("user not found !")
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