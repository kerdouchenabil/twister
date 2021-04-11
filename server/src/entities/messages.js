class Messages {
    constructor(db) {
      this.db = db
      // creation de la table messages dans la BD mongodb
      //db.messages

    }


    async create(user_id, text_msg, file_msg) {
      let _this = this
      console.log("debut message creation: user=", user_id, " date=", new Date(Date.now())) //affichage test

      try{
        let now = new Date(Date.now())
        let msg = {user: user_id, date: now, text: text_msg, file: file_msg, likes: "0", comments: []}; //
        //console.log(msg) //test
        return new Promise((resolve, reject) => {
  
          _this.db.insert(msg, function(err, doc) {
  
            //console.log("message created: user=", doc.user, " date=", doc.date) //affichage test
  
            if(err){
              reject(err)
            }else{
              /*
              _this.db.find({date:{$gt:new Date(Date.now()-5*60*1000)}},function(err,docs){ //5 dernieres minutes affichage test
                console.log("derniers messages:");
                console.log(docs);
              });
              */
              resolve("message created")
            }
          })
        });
      }catch(e){
        return "post message error !"
      }
    }


    //---------------------- list messages of all users -----------------------
    async list_all(max_time_msg, only_friends_msg) {
      //valeurs par defaut:
      let max = max_time_msg // IMPORTATANT: MAX_TIME_MSG EN MINUTES !
      if(!max){
        max = 10 // par defaut les 10 dernieres minutes
      }
      let only_friends = only_friends_msg
      if(!only_friends_msg){
        only_friends_msg = false // par defaut (si undefined)
      }

      let _this = this
      console.log("debut message listing: max_time=", max, "min  only_friends=", only_friends) //affichage test

      // TODO : if only_friends = true
      //

      //if only friends = false
      try{
        let now = new Date(Date.now())

        return new Promise((resolve, reject) => {
          _this.db.find({date:{$gt:new Date(now-max*60*1000)}},function(err,docs){ //max dernieres minutes 
            //console.log("derniers messages:");
            //console.log(docs);
            if(err){
              reject(err)
            }else{
              resolve(docs)
            }
          });
        });
      }catch(e){
        return "list messages error !"
      }
    }


}

exports.default = Messages;