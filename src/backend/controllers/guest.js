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

const getPage = function (done) {
    guestBookSchema.findOne(function (err, guestSection) {
        if (err)
            throw err
        else {
            return done(null, guestSection)
        }
    })
}

const createQuestion = function (question, done) {

    let newQuestion = mongoose.model("Question", GuestSchema.GuestQuestionSchema)
    let questionSchema = new newQuestion()

    questionSchema.Username = question.name;
    questionSchema.UserEmail = question.mail;
    questionSchema.Message = question.message;
    questionSchema.Date = new Date();

    guestBookSchema.findOne({}, function (err, res) {
        questionSchema.ID = res.Messages.length + 1;
        res.Messages.push(questionSchema)
        res.save()
        return done(null, res)
    })
}

const createAnswer = function (answer, done) {
    let newAnswer = mongoose.model("Answer", GuestSchema.GuestAnswerSchema)
    let answerSchema = new newAnswer()

    answerSchema.Username = answer.name;
    answerSchema.UserEmail = answer.mail;
    answerSchema.Message = answer.message;
    answerSchema.Date = new Date();
    answerSchema.ShowImage = false;

    guestBookSchema.findOne({}, function (err, res) {
        var quest = res.Messages[answer.postId -1]
        quest.Answers.push(answerSchema)
        res.save()
        return done(null, res)
    })
}

module.exports = { createGuestSection, getPage, createQuestion, createAnswer }
