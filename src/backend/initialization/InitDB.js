const section = require('../controllers/section')
const note = require('../controllers/note')
const media = require('../controllers/media')
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


//createSection(Title, Description)

//getAllSections()
//getSectionByID('59b6e5f24ecf0613801c377f')

//dropSectionByID()
//dropNoteByID('59b7ef39c516191bebf8ad50', '59b7ef8f6ca1911c019c6958')

//addNoteToSection('59b7ef39c516191bebf8ad50')
//addMediaToSection('59b7ef39c516191bebf8ad50');

//getNoteByID('59b7ef39c516191bebf8ad50', '59b7fe0b01e9541c7043a7f3')
updateNoteByID('59b7ef39c516191bebf8ad50', '59b7fe0b01e9541c7043a7f3', "SUPER TITLE")