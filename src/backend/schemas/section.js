const mongoose = require('mongoose')
const dbConfig = require('../config/dbConfig')

const NoteSchema = require('./note')
const MediaSchema = require('./media')

const SectionSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Description: String,
    ShowInSadebar: Boolean,
    Tags: [
        {
            URL: String,
            Text: String,
            _id: false 
        }
    ],
    Listing: {
        Interviews: {
            Available: Boolean,
            Data: [NoteSchema]
        },
        Articles: {
            Available: Boolean,
            Data: [MediaSchema]
        },
        Media: {
            Available: Boolean,
            Data: [MediaSchema]
        }
    }
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Section', SectionSchema);