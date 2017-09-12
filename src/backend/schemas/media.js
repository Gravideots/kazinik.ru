const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

const MediaSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Tags: [{
        URL: String,
        Text: String
    }],
    Type: String,
    URL: String,
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Media', MediaSchema);