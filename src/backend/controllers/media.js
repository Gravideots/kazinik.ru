const Section = require('../schemas/section')
const MediaSchema = require('../schemas/media')
const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig')

mongoose.Promise = global.Promise;

const {transliterate, slugify} = require('transliteration')
let sectionModel = mongoose.model('Section', Section);

const getAllMedia = function ( done ){

    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then( () => {

    //         sectionModel.findOne({
    //             Type: 'Media'
    //         }, ( err, doc ) => {
                
    //             if(err)
    //                 done(err);
    //             else
    //                 mongoose.connection.close( () => {
    //                     done( null, doc);
    //                 });
    //         })
    //     })

    sectionModel.findOne({
        Type: 'Media'
    }, ( err, doc ) => {
        
        if(err)
            done(err);
        else
            done( null, doc);
    })
}

const getMediaByTag = ( tag, done) => {

    sectionModel.findOne({
        Type: 'Media'
    }, ( err, doc ) => {
        
        if(err)
            done(err);
        else{

            let arr = doc.Listing.filter((el) => {
                return el.Tags.find( (e) => e.URL === tag );
            })
            doc.Listing = arr;
            
            done( null, doc);
        }
    })
    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then( ()=> {
    
    //         sectionModel.findOne({
    //             Type: 'Media'
    //         }, ( err, doc ) => {
                
    //             if(err)
    //                 done(err);
    //             else{
        
    //                 let arr = doc.Listing.filter((el) => {
    //                     return el.Tags.find( (e) => e.URL === tag );
    //                 })
    //                 doc.Listing = arr;
                    
    //                 mongoose.connection.close( () => {
    //                     done( null, doc);
    //                 });
    //             }
    //         })
    //     })
}
const createNewMedia = function (sectionID, mediaURL, Tags, done) {

    
    var mediaSchema = mongoose.model('Media', MediaSchema);
    var newMedia = new mediaSchema()

    var arrayOfTags = Tags
        .replace(/ /g, '')
        .split(',')
        .map(function (tag) {
            return {URL: transliterate(tag), Text: tag}
        });
    
    newMedia.URL = mediaURL
    newMedia.Tags = arrayOfTags

    sectionModel.findOneAndUpdate({
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
    }, (err, section) => {
        if (err) 
            throw err
        else    
            done( null, section);
    })

    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then( () => {
   
    //         sectionModel.findOneAndUpdate({
    //             _id: sectionID
    //         }, {
    //             $push: {
    //                 "Listing": newMedia
    //             },
    //             $addToSet: {
    //                 Tags: {$each: newMedia.Tags}
    //             },
    //             upsert: true
    //         }, {
    //             new: true
    //         }, (err, section) => {
    //             if (err) 
    //                 throw err
    //             else 
    //                 mongoose.connection.close( () => {
    //                     done( null, section);
    //                 });
    //         })
    //     })
}

const getMediaByID = function (sectionID, mediaID, done) {

    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then( () => {
    //         sectionModel
    //             .findOne({
    //                 _id: sectionID
    //             }, function (err, section) {
    //                 if (err)
    //                     throw err
    //                 else {
    //                     let media = section
    //                         .Listing
    //                         .data
    //                         .id(mediaID);
    //                     mongoose.connection.close( () => {
    //                         done( null, media);
    //                     });
    //                 }
    //             })
    //     })

    sectionModel
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
                done( null, media);
            }
        })
}

const dropMediaByID = function (sectionID, mediaID, done) {

    
    var sectionIdObject = mongoose.Types.ObjectId(sectionID);
    var mediaIdObject = mongoose.Types.ObjectId(mediaID);
    
    sectionModel.collection.updateOne(
        {
            _id: sectionIdObject,
            Listing: { $elemMatch: { _id: mediaIdObject } }
        },
        {
            $pull: { "Listing": { _id: mediaIdObject } }
        },
        ( err, result ) => {

            sectionModel.collection.findOne({ _id: sectionIdObject }, {}, ( err, doc ) => done( null, doc) )
        }
    )

    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then( () => {
    //         sectionModel.collection.updateOne(
    //             {
    //                 _id: sectionIdObject,
    //                 Listing: { $elemMatch: { _id: mediaIdObject } }
    //             },
    //             {
    //                 $pull: { "Listing": { _id: mediaIdObject } }
    //             },
    //             ( err, result ) => {
        
    //                 sectionModel.collection.findOne({
    //                     _id: sectionIdObject
    //                 }, {}, ( err, doc ) => {
                        
    //                     mongoose.connection.close( () => {
    //                         done( null, doc);
    //                     });
    //                 })
    //             }
    //         )
    //     })
}

const updateMediaByID = function (sectionID, mediaID, data, done) {

    
    var sectionIdObject = mongoose.Types.ObjectId(sectionID);
    var mediaIdObject = mongoose.Types.ObjectId(mediaID);

    sectionModel
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
                
                done( null, media);
            }
        })

    // mongoose
    //     .connect(dbConfig.appDB.url, { useMongoClient: true })
    //     .then(() => {

    //     // sectionModel.collection.findOneAndUpdate(
    //     //     {
    //     //         _id: sectionIdObject,
    //     //         Listing: { $elemMatch: { _id: mediaIdObject } }
    //     //     },
    //     //     {
    //     //         $set: { "Listing.$.": { _id: mediaIdObject } }
    //     //     },
    //     //     ( err, result ) => {
    //     //         console.log( 'MSG', err, result )
    //     //         sectionModel.collection.close()
    //     //     }
    //     // )

    //     sectionModel
    //         .findOne({
    //             _id: sectionID
    //         }, function (err, section) {
    //             if (err) 
    //                 throw err
    //             else {
    //                 var media = section
    //                     .Listing
    //                     .id(mediaID)
    //                 media.Title = data
    //                 section.save()
                    
    //                 mongoose.connection.close( () => {
    //                     done( null, media);
    //                 });
    //             }
    //         })
    //     })
}

module.exports = {
    getMediaByTag,
    getAllMedia,
    createNewMedia,
    getMediaByID,
    dropMediaByID,
    updateMediaByID
}