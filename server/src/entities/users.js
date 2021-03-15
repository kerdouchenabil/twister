
class Users {
  constructor(db) {
    this.db = db
    // suite avec la BD
    // voir si besoin d'importer sqlite
    //console.log(db)
    this.db.exec(`CREATE TABLE IF NOT EXISTS users (
      login VARCHAR(512) NOT NULL PRIMARY KEY,
      password VARCHAR(256) NOT NULL,
      lastname VARCHAR(256) NOT NULL,
      firstname VARCHAR(256) NOT NULL
    );`)


    //creation user //
    //id = this.create(1,"1234","lastname","firstname")
  }


  create(login, password, lastname, firstname) {
    let _this = this
    
    return new Promise((resolve, reject) => {
      var st = _this.db.prepare("INSERT INTO users VALUES (?,?,?,?)")
      st.run([login, password, lastname, firstname], function(err, res){
        if(err){
          reject(err)
        }else{
          resolve(this.lastID)
        }
      })
    });
  }

  get(userid) {

    return new Promise((resolve, reject) => {

      var st = db.prepare("SELECT * FROM users WHERE rowid = ?")
      st.get([userid], function(err, res){
        if(err){
          reject(err)
        }else{
          resolve(res)
        }
      })
     });
  }

  async exists(login) {
    return new Promise((resolve, reject) => {
      if(false) {
        //erreur
        reject();
      } else {
        resolve(true);
      }
    });
  }

  checkpassword(login, password) {

    return new Promise((resolve, reject) => {

      var st = db.prepare("SELECT rowid as userid FROM users WHERE login = ? AND password = ?")
      st.get([login, password], function(err, res){
        if(err){
          reject(err)
        }else{
          resolve(res.userid)
        }
      })
     });
  }

}

exports.default = Users;

