const mongoose = require('mongoose');

module.exports = MediaSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    Tags: [{
        URL: String,
        Text: String
    }],
    Type: String,
    URL: String,
})