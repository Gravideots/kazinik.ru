const Section = require('../schemas/section')
const MediaSchema = require('../schemas/media')
const mongoose = require('mongoose');

const createNewMedia = function (sectionID, mediaURL, Title, Tags, done) {

    let mediaSchema = mongoose.model('Media', MediaSchema);
    let newMedia = new mediaSchema()

    newMedia.Title = Title || "DEFAULT TITLE"

    newMedia.Tags = [
        {
            URL: 'MEDIA-1',
            Text: 'MEDIA-TAG-1'
        }, {
            URL: 'MEDIA-2',
            Text: 'MEDIA-TAG-2'
        }
    ]
    newMedia.URL = mediaURL
    newMedia.Type = 'VIDEO'

    Section.findOneAndUpdate({
        _id: sectionID
    }, {
        $push: {
            "Listing.Media.Data": newMedia
        }
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