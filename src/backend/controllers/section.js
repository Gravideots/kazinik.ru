const mongoose = require('mongoose');

const Section = require('../schemas/section')
const Note = require('../schemas/note')
const Media = require('../schemas/media')

const createNewSection = function (sectionData, sectionType, done) {

    let newSection = new Section()

    if (!newSection.Listing[sectionType.type]) 
        return done('ERROR')

    newSection.Active = sectionData.addToMain
    newSection.Listing[sectionType.type].Available = true
    newSection.Title = sectionData.title
    newSection.Description = sectionData.description
    newSection.ShowInSadebar = sectionData.addToSidebar

    newSection.save(function (err) {
        if (err) 
            throw err
        else 
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
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else 
                return done(null, section)
        })
}

const dropSectionByID = function (sectionID, done) {
    Section
        .remove({
            _id: sectionID
        }, function (err) {
            if (err) 
                throw err
            else 
                return done(null, true)
        })
}

const updateSectionByID = function (sectionID, data, done) {
    Section
        .findByIdAndUpdate({
            _id: sectionID
        }, {
            $set: {
                Title: data.title,
                Description: data.description,
                ShowInSadebar: data.addToSidebar,
                Active: data.addToMain
            }
        }, function (err, updatedSection) {
            if (err) 
                throw err
            else {
                return done(null, updatedSection)
            }
        })
}

module.exports = {
    createNewSection,
    getAllSections,
    getSectionByID,
    dropSectionByID,
    updateSectionByID
}