const mongoose = require('mongoose');
const MediaSchema = require('./media');

module.exports = NoteSchema = mongoose.Schema({
	Active: Boolean,
	Date: Date,
	Author: String,
	Title: String,
	Id: String,
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
		Media: MediaSchema
	}]
});

