const mongoose = require('mongoose');

module.exports = EventSchema = mongoose.Schema({
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
		Info: String,
		Img: String
	}],
	Button: [{
		Url: String,
		Name: String
	}]
});

