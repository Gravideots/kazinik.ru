const mongoose = require('mongoose');
const SchoolSchema = require('../schemas/school')
const dbConfig = require('../config/dbConfig');

const db = mongoose.createConnection(dbConfig.appDB.url);
let schoolSchema = db.model('School', SchoolSchema);

const createSchool = function (done) {

    let newSchool = new schoolSchema()
    newSchool.Title = "!!!School Title!!!"

    newSchool.save(function (err) {
        if (err)
            throw err
        return done(null, newSchool)
    })
}

const getSchoolByID = function (schoolID, done) {
    schoolSchema
        .findOne({ _id: schoolID }, function (err, school) {
            if (err)
                throw err
            else {
                return done(null, school)
            }
        })
}

const updateSchoolByID = function (schoolID, data, done) {
    schoolSchema
        .findByIdAndUpdate({ _id: schoolID }, {
            $set: { Title: "NEW!!!!", EventDate: { Start: new Date() } }
        }, function (err, school) {
            if (err)
                throw err
            else {
                return done(null, school)
            }
        })
}

const dropSchoolByID = function (schoolID, done) {
    schoolSchema
        .remove({ _id: schoolID }, function (err) {
            if (err)
                throw err
            else
                return done(null, true)
        })
}

module.exports = { createSchool, getSchoolByID, updateSchoolByID, dropSchoolByID }
