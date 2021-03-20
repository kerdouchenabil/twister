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
              reject(err)
            }else{
              resolve(this.lastID) //renvoi l'id de la ligne (id_from, id_to) créée
            }
          })
        });
      }

}
exports.default = Friends;
