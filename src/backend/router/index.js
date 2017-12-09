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
const media = require('./routes/media')
const user = require('./routes/user')
//

router.use(function (req, res, next) {
    console.log(req.method.debug, req.url.debug);
    next();
})

router.get('/', function (req, res) {
    main(req, res)
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

// router.get('/guest', function (req, res) {
//     guest(req, res)
// })

router.get('/interview', function (req, res) {
    interview(req, res)
})

router.get('/search', function (req, res) {
    search(req, res)
})

router.get('/special-event', function (req, res) {
    specialEvent(req, res)
})

router.get('/api/sections/:param', user.jwtAuth, function (req, res) {
    if (req.params.param == 'existing') 
        section.getExistingSectionsList(req, res)
    if (req.params.param == 'possible') 
        section.getPossibleSectiosList(req, res)
})
router.post('/api/section/', user.jwtAuth, function (req, res) {
    section.createNewSection(req, res)
})
router.get('/api/section/:id', function (req, res) {
    section.getSection(req, res)
})
router.put('/api/section/:id', user.jwtAuth, function (req, res) {
    section.updateSection(req, res)
})
router.delete('/api/section/:id', user.jwtAuth, function (req, res) {
    section.deleteSection(req, res)
})

router.post('/api/media', user.jwtAuth, function (req, res) {
    media.createMedia(req, res)
})
router.delete('/api/media/:sectionID/:mediaID', user.jwtAuth, function (req, res) {
    media.deleteMedia(req, res)
})

router.get('/api/guest', function (req, res) {
    guest.getGuestPage(req, res)
})

router.post('/api/guest', user.jwtAuth, function (req, res) {
    guest.createMessage(req, res)
})

router.post('/api/login', user.localAuth, function (req, res) {
    res.send(req.body);
})

router.get('/jwt', user.jwtAuth, function (req, res) {
    res.send(req.body);
})

router.post('/registration', user.createUser, (req, res)=>{
    res.send(req.body);
})

module.exports = router;