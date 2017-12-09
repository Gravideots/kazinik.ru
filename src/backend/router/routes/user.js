const User = require('../../schemas/user')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtsecret = 'test'

function createUser(req, res, next) {
  User.create(req.body, function (err, guest) {
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
        const token = generateJWT(payload, jwtsecret)

        req.body = {user: guest.displayName, email: guest.email, token: token};
        
        next();
      }
  })
}

function localAuth(req, res, next) {
  passport.authenticate('local', function (err, user, message) {
    if (user == false) {
      res.status(401).send(message)
    } else {
      //--payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      };
      const token = generateJWT(payload, jwtsecret); //здесь создается JWT

      req.body = {user: user.displayName, email: user.email, token: token};

      next();
    }
  })(req, next);
}

function jwtAuth(req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (user) {
      req.body.user = user;
      next();
    } else {
      res.status(401).send("Not permitted");
    }
  } )(req, next)
}

function generateJWT(payload, jwtsecret){
  return 'Bearer ' + jwt.sign(payload, jwtsecret);
}

module.exports = {
    createUser,
    localAuth,
    jwtAuth
}