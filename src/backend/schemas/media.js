const mongoose = require('mongoose');

module.exports = MediaSchema = mongoose.Schema({
	Active: Boolean,
	URL: String,
	Tags: [
		{
			URL: String,
			Text: String,
			_id: false
		}
	]
});
