const section = require('../controllers/section')
const note = require('../controllers/note')
const media = require('../controllers/media')
require('../config/console-colors')

const Title = 'Title'
const Description = 'Description'

function createSection(Title, Description) {

    section.createNewSection(Title, Description, function (err, section) {
        if (err)
            console.log('Error! Section was not created'.error)
        else
            console.log('Section created'.info, section)
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
    note.createNewNote(sectionID, 'Test', 'TESTTEST', function (err, done) {
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
        else
            console.log('Got note with ID %s'.info, noteID, note)
    })
}

function dropNoteByID(noteID) {
    note.dropNoteByID(noteID, function (err, result) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Section with ID %s removed'.info, noteID, result)
    })
}

function addMediaToSection(sectionID) {
    media.createNewMedia(sectionID, 'Test', 'TESTTEST', function (err, done) {
        if (err)
            console.log('Error! Can not access DB'.error)
        else
            console.log('Note added'.info, done)
    })
}


//createSection(Title, Description)
//getAllSections()
//getSectionByID('59b6e5f24ecf0613801c377f')
getNoteByID('59b6e8eecc08c5145e2afb92', '59b6e921a46a3f147662a2e5')
//dropSectionByID()

//addNoteToSection('59b6e8eecc08c5145e2afb92')
//addMediaToSection('59b6e5f24ecf0613801c377f');

//dropNoteByID('59b6d5ba9cd83810f5ce5f64')
