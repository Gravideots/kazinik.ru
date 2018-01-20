const express = require('express')
const passport = require('passport')
const app = express()

const port = process.env.PORT || 3003

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

require('./config/console-colors')

const mongoose = require('mongoose')
const dbConfig = require('./config/dbConfig')

mongoose.Promise = global.Promise;

mongoose
    .connect(dbConfig.appDB.url, {useMongoClient: true})
    .then(() => {
        console.log("==> MongoDB connection ready to use.".info)
    }, err => {
        console.error("!!!MongoDB connection error, please check mongod process, or configuration file".error)
    })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", ["*"]);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(passport.initialize());
app.use('/admin', require('./router/index').adminRouter)
app.use('/', require('./router/index').router)
app.use(redirectUnmatched);
require('./config/passport')

function redirectUnmatched(req, res) {
    res.status(418).redirect('/');
}
  
app.listen(port, function (error) {
    if (error) {
        console.error(error.error)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.".info, port, port)
    }
})