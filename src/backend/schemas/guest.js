const mongoose = require('mongoose');

const GuestAnswerSchema = mongoose.Schema({
    ID: Number,
    Username: String,
    ShowImage: Boolean,
    Date: Date,
    Message: String
})

const GuestQuestionSchema = mongoose.Schema({
    ID: Number,
    Username: String,
    UserEmail: String,
    Date: Date,
    Message: String,
    Answers: [GuestAnswerSchema]

})

const GuestBookSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    QuestionsCounter: Number,
    AnswersCounter: Number,
    CaptchaKey: String,
    Messages: [GuestQuestionSchema]
})



module.exports = { GuestBookSchema, GuestQuestionSchema, GuestAnswerSchema }