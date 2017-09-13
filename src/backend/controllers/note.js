const NoteSchema = require('../schemas/note')
const Section = require('../schemas/section')
const mongoose = require('mongoose');

const createNewNote = function (sectionID, Title, Description, done) {

    let noteSchema = mongoose.model('Note', NoteSchema);
    let Note = new noteSchema()

    Note.Title = Title
    Note.Description = Description
    Note.Tags = [{ URL: '1', Text: 'TAG-1' }, { URL: '2', Text: 'TAG-2' }, { URL: '3', Text: 'TAG-3' }]
    Note.Date = new Date()

    Section.findOneAndUpdate({ _id: sectionID }, { $push: { "Listing.Notes": Note } }, function (err, section) {
        if (err)
            throw err
        else
            return done(null, section)
    })
}

const getNoteByID = function (sectionID, noteID, done) {
    Section
        .findOne({ _id: sectionID }, function (err, section) {
            if (err)
                throw err
            else {
                let note = section.Listing.Notes.id(noteID);
                return done(null, note)
            }
        })
}

const dropNoteByID = function (sectionID, noteID, done) {
    Section
        .findOne({ _id: sectionID }, function (err, section) {
            if (err)
                throw err
            else {
                section.Listing.Notes.id(noteID).remove()
                section.save()
                return done(null, section)
            }
        })
}

const updateNoteByID = function (sectionID, noteID, data, done) {
    Section
        .findOne({ _id: sectionID }, function (err, section) {
            if (err)
                throw err
            else {
                var note = section.Listing.Notes.id(noteID)
                note.Title = data
                section.save()
                return done(null, note)
            }
        })
}

module.exports = { createNewNote, getNoteByID, updateNoteByID, dropNoteByID }