const Section = require('../schemas/section')
const MediaSchema = require('../schemas/media')
const mongoose = require('mongoose');
const {transliterate, slugify} = require('transliteration')


const getAllMedia = function ( done ){

    Section.find({
        Type: 'Media'
    }, ( err, doc ) => {
        
        if(err)
            done(err);
        else
            done( null, doc);
    })

}

const getMediaByTag = ( tag, done) => {
    
    Section.find({
        Type: 'Media',
        Listing: { $elemMatch: { 'Tags.$.URL': tag } }
    }, ( err, doc ) => {
        
        if(err)
            done(err);
        else
            done( null, doc);
    })
}
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
            "Listing": newMedia
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
                    .data
                    .id(mediaID);
                return done(null, media)
            }
        })
}

const dropMediaByID = function (sectionID, mediaID, done) {

    var sectionIdObject = mongoose.Types.ObjectId(sectionID);
    var mediaIdObject = mongoose.Types.ObjectId(mediaID);

    Section.collection.updateOne(
        {
            _id: sectionIdObject,
            Listing: { $elemMatch: { _id: mediaIdObject } }
        },
        {
            $pull: { "Listing": { _id: mediaIdObject } }
        },
        ( err, result ) => {

            Section.collection.findOne({
                _id: sectionIdObject
            }, {}, ( err, doc ) => {
                
                done( null, doc);
            })
        }
    )
}

const updateMediaByID = function (sectionID, mediaID, data, done) {

    var sectionIdObject = mongoose.Types.ObjectId(sectionID);
    var mediaIdObject = mongoose.Types.ObjectId(mediaID);

    // Section.collection.findOneAndUpdate(
    //     {
    //         _id: sectionIdObject,
    //         Listing: { $elemMatch: { _id: mediaIdObject } }
    //     },
    //     {
    //         $set: { "Listing.$.": { _id: mediaIdObject } }
    //     },
    //     ( err, result ) => {
    //         console.log( 'MSG', err, result )
    //         Section.collection.close()
    //     }
    // )

    Section
        .findOne({
            _id: sectionID
        }, function (err, section) {
            if (err) 
                throw err
            else {
                var media = section
                    .Listing
                    .id(mediaID)
                media.Title = data
                section.save()
                return done(null, media)
            }
        })
}

module.exports = {
    getMediaByTag,
    getAllMedia,
    createNewMedia,
    getMediaByID,
    dropMediaByID,
    updateMediaByID
}