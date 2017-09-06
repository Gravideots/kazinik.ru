const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

const mainPageSchema = mongoose.Schema({
    special: {
        Active: Boolean,
        contentType: String,
        contentURL: String
    },
    slideShowSchool: [
        {
            Active: Boolean,
            Title: String,
            SubTitle: String,
            BackgroundImage: String,
            URL: String
        }
    ],
    slideShowEvents: [
        {
            Active: Boolean,
            Title: String,
            SubTitle: String,
            BackgroundImage: String,
            URL: String
        }
    ],
    slideShowPartners: [
        {
            Active: Boolean,
            URL: String,
            Image: String,
        }
    ],
    sectionsBlock: [
        {
            Active: Boolean,
            URL: String,
            Title: String,
            Icon: String,
            BackgroundImage: String
        }
    ]
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('mainPage', mainPageSchema);

