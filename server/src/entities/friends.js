class Friends {
    constructor(db) {
      this.db = db
      // creation de la table users dans la BD
      this.db.exec(`CREATE TABLE IF NOT EXISTS friends (id_from VARCHAR(512) NOT NULL, id_to VARCHAR(512) NOT NULL, PRIMARY KEY (id_from, id_to) );`)
    }

    add(id_from, id_to) { 
        let _this = this
        return new Promise((resolve, reject) => {
          const st = _this.db.prepare("INSERT INTO friends VALUES (?,?)")
          st.run([id_from, id_to], function(err, res){
            if(err){
              reject("can not add this friend !")
            }else{
              resolve(this.lastID) //renvoi l'id de la ligne (id_from, id_to) créée
            }
          })
        });
      }

      async delete(id_from,id_to){
        let _this = this 

        //verifier dabord si friendship exists
        let ex = await _this.exists(id_from, id_to);

        return new Promise((resolve,reject) => {
          //si friendship n'existe pas
          if(!ex){
            reject(false)
          }
          const st = _this.db.prepare("DELETE FROM friends where id_from = ? and id_to = ?")
          st.run([id_from, id_to],function(err, res){
            resolve(true)
          })
        });
      }

      //return frindship if exists
      exists(id_from,id_to) {

        return new Promise((resolve, reject) => {
    
          var st = this.db.prepare("SELECT * FROM friends where id_from = ? and id_to = ?")
          st.get([id_from, id_to], function(err, res){
            if(err){
              reject(err)
            }else{
              resolve(res)
            }
          })
         });
      }

      
      async list_friends(id_from){
        let _this = this
        return new Promise((resolve,reject)=>{
          const st = _this.db.prepare("SELECT u.rowid as userid,u.login , u.firstname, u.lastname FROM friends f,users u  WHERE f.id_from = ? AND f.id_to = u.rowid ")
          st.all(id_from,function(err,res){
            if(err){
              reject(err)
            }else{
              resolve(res)
            }
          })

        });
      }
}

exports.default = Friends;