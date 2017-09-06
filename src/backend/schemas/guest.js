const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

const GuestSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    QuestionsCounter: Number,
    AnswersCounter: Number,
    Messages: [{
        Question: {
            ID: Number,
            UserName: String,
            UserEmail: String,
            Date: Date,
            Message: String
        },
        Answers: [{
            Username: String,
            ShowImage: Boolean,
            Date: Date,
            Message: String
        }]
    }]
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Guest', GuestSchema);

