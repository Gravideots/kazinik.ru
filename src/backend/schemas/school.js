const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

const SchoolSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    SubTitle: String,
    Address: String,
    EventDate: {
        Start: Date,
        Finish: Date
    },
    TitleImage: {
        Full: String,
        Crop: String
    },
    Price: String,
    Text: [{
        Title: String,
        Info: String
    }],
    Button: String
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('School', SchoolSchema);

