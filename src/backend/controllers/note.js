const Note = require('../schemas/note')
const Section = require('../schemas/section')
const mongoose = require('mongoose');


const createNewNote = function (sectionID, Title, Description, done) {

    let newNote = new Note()

    newNote.Title = Title
    newNote.Description = Description
    newNote.Tags = [{ URL: '1', Text: 'TAG-1' }, { URL: '2', Text: 'TAG-2' }, { URL: '3', Text: 'TAG-3' }]
    newNote.Date = new Date()

    Section.getSectionByID(sectionID, function (err, section) {
        if (err)
            throw err
        else {
            section.update({ $push: { "Listing": newNote } },
                function (err, numAffected, rawResponse) {
                    if (err)
                        throw err
                    else {
                        newNote.save(function (err) {
                            if (err)
                                throw err
                            return done(null, newNote)
                        })
                    }
                })
        }
    })



}

const getNoteByID = function (sectionID, noteID, done) {
    Section
        .findOne({ _id: sectionID }, { 'Listing._id': noteID }, function (err, note) {
            if (err)
                throw err
            else
                return done(null, note)
        })
}

const dropNoteByID = function (noteID, done) {
    Note
        .remove({ _id: noteID }, function (err) {
            if (err)
                throw err
            else {
                return done(null, true)
            }

        })
}

module.exports = { createNewNote, getNoteByID, dropNoteByID }