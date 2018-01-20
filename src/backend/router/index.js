const express = require('express')
const adminRouter = express.Router();
const router = express.Router();


const multer  = require('multer')
const upload = multer()

//PAGES
const main = require('./routes/main')
const event = require('./routes/event')
const guest = require('./routes/guest')
const notes = require('./routes/notes')
const search = require('./routes/search')
const section = require('./routes/section')
const specialEvent = require('./routes/specialEvent')
const media = require('./routes/media')
const user = require('./routes/user')
const auth = require('./routes/auth')
//

router.use(function (req, res, next) {
    console.log(req.method.debug, req.url.debug);
    next();
})

adminRouter.use(function (req, res, next) {
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

router.get('/api/notes/', function (req, res) {
    notes.getNotes(req, res)
})

router.get('/api/note/:id', function (req, res) {
    notes.getNote(req, res)
})

router.get('/api/media/:tag', function (req, res) {
    media.getMedia(req, res)
})
router.get('/api/media', function (req, res) {
    media.getMedia(req, res)
})

router.get('/search', function (req, res) {
    search(req, res)
})

router.get('/special-event', function (req, res) {
    specialEvent(req, res)
})

router.get('/api/guest', function (req, res) {
    guest.getGuestPage(req, res)
})

router.post('/api/guest', function (req, res) {
    guest.createMessage(req, res)
})

//================================================
//================START AUTH================
//================================================

router.post('/api/login', auth.localAuth, function (req, res) {
    res.send(req.body);
})

router.get('/jwt', auth.jwtAuth, function (req, res) {
    res.send(req.body);
})

router.post('/registration', auth.jwtAuth, user.createUser, (req, res)=>{
    res.send(req.body);
})

//================================================
//================START ADMIN PAGE================
//================================================

adminRouter.get('/api/users', auth.jwtAuth, function (req, res) {
    user.getAllUsers(req, res)
})

adminRouter.get('/api/sections/:param', auth.jwtAuth, function (req, res) {

    if (req.params.param == 'existing') 
        section.getExistingSectionsList(req, res)

    if (req.params.param == 'possible') 
        section.getPossibleSectiosList(req, res)
})

adminRouter.post('/api/section/', auth.jwtAuth, function (req, res) {

    section.createNewSection(req, res)
})

adminRouter.get('/api/section/:id', function (req, res) {

    section.getSection(req, res)
})

adminRouter.put('/api/section/:id', auth.jwtAuth, function (req, res) {

    section.updateSection(req, res)
})

adminRouter.delete('/api/section/:id', auth.jwtAuth, function (req, res) {

    section.deleteSection(req, res)
})

adminRouter.post('/api/media', auth.jwtAuth, function (req, res) {

    media.createMedia(req, res)
})

adminRouter.delete('/api/media/:sectionID/:mediaID', auth.jwtAuth, function (req, res) {

    media.deleteMedia(req, res)
})

adminRouter.post('/api/note', upload.any(),  function (req, res) {

    notes.createNote(req, res)
})

module.exports = { router, adminRouter };