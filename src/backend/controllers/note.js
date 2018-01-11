const NoteSchema = require('../schemas/note')
const Section = require('../schemas/section')

const createNote = function ( note, done ) {

    let Note = new NoteSchema( note )

    Section.findOneAndUpdate({ Type: 'Notes' }, { $push: { "Listing": Note } }, function ( err, section ) {
        if (err)
            throw err
        else
            return done(null, section)
    })
}

const getAllNotes = function ( done ){

    Section
        .findOne({ Type: 'Notes' }, function (err, section) {
            if (err)
                throw err
            else {
                let note = section;
                return done(null, note)
            }
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

module.exports = { createNote, getAllNotes, getNoteByID, updateNoteByID, dropNoteByID }