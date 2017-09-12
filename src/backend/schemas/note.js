const mongoose = require('mongoose')
const MediaSchema = require('./media')
const dbConfig = require('../config/dbConfig')


const NoteSchema = mongoose.Schema({
    Active: Boolean,
    Date: Date,
    Author: String,
    Title: String,
    SubTitle: String,
    Description: String,
    TitleImage: {
        Full: String,
        Crop: String
    },
    Tags: [{
        URL: String,
        Text: String
    }],
    Note: [{
        Title: String,
        Text: String,
        Question: String,
        Answer: String,
        Image: String,
        //Media: [{ type: MediaSchema.Types.ObjectId, ref: 'Media' }]
    }]

})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Note', NoteSchema);