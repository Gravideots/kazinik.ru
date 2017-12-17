const passport = require('passport');
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const User = require('../controllers/user')
const jwtsecret = 'test'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtsecret
};

passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    function (email, password, done) {
      User.FindByMail({email}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user || !user.checkPassword(password)) {
          return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
        }
        return done(null, user);
      });
    }
  )
);

passport.use(new JwtStrategy(jwtOptions, 
  function (payload, done) {
    User.FindById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })
);