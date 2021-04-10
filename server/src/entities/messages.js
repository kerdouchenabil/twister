class Messages {
    constructor(db) {
      this.db = db
      // creation de la table users dans la BD
      //this.db.exec(`CREATE TABLE IF NOT EXISTS messages ;`)

    }
}

exports.default = Messages;