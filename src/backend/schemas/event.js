const mongoose = require('mongoose');
const dbConfig = require('../config/dbConfig');

const EventSchema = mongoose.Schema({
    Active: Boolean,
    Special: Boolean,
    EventDate: Date,
    Address: String,
    Title: String,
    SubTitle: String,
    TitleImage: {
        Full: String,
        Crop: String
    },
    Text: [{
        Title: String,
        Info: String
    }],
    Button: String
})

const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = db.model('Event', EventSchema);

