const Friends = require("./friends.js");
const { default: friends } = require("./friends.js");

class Messages {
  constructor(db, db_sql) {
    this.db = db
    this.db_sql = db_sql
    // creation de la table messages dans la BD mongodb
    const friends = new Friends.default(db_sql);
  }

  async create(user_id, firstname_msg, lastname_msg, text_msg, file_msg) {
    let _this = this
    console.log("debut message creation: user=", user_id, " date=", new Date(Date.now())) //affichage test

    try {
      let now = new Date(Date.now())
      let msg = { user: user_id, firstname: firstname_msg, lastname: lastname_msg, date: now, text: text_msg, file: file_msg, likes: 0, comments: [] }; //
      return new Promise((resolve, reject) => {

        _this.db.insert(msg, function (err, doc) {

          if (err) {
            reject(err)
          } else {
            resolve("message created")
          }
        })
      });
    } catch (e) {
      return "post message error !"
    }
  }


  //---------------------- list messages of all users -----------------------
  async list_all(max_time_msg, only_friends_msg, userid) {
    //valeurs par defaut:
    let max = max_time_msg // IMPORTATANT: MAX_TIME_MSG EN MINUTES !
    if (!max) {
      max = 10 // par defaut les 10 dernieres minutes
    }
    max = parseInt(max)
    let only_friends = only_friends_msg
    if (!only_friends_msg) {
      only_friends = false // par defaut (si undefined)
    }

    let _this = this
    console.log("debut message listing: max_time=", max, "min  only_friends=", only_friends) //affichage test

    try {
      let now = new Date(Date.now())

      return new Promise((resolve, reject) => {

        _this.db.find({ date: { $gt: new Date(now - max * 60 * 1000) } }, function (err, docs) { //max dernieres minutes 
          console.log("derniers messages:");

          if (err) {
            reject(err)
          } else {

            try {
              docs.sort(function (a, b) {

                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
              });

              console.log(docs);
              resolve(docs)
            } catch {
              console.log("list messages error !!!")
            }

          }
        })
      });
    } catch (e) {
      console.log("----catch-----", e)
      return "list messages error !"
    }

  }


  //---------------------- list messages of one user -----------------------
  async list_of(user_id, max_time_msg) {
    let userid = parseInt(user_id)
    //valeurs par defaut:
    let max = parseInt(max_time_msg) // IMPORTANT: MAX_TIME_MSG EN MINUTES !
    if (!max) {
      max = 1000000 // par defaut les 1000000 dernieres minutes
    }

    let _this = this
    console.log("messages: max_time=", max, "userid=", userid) //affichage test

    let now = new Date(Date.now())

    return new Promise((resolve, reject) => {
      _this.db.find(
        { user: userid },
        { date: { $gt: new Date(now - max * 60 * 1000) } },

      )
        .sort({ date: -1 })
        .exec((err, result) => {
          if (err) {
            reject(err)
          } else {
            console.log("result === ", result)
            resolve(result)
          }
        })
    })
  }

  // ------------------------- like message --------------------
  async like(id_msg) {

    try {
      let _this = this
      return new Promise((resolve, reject) => {
        try {
          _this.db.findOne({ _id: id_msg }, function (err, doc) {
            if (err) {
              reject(err)
            }
            else {
              _this.db.update({ _id: id_msg }, { $inc: { likes: 1 } })
              resolve("message liked")
            }
          });
        } catch (e) {

          reject("message not found !")
          return;
        }

      });
    } catch (e) {

      return "like message error !"
    }
  }


  //----------------------- delete mesage ------------------------- 
  async delete(id_msg) {
    try {
      let _this = this
      return new Promise((resolve, reject) => {
        try {
          _this.db.remove({ _id: id_msg }, function (err, doc) {
            if (err) {
              reject(err);
            } else {
              resolve("deleted")
            }
          });
        } catch (e) {
          reject(e.message)
          return;
        }
      });
    } catch (e) {
      return "delete messaage error "
    }
  }


  //----------------------- comment mesage ------------------------- 
  async comment(id_msg, msg) {
    try {
      let _this = this
      return new Promise((resolve, reject) => {
        try {
          _this.db.findOne({ _id: id_msg }, function (err, doc) {
            if (err) {

              reject(err)

            }

            else {
              _this.db.update({ _id: id_msg }, { $push: { comments: msg } })

              resolve("commented")
            }

          })
        } catch (e) {
          reject(e.message)
          return;
        }
      });
    } catch (e) {
      reject(e.message)
      return;
    }
  }
}

exports.default = Messages;