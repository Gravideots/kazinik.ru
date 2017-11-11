const Section = require('../schemas/section')
const MediaSchema = require('../schemas/media')
const mongoose = require('mongoose');
const {transliterate, slugify} = require('transliteration')

const createNewMedia = function (sectionID, mediaURL, Tags, done) {

    let mediaSchema = mongoose.model('Media', MediaSchema);
    let newMedia = new mediaSchema()

    let arrayOfTags = Tags
        .replace(/ /g, '')
        .split(',')
        .map(function (tag) {
            return {URL: transliterate(tag), Text: tag}
        });
    
    newMedia.URL = mediaURL
    newMedia.Tags = arrayOfTags
   

    Section.findOneAndUpdate({
        _id: sectionID
    }, {
        $push: {
            "Listing.Media.Data": newMedia
        },
        $addToSet: {
            Tags: {$each: newMedia.Tags}
        },
        upsert: true
    }, {
        new: true
    }, function (err, section) {
        if (err) 
            throw err
        else 
            return done(null, section)
    })
}

const getMediaByID = function (sectionID, mediaID, done) {
    Section
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else {
                let media = section
                    .Listing
                    .Media
                    .id(mediaID);
                return done(null, media)
            }
        })
}

const dropMediaByID = function (sectionID, mediaID, done) {
    Section
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else {
                section
                    .Listing
                    .Media
                    .Data
                    .id(mediaID)
                    .remove()
                section.save()
                return done(null, section)
            }
        })
}

const updateMediaByID = function (sectionID, mediaID, data, done) {
    Section
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else {
                var media = section
                    .Listing
                    .Media
                    .id(mediaID)
                media.Title = data
                section.save()
                return done(null, media)
            }
        })
}

module.exports = {
    createNewMedia,
    getMediaByID,
    dropMediaByID,
    updateMediaByID
}