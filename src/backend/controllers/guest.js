const mongoose = require('mongoose');
const GuestSchema = require('../schemas/guest')
const dbConfig = require('../config/dbConfig');

const db = mongoose.createConnection(dbConfig.appDB.url);
let guestBookSchema = db.model('Guest', GuestSchema.GuestBookSchema);

const createGuestSection = function (Title, done) {
    guestBookSchema.findOne(function (err, guestSection) {
        if (err)
            throw err
        else {
            if (guestSection == null) {
                let newGuestSection = new guestBookSchema()
                newGuestSection.Title = Title
                newGuestSection.Messages = new Array()

                newGuestSection.save(function (err) {
                    if (err)
                        throw err
                    return done(null, newGuestSection)
                })
            } else {
                return done(null, guestSection)
            }
        }
    })
}

const getGuestSection = function (done) {
    guestBookSchema.findOne(function (err, guestSection) {
        if (err)
            throw err
        else {
            return done(null, guestSection)
        }
    })
}

const createQuestion = function (id, question, done) {

    let newQuestion = mongoose.model("Question", GuestSchema.GuestQuestionSchema)
    let questionSchema = new newQuestion()

    questionSchema.Username = "USER"
    questionSchema.Message = "TEST MESSAGE"
    questionSchema.Answers = new Array()

    guestBookSchema.findOneAndUpdate({ _id: id }, { $push: { "Messages": questionSchema } }, function (err, section) {
        if (err)
            throw err
        else
            return done(null, section)
    })
}

const createAnswer = function (id, questionID, answer, done) {
    let newAnswer = mongoose.model("Answer", GuestSchema.GuestAnswerSchema)
    let answerSchema = new newAnswer()

    answerSchema.Username = "Answer USERNAME"

    guestBookSchema.findOne({ _id: id }, function (err, res) {
        var quest = res.Messages.id(questionID)
        quest.Answers.push(answerSchema)
        res.save()
        return done(null, res)
    })
}

module.exports = { createGuestSection, getGuestSection, createQuestion, createAnswer }
