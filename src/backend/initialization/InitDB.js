const section = require('../controllers/section')
const note = require('../controllers/note')
const media = require('../controllers/media')
const guest = require('../controllers/guest')
const event = require('../controllers/event')
const school = require('../controllers/school')

require('../config/console-colors')

const Title = 'Section Title'
const Description = 'Section Description'

function createSection(Title, Description) {

    section.createNewSection(Title, Description, function (err, section) {
        if (err)
            console.log('Error! Section was not created'.error)
        else
            console.log('Section created'.info, section)
    })
}

function createGuestSection(Title, Captcha) {

    guest.createGuestSection(Title, Captcha, function (err, guestSection) {
        if (err)
            console.log('Error! Guest section was not created'.error)
        else
            console.log('Guest section created'.info, guestSection)
    })
}

function getAllSections() {

    section.getAllSections(function (err, sections) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got sections, here is a list'.info, sections)
    })
}

function getGuestSection() {
    guest.getGuestSection(function (err, sections) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got guest section, here is a list'.info, sections)
    })
}

function createGuestQuestion(id) {
    guest.createQuestion(id, "!!!!QUESTION!!!!", function (err, question) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got guest section, here is a list'.info, question)
    })
}

function createGuestAnswer(id, questionID) {
    guest.createAnswer(id, questionID, "!!!!ANSWER!!!!", function (err, answer) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got guest section, here is a list'.info, answer)
    })
}

function getSectionByID(sectionID) {

    section.getSectionByID(sectionID, function (err, sections) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got section with ID %s'.info, sectionID, sections)
    })
}

function dropSectionByID() {
    section.dropSectionByID(sectionID, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Section with ID %s removed'.info, sectionID, result)
    })
}

function addNoteToSection(sectionID) {
    note.createNewNote(sectionID, 'Note Title', 'Note Description', function (err, done) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Note added'.info, done)
    })
}

function getNoteByID(sectionID, noteID) {

    note.getNoteByID(sectionID, noteID, function (err, note) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else {
            console.log('Got note with ID %s'.info, noteID, note)
        }
    })
}

function updateNoteByID(sectionID, noteID, data) {
    note.updateNoteByID(sectionID, noteID, data, function (err, note) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else {
            console.log('Note with ID %s Updated'.info, noteID, note)
        }
    })
}

function dropNoteByID(sectionID, noteID) {
    note.dropNoteByID(sectionID, noteID, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Section with ID %s removed'.info, noteID, result)
    })
}

function addMediaToSection(sectionID) {
    media.createNewMedia(sectionID, 'Media Title', 'Media Description', function (err, done) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Note added'.info, done)
    })
}

function getMediaByID(sectionID, mediaID) {
    media.getMediaByID(sectionID, mediaID, function (err, media) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else {
            console.log('Got media with ID %s'.info, mediaID, media)
        }
    })
}

function dropMediaByID(sectionID, mediaID) {
    media.dropMediaByID(sectionID, mediaID, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Media with ID %s removed'.info, mediaID, result)
    })
}

function updateMediaByID(sectionID, mediaID, data) {
    media.updateMediaByID(sectionID, mediaID, data, function (err, media) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Media with ID %s Updated'.info, mediaID, media)
    })
}


function createEvent(done) {
    event.createEvent(function (err, event) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Event created'.info, event)
    })
}

function getEventByID(id, done) {
    event.getEventByID(id, function (err, event) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got Event'.info, event)
    })
}

function updateEventByID(id, data, done) {
    event.updateEventByID(id, data, function (err, event) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Event Updated'.info, event)
    })
}

function dropEventByID(id, done) {
    event.dropEventByID(id, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Event Removed'.info, result)
    })
}

function createSchool(done) {
    school.createSchool(function (err, school) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('school created'.info, school)
    })
}

function getSchoolByID(id, done) {
    school.getSchoolByID(id, function (err, school) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Got school'.info, school)
    })
}

function updateSchoolByID(id, data, done) {
    school.updateSchoolByID(id, data, function (err, event) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Event Updated'.info, event)
    })
}

function dropSchoolByID(id, done) {
    school.dropSchoolByID(id, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Event Removed'.info, result)
    })
}

//createEvent()
//updateEventByID('59ca635e9bc74808adb7a10e', 'SomeData')
//getEventByID('59ca5313e6378b0850fdf72e')
//dropEventByID('59ca635e9bc74808adb7a10e')

//createSchool()
//getSchoolByID('59ca689fa7156b094154b440')
//updateSchoolByID('59ca689fa7156b094154b440')
//dropSchoolByID('59ca689fa7156b094154b440')

//createSection(Title, Description)
createGuestSection('Гостевая', '6Ld7UTUUAAAAAJ43uq19kCKb1XtvlamkFakgXGou')
//addNoteToSection('59b9400d427b0b242db852e3')
//addMediaToSection('59b9400d427b0b242db852e3');


//getAllSections()
//getSectionByID('59b6e5f24ecf0613801c377f')
//getNoteByID('59b9400d427b0b242db852e3', '59b9418273e5a4244751b6b3')
//getMediaByID('59b9400d427b0b242db852e3', '59b9418273e5a4244751b6b7')
//getGuestSection();

//dropSectionByID()
//dropNoteByID('59b7ef39c516191bebf8ad50', '59b7ef8f6ca1911c019c6958')
//dropMediaByID('59b7ef39c516191bebf8ad50', '59b814d01c7a921f1017a907')

//updateNoteByID('59b9400d427b0b242db852e3', '59b9418273e5a4244751b6b3', "SUPER TITLE")
//updateMediaByID('59b9400d427b0b242db852e3', '59b9418273e5a4244751b6b7', "SUPER MEDIA TITLE")

//createGuestQuestion("59c93eda182ecb06f53c019a");
//createGuestAnswer('59c93eda182ecb06f53c019a', '59c93eeaa8d2a8070c7d3220')


