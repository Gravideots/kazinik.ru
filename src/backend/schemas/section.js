const mongoose = require('mongoose')

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

// const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = mongoose.model('Section', SectionSchema);