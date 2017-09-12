const mongoose = require('mongoose')
const dbConfig = require('../config/dbConfig')

const SectionSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Description: String,
    Tags: [{
        URL: String,
        Text: String
    }],
    Listing: [{ type: mongoose.Schema.Types.Object }]
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Section', SectionSchema);