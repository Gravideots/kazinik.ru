const mongoose = require('mongoose')
const dbConfig = require('../config/dbConfig')
const NoteSchema = require('./note')
const MediaSchema = require('./media')

const SectionSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Description: String,
    Tags: [{
        URL: String,
        Text: String
    }],
    Listing: {
        Notes: [NoteSchema],
        Media: [MediaSchema]
    }
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Section', SectionSchema);