const User = require('../../controllers/user')
const Auth = require('./auth')

function createUser(req, res, next) {
  console.log(User)
  User.Create(req.body, function (err, guest) {
      if (err)
        switch(err.code){
          case 11000:
            res.status(406).send('Такой email уже существует')
            break;
          default:
            res.status(500).send('Что то пошло не так')
        }
      else{
        const payload = {
          id: guest._id,
          displayName: guest.displayName,
          email: guest.email
        };
        const token = Auth.generateJWT(payload)

        req.body = {user: guest.displayName, email: guest.email, token: token};
        
        next();
      }
  })
}

function getAllUsers(req, res){
  User.FindAll(function (err, users) {
    if (err)
      switch(err.code){
        case 11000:
          res.status(406).send('Такой email уже существует')
          break;
        default:
          res.status(500).send('Что то пошло не так')
      }
    else{

      let payload = Array.from(users, user => {
        return {
          id: user._id,
          name: user.displayName,
          email: user.email,
          create: user.createdAt,
          updated: user.updateddAt,
        }
      })

      res.send({ Users: payload });
    }
  })
}
module.exports = {
    createUser,
    getAllUsers,
}