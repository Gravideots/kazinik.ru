const mongoose = require('mongoose');

module.exports = MediaSchema = mongoose.Schema({
    Active: Boolean,
    URL: String,
    Title: String,
    Tags: [
        {
            URL: String,
            Text: String
        }
    ],
    Type: String
})