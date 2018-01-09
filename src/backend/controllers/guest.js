const mongoose = require('mongoose');
const GuestSchema = require('../schemas/guest')

let guestBookSchema = mongoose.model('Guest', GuestSchema.GuestBookSchema);

const createGuestSection = function (Title, CaptchaKey, done) {

    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    guestBookSchema.findOne(function (err, guestSection) {
        if (err)
            throw err
        else {
            if (guestSection == null) {
                let newGuestSection = new guestBookSchema()
                newGuestSection.Title = Title
                newGuestSection.CaptchaKey = CaptchaKey

                newGuestSection.save(function (err) {
                    if (err)
                        throw err
                     
                    done( null, newGuestSection);
                })
            } else 
                done( null, guestSection);
        }
    })
}

const getPage = function (done) {

    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    guestBookSchema.findOne(function (err, res) {
        if (err)
            throw err
        
        done(null, { CaptchaKey: res.CaptchaKey, Title: res.Title, Messages: res.Messages.reverse()});
    })
}

const createQuestion = function (question, done) {

    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

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
        
        done(null, { CaptchaKey: res.CaptchaKey, Title: res.Title, Messages: res.Messages.reverse()});
    })
}

const createAnswer = function (answer, done) {

    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });
    
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
        res.save(function (err) {
            console.log('Save');
            if (err) throw (err);
            // saved!
            done(null, { CaptchaKey: res.CaptchaKey, Title: res.Title, Messages: res.Messages.reverse()});
        })
    })
}

module.exports = { createGuestSection, getPage, createQuestion, createAnswer }
