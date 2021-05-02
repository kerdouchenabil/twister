class Users {
  constructor(db) {
    this.db = db
    // creation de la table users dans la BD
    this.db.exec(`CREATE TABLE IF NOT EXISTS users (
      login VARCHAR(512) NOT NULL PRIMARY KEY,
      password VARCHAR(256) NOT NULL,
      lastname VARCHAR(256) NOT NULL,
      firstname VARCHAR(256) NOT NULL
    );`)
  }

  create(login, password, lastname, firstname) {
    let _this = this
    //console.log(db)
    return new Promise((resolve, reject) => {
      const st = _this.db.prepare("INSERT INTO users VALUES (?,?,?,?)")
      st.run([login, password, lastname, firstname], function (err, res) {
        if (err) {
          console.error(err)
          reject(err)
        } else {
          resolve(this.lastID)
        }
      })
    });
  }

  //------------------- get user -----------------------
  async get(userid) {
    return new Promise((resolve, reject) => {
      //var st = this.db.prepare("SELECT * FROM users WHERE rowid = ?")
      var st = this.db.prepare("SELECT rowid as userid,login,firstname,lastname FROM users WHERE rowid = ?")//ne pas afficher le mot de passe !

      st.get([userid], function (err, res) {
        if (err) {

          reject(err)
        } else {
          resolve(res)
        }
      })
    });
  }


  //------------------- exists user by login -----------------------
  async exists(login) {
    return new Promise((resolve, reject) => {
      var st = this.db.prepare('SELECT login FROM users WHERE login = ?')
      st.get([login], function (err, res) {
        if (err) {
          reject(false)
        } else {
          resolve(true)
        }
      })
    });
  }


  //------------------- get user by id -----------------------
  async exists_id(id) {
    return new Promise((resolve, reject) => {
      var st = this.db.prepare('SELECT * FROM users WHERE rowid = ?')
      st.get([id], function (err, res) {
        if (res) { // commencer par if(res), car res peut etre undefined !
          resolve(true)
        } else {
          reject(false)
        }
      })
    });
  }


  //------------------- check password user -----------------------
  checkpassword(login, password) {

    return new Promise((resolve, reject) => {
      try {
        var st = this.db.prepare("SELECT rowid as userid,firstname,lastname FROM users WHERE login = ? AND password = ?")
        st.get([login, password], function (err, res) {
          if (err) {
            reject(err)
          } else {
            if (!res) { //si pas de resultats
              reject("non authentifié")
              return;
            }
            resolve(res.userid)
          }
        })

      } catch (e) {
        res.status(500).json({
          status: 500,
          message: "erreur interne",
          details: (e || "Erreur inconnue").toString()
        });
      }

    });
  }

  //------------------- search user -----------------------
  async search(str0) {
    return new Promise((resolve, reject) => {
      try {
        str = str0.toLowerCase()
        str = "%" + str + "%"
        var st = this.db.prepare("SELECT rowid as userid,login ,firstname,lastname from users where LOWER(firstname)  like ?  UNION  SELECT rowid as userid,login ,firstname,lastname from users where LOWER(lastname) like ?    UNION    SELECT rowid as userid,login ,firstname,lastname from users where LOWER(login)  like ?")
        st.all([str], function (err, res) {
          if (err) {
            reject(err)
          } else {
            if (!res) {
              reject("aucun utilisateur trouvé !")
              return;
            }
            resolve(res);
          }
        })
      } catch (e) {
        res.status(500).json({
          status: 500,
          message: "erreur interne",
          details: (e || "Erreur inconnue").toString()
        })
      }
    })
  }
}


exports.default = Users;