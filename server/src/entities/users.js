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
    
    /*
    //test: insertion
    let sqlInsert = ` INSERT INTO users VAlUES ( 'pikachu','1234','chu','pika') `;
    this.db.run ( sqlInsert , [] , function ( err ) {
    if ( err ) {
        return console . error ( err . message );
    }
    console.log (` Rows inserted ${ this.changes } `);
    });

    let sqlInsert2 = ` INSERT INTO users VAlUES ( 'pikachu2','12345','chu2','pika2') `;
    this.db.run ( sqlInsert2 , [] , function ( err ) {
    if ( err ) {
        return console . error ( err . message );
    }
    console.log (` Rows inserted ${ this.changes } `);
    });
    

    let sqlSelect = ` SELECT DISTINCT login , password FROM users `;
    this.db.all ( sqlSelect , [] , ( err , rows ) => {
        if ( err ) {
            throw err ;
        }
        rows.forEach (( row ) => {
            console.log ( `-->${row.login}` );
        });
    });

    console.log("-------------------------")
    */

  }

  create(login, password, lastname, firstname) {
    let _this = this
    //console.log(db)
    return new Promise((resolve, reject) => {
      const st = _this.db.prepare("INSERT INTO users VALUES (?,?,?,?)")
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

      var st = this.db.prepare("SELECT * FROM users WHERE rowid = ?")
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
      var st = this.db.prepare('SELECT login FROM users WHERE login = ?')
      st.get([login], function(err, res){
        if(err){
          reject(false)
        }else{
          resolve(true)
        }
      })
    });
    
  }


  async exists_id(id) {
    return new Promise((resolve, reject) => {
      var st = this.db.prepare('SELECT * FROM users WHERE rowid = ?')
      st.get([id], function(err, res){
        if(res){ // commencer par if(res), car res peut etre undefined !
          resolve(true)
        }else{
          reject(false)
        }
      })
    });
    
  }


  checkpassword(login, password) {

    return new Promise((resolve, reject) => {
      try{
        var st = this.db.prepare("SELECT rowid as userid FROM users WHERE login = ? AND password = ?")
        st.get([login, password], function(err, res){
          if(err){
            reject(err)
          }else{
            if(! res){ //si pas de resultats
              reject("non authentifié")
              return;
            }
            resolve(res.userid)
          }
        })
      
      }catch(e){
        res.status(500).json({
          status: 500,
          message: "erreur interne",
          details: (e || "Erreur inconnue").toString()
        });
      }
      
     });
  }


}

exports.default = Users;

