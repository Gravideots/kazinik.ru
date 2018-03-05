const mongoose = require('mongoose');
const { transliterate, slugify } = require('transliteration');

const Section = require('../schemas/section');
const MediaSchema = require('../schemas/media');

const getAllMedia = function(done) {
	Section.findOne({
		Type: 'Media'
	}, (err, doc) => {
		if (err) done(err);
		else done(null, doc);
	});
};

const getMediaByTag = (tag, done) => {
	Section.findOne({
		Type: 'Media'
	}, (err, doc) => {
		if (err) done(err);

		else {
			let arr = doc.Listing.filter((el) => {
				return el.Tags.find((e) => e.URL === tag);
			});
			doc.Listing = arr;

			done(null, doc);
		}
	});
};

const createNewMedia = function(sectionID, mediaURL, Tags, done) {
	var mediaSchema = mongoose.model('Media', MediaSchema);
	var newMedia = new mediaSchema();

	var arrayOfTags = Tags
		.replace(/ /g, '')
		.split(',')
		.map((tag) => { return { URL: transliterate(tag), Text: tag }; });

	newMedia.URL = mediaURL;
	newMedia.Tags = arrayOfTags;

	Section.findOneAndUpdate({
		_id: sectionID
	}, {
		$push: {
			Listing: newMedia
		},
		upsert: true
	}, {
		new: true
	}, (err, section) => {
		if (err) throw err;
		else done(null, section);
	});
};

const getMediaByID = function(sectionID, mediaID, done) {
	Section
		.findOne({
			_id: sectionID
		}, function(err, section) {
			if (err) throw err;
			else {
				let media = section
					.Listing
					.data
					.id(mediaID);
				done(null, media);
			}
		});
};

const dropMediaByID = function(sectionID, mediaID, done) {
	var sectionIdObject = mongoose.Types.ObjectId(sectionID);
	var mediaIdObject = mongoose.Types.ObjectId(mediaID);

	Section.collection.updateOne(
		{
			_id: sectionIdObject,
			Listing: { $elemMatch: { _id: mediaIdObject } }
		},
		{
			$pull: { Listing: { _id: mediaIdObject } }
		},
		(err, result) => {
			Section.collection.findOne({ _id: sectionIdObject }, {}, (err, doc) => done(null, doc));
		}
	);
};

const updateMediaByID = function(sectionID, URL, Tags, mediaID, done) {
	var sectionIdObject = mongoose.Types.ObjectId(sectionID);
	var mediaIdObject = mongoose.Types.ObjectId(mediaID);

	var arrayOfTags = Tags
		.replace(/ /g, '')
		.split(',')
		.map((tag) => { return { URL: transliterate(tag), Text: tag }; });

	// Section
	// 	.findOne({
	// 		_id: sectionID
	// 	}, function(err, section) {
	// 		if (err) throw err;
	// 		else {
	// 			var media = section
	// 				.Listing
	// 				.id(mediaID);
	// 			media.URL = URL;
	// 			media.Tags = arrayOfTags;
	// 			section.save();

	// 			done(null, media);
	// 		}
	// 	});
	Section.collection.update(
		{ Type: 'Media' },
		{ $set: { 'Listing.$[elem].URL': URL} },
		{ arrayFilters: [{ 'elem._id': mediaIdObject }] },
		(err, section) => {
			if (err) throw err;
			else done(null, section);
		});

	// Section.findOne({
	// 	Type: 'Media'
	// }, (err, doc) => {
	// 	if (err) done(err);

	// 	else {
	// 		let arr = doc.Listing.filter((el) => {
	// 			return el.Tags.find((e) => e.URL === tag);
	// 		});
	// 		doc.Listing = arr;

	// 		done(null, doc);
	// 	}
	// });
};

module.exports = {
	getMediaByTag,
	getAllMedia,
	createNewMedia,
	getMediaByID,
	dropMediaByID,
	updateMediaByID
};
