const mongoose = require('mongoose');

module.exports = SchoolSchema = mongoose.Schema({
    Active: Boolean,
    Title: String,
    SubTitle: String,
    Address: String,
    EventDate: {
        Start: Date,
        Finish: Date
    },
    TitleImage: {
        Full: String,
        Crop: String
    },
    Price: String,
    Text: [{
        Title: String,
        Info: String
    }],
    Button: String
})

