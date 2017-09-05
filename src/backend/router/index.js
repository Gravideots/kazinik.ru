const express = require('express')
const router = express.Router();

//PAGES
const main = require('./routes/main')
const article = require('./routes/article')
const event = require('./routes/event')
const guest = require('./routes/guest')
const interview = require('./routes/interview')
const search = require('./routes/search')
const section = require('./routes/section')
const specialEvent = require('./routes/specialEvent')
//

router.use(function (req, res, next) {
    console.log(req.method.debug, req.url.debug);
    next();
})

router.get('/', function (req, res) {
    main(req, res)
})

router.get('/article', function (req, res) {
    article(req, res)
})

router.get('/event', function (req, res) {
    event(req, res)
})

router.get('/guest', function (req, res) {
    guest(req, res)
})

router.get('/interview', function (req, res) {
    interview(req, res)
})

router.get('/search', function (req, res) {
    search(req, res)
})

router.get('/section', function (req, res) {
    section(req, res)
})

router.get('/special-event', function (req, res) {
    specialEvent(req, res)
})

module.exports = router;