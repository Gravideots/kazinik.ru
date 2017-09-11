const Section = require('../schemas/section')

const createNewSection = function (Title, Description, done) {
    let newSection = new Section()

    newSection.Title = Title
    newSection.Description = Description
    newSection.Tags = new Array()

    newSection.save(function (err) {
        if (err)
            throw err
        return done(null, newSection)
    })
}

const getAllSections = function (done) {
    Section
        .find(function (err, sections) {
            if (err)
                throw err
            else
                return done(null, sections)
        })
}

const getSectionByID = function (sectionID, done) {
    Section
        .findOne({ _id: sectionID }, function (err, section) {
            if (err)
                throw err
            else
                return done(null, section)
        })
}

const dropSectionByID = function (sectionID, done) {
    Section
        .remove({ _id: sectionID }, function (err) {
            if (err)
                throw err
            else
                return done(null, true)
        })
}

module.exports = { createNewSection, getAllSections, getSectionByID, dropSectionByID }