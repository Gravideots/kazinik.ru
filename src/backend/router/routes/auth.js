const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtsecret = 'test'

function localAuth(req, res, next) {
  passport.authenticate('local', function (err, user, message) {
    if (user == false || err) {
      res.status(401).send(message || err.message)
    } else {
      //--payload - информация которую мы храним в токене и можем из него получать
      const payload = {
        id: user.id,
        displayName: user.displayName,
        email: user.email
      };
      const token = generateJWT(payload); //здесь создается JWT

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

function generateJWT(payload){
  return 'Bearer ' + jwt.sign(payload, jwtsecret);
}

module.exports = {
  localAuth,
  jwtAuth,
  generateJWT
}