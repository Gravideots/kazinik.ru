const mongoose = require('mongoose');
const UserSchema = require('../schemas/user')
const dbConfig = require('../config/dbConfig');

const db = mongoose.createConnection(dbConfig.appDB.url);
let userSchema = db.model('User', UserSchema);

function Create(data, done) {

    let newUser = new userSchema(data)

    newUser.save(function (err) {
        if (err)
            throw err
        return done(null, newUser)
    })
}

function FindByMail(email, done){
    console.log(email)
    userSchema.findOne(email, (err, user) => {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
}

function FindById(id, done){
    userSchema.findById(id, (err, user) => {
        if (err) {
          return done(err)
        }
        return done(null, user)
      })
}

function FindAll(done){
    userSchema.find({}, (err, users) => {
        if (err) {
          return done(err)
        }
        return done(null, users)
      })
}

module.exports = {
  Create,
  FindByMail,
  FindById,
  FindAll
}