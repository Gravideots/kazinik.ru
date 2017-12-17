const mongoose = require('mongoose')
const dbConfig = require('../config/dbConfig')

const SectionSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Description: String,
    ShowInSadebar: Boolean,
    Type: String,
    Tags: [
        {
            URL: String,
            Text: String,
            _id: false 
        }
    ],
    Listing: []
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Section', SectionSchema);