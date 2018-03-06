const mongoose = require('mongoose');
const Media = require('./media');
const Note = require('./note');
const Event = require('./event');
const School = require('./school');

const SectionSchema = mongoose.Schema({
	Active: Boolean,
	Title: String,
	Description: String,
	ShowInSadebar: Boolean,
	Type: String,
	Listing: {
		Media: [Media],
		Notes: [Note],
		Event: [Event],
		School: [School]
	}
});

// const db = mongoose.createConnection(dbConfig.appDB.url);

module.exports = mongoose.model('Section', SectionSchema);
