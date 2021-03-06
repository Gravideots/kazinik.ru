const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig')

const Section = require('../schemas/section')
const Note = require('../schemas/note')
const Media = require('../schemas/media')

const createNewSection = function (sectionData, sectionType, done) {

    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    let newSection = new Section()

    // if (!newSection.Listing[sectionType.type]) 
    //     return done('ERROR')

    newSection.Active = sectionData.addToMain
    newSection.Type = sectionType.type
    newSection.Title = sectionData.title
    newSection.Description = sectionData.description
    newSection.ShowInSadebar = sectionData.addToSidebar

    newSection.save(function (err) {
        if (err) 
            throw err
        else 
            done( null, newSection);
    })
}

const getAllSections = function (done) {
    
    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    Section
        .find({}, function (err, sections) {
            if (err) 
                throw err
            else 
                done( null, sections);
        })
}

const getSectionByID = function (sectionID, done) {
    
    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    Section
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else 
                done( null, section);
        })
}

const dropSectionByID = function (sectionID, done) {
    
    //mongoose.connect(dbConfig.appDB.url, { useMongoClient: true });

    Section
        .remove({
            _id: sectionID
        }, function (err) {
            if (err) 
                throw err
            else
                done( null, true);
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
            else 
                done( null, updatedSection);
        })
}

module.exports = {
    createNewSection,
    getAllSections,
    getSectionByID,
    dropSectionByID,
    updateSectionByID
}