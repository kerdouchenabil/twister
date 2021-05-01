const Friends = require("./friends.js");
const { default: friends } = require("./friends.js");
class Messages {
    constructor(db,db_sql) {
      this.db = db
      this.db_sql = db_sql
      // creation de la table messages dans la BD mongodb
      //db.messages
      const friends = new Friends.default(db_sql);
    }
    

    async create(user_id, firstname_msg, lastname_msg, text_msg, file_msg) {
      let _this = this
      console.log("debut message creation: user=", user_id, " date=", new Date(Date.now())) //affichage test

      try{
        let now = new Date(Date.now())
        let msg = {user: user_id, firstname: firstname_msg, lastname: lastname_msg, date: now, text: text_msg, file: file_msg, likes: 0 , comments: []}; //
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
    async list_all(max_time_msg, only_friends_msg,userid) {
      //valeurs par defaut:
      let max = max_time_msg // IMPORTATANT: MAX_TIME_MSG EN MINUTES !
      if(!max){
        max = 10 // par defaut les 10 dernieres minutes
      }
      let only_friends = only_friends_msg
      if(!only_friends_msg){
        only_friends = false // par defaut (si undefined)
      }

      let _this = this
      console.log("debut message listing: max_time=", max, "min  only_friends=", only_friends) //affichage test

      // TODO : if only_friends = true
      //
      /*if (only_friends ==":true"){
        try{
          let now = new Date(Date.now())
          
          return new Promise((resolve, reject) => {
            
            _this.db.find( {date:{$gt:new Date(now-max*60*1000)} }, function(err,docs){ //max dernieres minutes 
              console.log("derniers messages:");
              
              if(err){
                reject(err)
              }else{
                
                try{
                  

                  let d = await friends.list_friends(userid)
                  .then((got) => {
                    let result = docs.filter(msg => $.each(got, function(i, obj) {
                      obj.userid == msg.user
                     }))

                    result.sort(function(a, b) {
                    
                      a = new Date(a.date);
                      b = new Date(b.date);
                      return a>b ? -1 : a<b ? 1 : 0;
                  })
                  
           
                  console.log(docs);
                  resolve(docs)
                  
                }).catch((err) =>reject(err))  
                  
                  
                }catch{
                  console.log("list messages error !§!")
                }
                
              }
            })
          });
        }catch(e){
          console.log("----catch-----", e)
          return "list messages error !"
        }    
      }*/
        
      
        try{
          let now = new Date(Date.now())
  
          return new Promise((resolve, reject) => {
            
            _this.db.find( {date:{$gt:new Date(now-max*60*1000)} }, function(err,docs){ //max dernieres minutes 
              console.log("derniers messages:");
              
              if(err){
                reject(err)
              }else{
                
                try{
                  docs.sort(function(a, b) {
                    
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return a>b ? -1 : a<b ? 1 : 0;
                });
                  
                  console.log(docs);
                  resolve(docs)
                }catch{
                  console.log("list messages error !!!")
                }
                
              }
            })
          });
        }catch(e){
          console.log("----catch-----", e)
          return "list messages error !"
        }
      
      //if only friends = false

    }


    //---------------------- list messages of one user -----------------------
    async list_of(max_time_msg, user_id) {
      //valeurs par defaut:
      let max = 10000000000000 // IMPORTATANT: MAX_TIME_MSG EN MINUTES !
      if(!max){
        max = 10 // par defaut les 10 dernieres minutes
      }
      const words = user_id.split(':');
      console.log("word 0  ", words[0]);
      console.log("word 1  ", words[1]);
      let userid = words[1]

      let _this = this
      console.log("debut message listing of one user: max_time=", max, "userid=", userid) //affichage test

      try{
        let now = new Date(Date.now())

        return new Promise((resolve, reject) => {
          _this.db.find(
            {date:{$gt:new Date(now-max*60*1000)}},
            {user : userid},
            function(err,docs){ //max dernieres minutes 
            if(err){
              reject(err)
            }else{

              //trier le result
              try{
                docs.sort(function(a, b) {
                  
                  a = new Date(a.date);
                  b = new Date(b.date);
                  return a>b ? -1 : a<b ? 1 : 0;
              });
                
                console.log(docs);
                resolve(docs)
              }catch{
                console.log("messages error !!")
              }

            }
          });
        });
      }catch(e){
        return "list messages error !"
      }
    }



    // like message 
    async like(id_msg){

      try{
        let _this = this
        return new Promise((resolve,reject)=>{
          try {
            
            _this.db.findOne({ _id: id_msg }, function (err, doc) {
              if (err){
                
                reject(err)
  
              }
  
              else{
                _this.db.update({ _id: id_msg }, { $inc: { likes: 1 } })

                resolve("liked")
              }
            });
          }catch(e){

                reject("message not found !")
                return ;
          }

        });
      }catch(e){

        return "like message error !"
      }

        
    }
    //delete mesage 
    async delete (id_msg){
      try {
        let _this = this 
        return new Promise((resolve,reject)=>{
            try {
              _this.db.remove({ _id: id_msg},function(err,doc) {
                if(err){
                  reject(err);
                }else{
                  resolve("deleted")
                }
              });
            }catch(e){
              reject(e.message)
              return ;
            }
        });
      }catch(e){
        return "delete messaage error "
      }
    }
  
}

exports.default = Messages;